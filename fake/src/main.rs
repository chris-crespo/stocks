use std::env;
use dotenv::dotenv;
use lazy_static::lazy_static;
use sqlx::{PgPool, postgres::PgConnectOptions, Pool, Postgres};
use tokio::time::interval;
use tokio_cron_scheduler::{JobScheduler, Job};

use asset::{read_stocks, fetch_cryptos};
use db::DB;

pub mod asset;
pub mod db;
pub mod generate;
pub mod utils;

lazy_static! {
    static ref POOL: Pool<Postgres> = create_pool();
    static ref DBB: DB<'static> = DB::new(&POOL);
}

#[tokio::main]
async fn main() -> Result<(), Box<dyn std::error::Error>> {
    dotenv().ok();

    let args: Vec<_> = env::args().collect();
    let asset_count: usize = args.get(1)
        .and_then(|arg| arg.parse().ok())
        .unwrap_or(100)
        .clamp(10, 1000);

    wait_for_tables_ready().await;
    println!("Ready!");

    let insert_cryptos = tokio::spawn(async move {
        println!("Fetching cryptos...");
        let cryptos = fetch_cryptos(asset_count).await.unwrap().data;
        println!("Inserting cryptos...");
        tokio::join!(DBB.insert_cryptos(&cryptos), DBB.insert_cryptos_data(&cryptos));
        println!("Cryptos done!");
    });

    let insert_stocks = tokio::spawn(async move {
        println!("Reading stocks...");
        let stocks = read_stocks(asset_count).unwrap();
        println!("Inserting stocks...");
        tokio::join!(DBB.insert_stocks(&stocks), DBB.insert_stocks_data(&stocks));
        println!("Stocks done!");
    });

    let _ = tokio::join!(insert_cryptos, insert_stocks);

    println!("Refresing materialized views...");
    DBB.refresh_materialized_views_after_inserts().await;
    println!("Materialized views refreshed!");

    let mut scheduler = JobScheduler::new().await.unwrap();
    let _ = scheduler.add(Job::new_async("0 * * * * *", |_, _| Box::pin(async {
        println!("Updating prices...");
        DBB.update_asset_prices().await;
        println!("Prices updated!");

        println!("Refresing materialized views...");
        DBB.refresh_materialized_views_after_inserts().await;
        println!("Materialized views refreshed!");
    })).unwrap()).await;

    #[cfg(feature = "signal")]
    scheduler.shutdown_on_ctrl_c();
    scheduler.set_shutdown_handler(Box::new(|| {
      Box::pin(async move {
        println!("Shut down done");
      })
    }));
 
    let _ = scheduler.start().await;
    let mut interval = interval(std::time::Duration::from_secs(60));

    loop { interval.tick().await; };
}

fn create_pool() -> PgPool {
    let opts = PgConnectOptions::new()
        .host("db")
        .username("stocks")
        .password("stocks")
        .database("stocks");

    PgPool::connect_lazy_with(opts)
}

async fn wait_for_tables_ready() {
    let mut interval = interval(std::time::Duration::from_secs(60));
    loop { 
        if DBB.is_ready().await {
            break;
        }
        println!("Waiting");

        interval.tick().await; 
    };
}
