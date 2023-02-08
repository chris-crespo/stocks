use chrono::{DateTime, Utc, Duration};
use futures::future::join_all;
use sqlx::{FromRow, postgres::PgPool, QueryBuilder};

use crate::{
    asset::{Asset, CryptoPrice, StockPrice, LastCryptoPrice, LastStockPrice},
    generate::{generate_data, DATA_FRAME_AMOUNT}, utils::utc_datetime_now
};

pub mod queries;

const BIND_LIMIT: usize = 65535;
const PARAM_COUNT: usize = 3;
const INSERT_CHUNK_SIZE: usize = BIND_LIMIT / PARAM_COUNT;

#[derive(Clone, Copy)]
pub struct DB<'a> {
    created_at: DateTime<Utc>, 
    pool: &'a PgPool,
}

impl<'a> DB<'a> {
    pub fn new(pool: &'a PgPool) -> Self {
        Self { 
            created_at: utc_datetime_now(),
            pool 
        }
    }

    pub async fn refresh_materialized_views_after_inserts(&self) {
        self.execute_queries(vec![
            queries::view::REFRESH_CRYPTO_MARKET_CAP_MATERIALIZED_VIEW,
            queries::view::REFRESH_STOCK_MARKET_CAP_MATERIALIZED_VIEW,
            queries::view::REFRESH_TODAYS_CRYPTO_PRICES_MATERIALIZED_VIEW,
            queries::view::REFRESH_TODAYS_STOCK_PRICES_MATERIALIZED_VIEW,
            queries::view::REFRESH_THIS_WEEKS_CRYPTO_PRICES_MATERIALIZED_VIEW,
            queries::view::REFRESH_THIS_WEEKS_STOCK_PRICES_MATERIALIZED_VIEW,
            queries::view::REFRESH_THIS_MONTHS_CRYPTO_PRICES_MATERIALIZED_VIEW,
            queries::view::REFRESH_THIS_MONTHS_STOCK_PRICES_MATERIALIZED_VIEW,
            queries::view::REFRESH_MARKET_CRYPTOS_MATERIALIZED_VIEW,
            queries::view::REFRESH_MARKET_STOCKS_MATERIALIZED_VIEW,
        ]).await;
    }

    pub async fn insert_cryptos(&self, cryptos: &Vec<Asset>) {
        self.insert_assets(cryptos, queries::table::INSERT_MANY_CRYPTOS).await;
    }

    pub async fn insert_stocks(&self, stocks: &Vec<Asset>) {
        self.insert_assets(stocks, queries::table::INSERT_MANY_STOCKS).await;
    }

    async fn insert_assets(&self, assets: &Vec<Asset>, query: &str) {
        let inserts = assets
            .chunks(INSERT_CHUNK_SIZE)
            .map(|chunk| self.insert_asset_chunk(chunk, query));

        join_all(inserts).await;
    }

    async fn insert_asset_chunk(&self, chunk: &[Asset], query: &str) {
        let mut builder = QueryBuilder::new(query);

        let _ = builder.push_values(chunk, |mut b, asset| {
            b.push_bind(asset.id)
                .push_bind(asset.symbol.to_owned())
                .push_bind(asset.name.to_owned());
        }).build().execute(self.pool).await;
    }

    pub async fn insert_cryptos_data(&self, cryptos: &Vec<Asset>) {
        self.insert_assets_data(cryptos, queries::table::INSERT_MANY_CRYPTO_PRICE).await;
    }

    pub async fn insert_stocks_data(&self, stocks: &Vec<Asset>) {
        self.insert_assets_data(stocks, queries::table::INSERT_MANY_STOCK_PRICE).await;
    }

    async fn insert_assets_data(&self, assets: &Vec<Asset>, query: &str) {
        let inserts = assets.into_iter().map(|asset| self.insert_asset_data(asset, query));
        join_all(inserts).await;
    }

    async fn insert_asset_data(&self, asset: &Asset, query: &str) {
        let enumerated_data: Vec<_> = generate_data().into_iter().enumerate().collect();
        let queries = enumerated_data
            .chunks(INSERT_CHUNK_SIZE)
            .map(|chunk| self.insert_asset_data_chunk(asset, chunk, query));
            
        join_all(queries).await;
    }

    async fn insert_asset_data_chunk(&self, asset: &Asset, chunk: &[(usize, f64)], query: &str) {
        let mut builder = QueryBuilder::new(query);
        let _ = builder.push_values(chunk, |mut b, (offset, frame)| { 
            let date = self.calculate_asset_price_date(*offset);
            b.push_bind(asset.id)
                .push_bind(frame)
                .push_bind(date);
        }).build().execute(self.pool).await;

    }

    pub async fn update_asset_prices(&self) {
        self.update_crypto_prices().await;
        self.update_stock_prices().await;
    }

    async fn update_crypto_prices(&self) {
        let update_datetime = utc_datetime_now();
        let rows = sqlx::query("select * from last_crypto_price").fetch_all(self.pool).await.unwrap();
        let next_prices = rows.into_iter()
            .map(|row| LastCryptoPrice::from_row(&row).unwrap())
            .map(|asset_price| asset_price.next_price(update_datetime))
            .collect::<Vec<_>>();

        self.insert_crypto_prices(&next_prices).await;
    }

    async fn insert_crypto_prices(&self, asset_prices: &Vec<CryptoPrice>) {
        let mut builder = QueryBuilder::new(queries::table::INSERT_MANY_CRYPTO_PRICE);
        let _ = builder.push_values(asset_prices, |mut b, asset_price| {
            b.push_bind(asset_price.crypto_id)
                .push_bind(asset_price.price)
                .push_bind(asset_price.date);
        }).build().execute(self.pool).await;
    }

    async fn update_stock_prices(&self) {
        let update_datetime = utc_datetime_now();
        let rows = sqlx::query("select * from last_stock_price").fetch_all(self.pool).await.unwrap();
        let next_prices = rows.into_iter()
            .map(|row| LastStockPrice::from_row(&row).unwrap())
            .map(|asset_price| asset_price.next_price(update_datetime))
            .collect::<Vec<_>>();

        self.insert_stock_prices(&next_prices).await;
    }

    async fn insert_stock_prices(&self, asset_prices: &Vec<StockPrice>) {
        let mut builder = QueryBuilder::new(queries::table::INSERT_MANY_STOCK_PRICE);
        let _ = builder.push_values(asset_prices, |mut b, asset_price| {
            b.push_bind(asset_price.stock_id)
                .push_bind(asset_price.price)
                .push_bind(asset_price.date);
        }).build().execute(self.pool).await;
    }

    fn calculate_asset_price_date(&self, offset: usize) -> DateTime<Utc> {
        let time_diff = Duration::minutes((DATA_FRAME_AMOUNT - offset - 1).try_into().unwrap());
        self.created_at.checked_sub_signed(time_diff).unwrap()
    }

    async fn execute_queries(&self, queries: Vec<&str>) {
        let results = queries
            .into_iter()
            .map(|query| sqlx::query(query).execute(self.pool));

        join_all(results).await;
    }
}
