use serde::Deserialize;

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
    let json = client
        .get(format!("{}?limit={}", CMC_API, limit))
        .header(CMC_API_KEY_HEADER, std::env::var(CMC_API_KEY).unwrap())
        .send()
        .await?
        .json()
        .await?;

    Ok(json)
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
