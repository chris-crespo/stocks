use std::env;
use dotenv::dotenv;
use sqlx::{PgPool, postgres::PgConnectOptions};

use asset::{read_stocks, fetch_cryptos};
use db::DB;

pub mod asset;
pub mod db;
pub mod generate;

#[tokio::main]
async fn main() -> Result<(), Box<dyn std::error::Error>> {
    dotenv().ok();

    let args: Vec<_> = env::args().collect();
    let asset_count: usize = args.get(1)
        .and_then(|arg| arg.parse().ok())
        .unwrap_or(100)
        .clamp(10, 1000);

    let pool = create_pool();
    let db = DB::new(Box::leak(Box::new(pool)));

    let cryptos = fetch_cryptos(asset_count).await.unwrap().data;
    let stocks = read_stocks(asset_count).unwrap();

    let static_db = Box::leak(Box::new(db)) ;
    let static_cryptos = Box::leak(Box::new(cryptos));
    let static_stocks = Box::leak(Box::new(stocks));

    let insert_cryptos = tokio::spawn(static_db.insert_cryptos(static_cryptos));
    let insert_stocks = tokio::spawn(static_db.insert_stocks(static_stocks));

    println!("Inserting assets...");
    let _ = tokio::join!(insert_cryptos, insert_stocks);
    println!("Assets inserted!");

    let insert_cryptos_data = tokio::spawn(static_db.insert_cryptos_data(static_cryptos));
    let insert_stocks_data = tokio::spawn(static_db.insert_stocks_data(static_stocks));

    println!("Inserting asset prices...");
    let _ = tokio::join!(insert_cryptos_data, insert_stocks_data);
    println!("Asset prices inserted!");

    println!("Refresing materialized views...");
    static_db.refresh_materialized_views_after_inserts().await;
    println!("Materialized views refreshed!");

    Ok(())
}

fn create_pool() -> PgPool {
    let opts = PgConnectOptions::new()
        .host("localhost")
        .username("stocks")
        .password("stocks")
        .database("stocks");

    PgPool::connect_lazy_with(opts)
}
