use chrono::{DateTime, Utc};
use serde::Deserialize;
use sqlx::{FromRow, postgres::PgRow, Row};

use crate::generate::generate_data_frame;

const CMC_API: &str = "https://pro-api.coinmarketcap.com/v1/cryptocurrency/listings/latest";
const CMC_API_KEY_HEADER:  &str = "X-CMC_PRO_API_KEY";
const CMC_API_KEY: &str = "CMC_API_KEY";

#[derive(Deserialize, Debug)]
pub struct CryptosResponse {
    pub data: Vec<Asset>
}

#[derive(Deserialize, Debug, Clone)]
pub struct Asset {
    pub id: i64,
    pub symbol: String,
    pub name: String
}

pub async fn fetch_cryptos(limit: usize) -> Result<CryptosResponse, Box<dyn std::error::Error>> {
    let client = reqwest::Client::new();
    let response = client
        .get(format!("{}?limit={}", CMC_API, limit))
        .header(CMC_API_KEY_HEADER, std::env::var(CMC_API_KEY).unwrap())
        .send()
        .await;

    match response {
        Ok(response) => {
            Ok(response.json().await?)
        }
        Err(e) => {
            println!("{}", e.to_string());
            Err(Box::new(e))
        }
    }
}

const STOCK_AMOUNT: usize = 1000;

pub fn read_stocks(limit: usize) -> Result<Vec<Asset>, Box<dyn std::error::Error>> {
    let step = (STOCK_AMOUNT / limit).max(1);
    let mut reader = csv::Reader::from_path("./data/ss.csv")?;
    let stocks: Vec<Asset> = reader.deserialize()
        .into_iter()
        .map(|res| res.unwrap())
        .step_by(step)
        .collect();

    Ok(stocks)
}

pub struct CryptoPrice {
    pub crypto_id: i64,
    pub price: f64,
    pub date: DateTime<Utc>
}

pub struct LastCryptoPrice {
    pub crypto_id: i64,
    pub price: f64,
}

impl LastCryptoPrice {
    pub fn next_price(&self, date: DateTime<Utc>) -> CryptoPrice {
        println!("{} {}", self.price, generate_data_frame(self.price));
        CryptoPrice {
            crypto_id: self.crypto_id,
            price: generate_data_frame(self.price),
            date
        }
    }
}

impl<'r> FromRow<'r, PgRow> for LastCryptoPrice {
    fn from_row(row: &'r PgRow) -> Result<Self, sqlx::Error> {
        let crypto_id = row.try_get("crypto_id")?;
        let price = row.try_get("price")?;

        Ok(LastCryptoPrice { crypto_id, price })
    }
}

pub struct StockPrice {
    pub stock_id: i64,
    pub price: f64,
    pub date: DateTime<Utc>
}

pub struct LastStockPrice {
    pub stock_id: i64,
    pub price: f64,
}

impl LastStockPrice {
    pub fn next_price(&self, date: DateTime<Utc>) -> StockPrice {
        println!("{} {}", self.price, generate_data_frame(self.price));
        StockPrice {
            stock_id: self.stock_id,
            price: generate_data_frame(self.price),
            date
        }
    }
}

impl<'r> FromRow<'r, PgRow> for LastStockPrice {
    fn from_row(row: &'r PgRow) -> Result<Self, sqlx::Error> {
        let stock_id = row.try_get("stock_id")?;
        let price = row.try_get("price")?;

        Ok(LastStockPrice { stock_id, price })
    }
}
