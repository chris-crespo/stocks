use chrono::{DateTime, Utc, Timelike, Duration};
use futures::future::join_all;
use sqlx::{postgres::PgPool, QueryBuilder};

use crate::{
    asset::Asset,
    generate::{generate_data, DATA_FRAME_AMOUNT}
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
        let now = Utc::now();
        let current_seconds = now.time().second();
        let current_nanoseconds = now.time().nanosecond();

        let seconds = Duration::seconds(current_seconds.into());
        let nanoseconds = Duration::nanoseconds(current_nanoseconds.into());

        let created_at = now.checked_sub_signed(seconds).unwrap();
        let created_at = created_at.checked_sub_signed(nanoseconds).unwrap();

        Self { created_at, pool }
    }

    pub async fn init(&self) {
        self.drop_tables().await;
        self.create_tables().await;
        self.truncate_tables().await;
        self.create_functions().await;
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

    async fn drop_tables(&self) {
        self.execute_queries(vec![
            queries::table::DROP_CRYPTOS,
            queries::table::DROP_STOCKS,
            queries::table::DROP_CRYPTO_PRICE,
            queries::table::DROP_STOCK_PRICE
        ]).await;
    }

    async fn create_tables(&self) {
        let _ = sqlx::query(queries::view::DROP_ALL_VIEWS).execute(self.pool).await;

        self.execute_queries(vec![
            queries::table::CREATE_CRYPTOS,
            queries::table::CREATE_STOCKS,
            queries::table::CREATE_CRYPTO_PRICE,
            queries::table::CREATE_STOCK_PRICE,
        ]).await;
    }

    async fn truncate_tables(&self) {
        self.execute_queries(vec![
            queries::table::TRUNCATE_CRYPTOS,
            queries::table::TRUNCATE_STOCKS,
            queries::table::TRUNCATE_CRYPTO_PRICE,
            queries::table::TRUNCATE_STOCK_PRICE,
        ]).await;
    }

    async fn create_functions(&self) {
        self.execute_queries(vec![
            queries::function::CREATE_PRICE_CHANGE_FUNCTION
        ]).await;
    }

    pub async fn create_views(&self) {
        self.execute_queries(vec![
            queries::view::CREATE_CRYPTO_MARKET_CAP_MATERIALIZED_VIEW,
            queries::view::CREATE_STOCK_MARKET_CAP_MATERIALIZED_VIEW,
            queries::view::CREATE_TODAYS_CRYPTOS_MATERIALIZED_VIEW,
            queries::view::CREATE_TODAYS_STOCKS_MATERIALIZED_VIEW,
            queries::view::CREATE_THIS_WEEKS_CRYPTOS_MATERIALIZED_VIEW,
            queries::view::CREATE_THIS_WEEKS_STOCKS_MATERIALIZED_VIEW,
            queries::view::CREATE_THIS_MONTHS_CRYPTOS_MATERIALIZED_VIEW,
            queries::view::CREATE_THIS_MONTHS_STOCKS_MATERIALIZED_VIEW,
        ]).await;

        // Some of these may depend on a previous materialized view.
        self.execute_queries(vec![
            queries::view::CREATE_CRYPTO_GROWTH_LAST_MINUTE_MATERIALIZED_VIEW,
            queries::view::CREATE_CRYPTO_GROWTH_LAST_HOUR_MATERIALIZED_VIEW,
            queries::view::CREATE_CRYPTO_GROWTH_LAST_DAY_MATERIALIZED_VIEW,
            queries::view::CREATE_CRYPTO_GROWTH_LAST_WEEK_MATERIALIZED_VIEW
        ]).await;

        self.execute_queries(vec![
            queries::view::CREATE_LAST_CRYPTO_PRICE_VIEW,
            queries::view::CREATE_LAST_STOCK_PRICE_VIEW
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

        let result = builder.push_values(chunk, |mut b, asset| {
            b.push_bind(asset.id)
                .push_bind(asset.symbol.to_owned())
                .push_bind(asset.name.to_owned());
        }).build().execute(self.pool).await;

        match result {
            Ok(..) => {},
            Err(e) => panic!("{}", e.to_string())
        };
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
        let result = builder.push_values(chunk, |mut b, (offset, frame)| { 
            let date = self.calculate_asset_price_date(*offset);
            b.push_bind(asset.id)
                .push_bind(frame)
                .push_bind(date);
        }).build().execute(self.pool).await;

        match result {
            Ok(..) => {},
            Err(e) => panic!("{}", e.to_string())
        };
    }

    fn calculate_asset_price_date(&self, offset: usize) -> DateTime<Utc> {
        let time_diff = Duration::minutes((DATA_FRAME_AMOUNT - offset - 1).try_into().unwrap());
        self.created_at.checked_sub_signed(time_diff).unwrap()
    }

    async fn execute_queries(&self, queries: Vec<&str>) {
        let results = queries
            .into_iter()
            .map(|query| sqlx::query(query).execute(self.pool));

        let ress = join_all(results).await;
            
        for res in ress {
            if res.is_err() {
                panic!("{}", res.err().unwrap().to_string());
            }
        }
    }
}
