pub const DROP_ALL_VIEWS: &str = "
    drop materialized view if exists
        crypto_market_cap,
        stock_market_cap,
        todays_cryptos,
        todays_stocks,
        this_weeks_cryptos,
        this_weeks_stocks,
        this_months_cryptos,
        this_months_stocks,
        crypto_growth_last_minute,
        crypto_growth_last_hour,
        crypto_growth_last_day,
        crypto_growth_last_week
        cascade;

    drop view if exists
        last_crypto_price,
        last_stock_price
        cascade;
";

pub const CREATE_CRYPTO_MARKET_CAP_MATERIALIZED_VIEW: &str = "
    create materialized view if not exists crypto_market_cap as
    select crypto_id, max(price) from crypto_price
    group by crypto_id;
";

pub const CREATE_STOCK_MARKET_CAP_MATERIALIZED_VIEW: &str = "
    create materialized view if not exists stock_market_cap as
    select stock_id, max(price) from stock_price
    group by stock_id;
";

pub const CREATE_TODAYS_CRYPTOS_MATERIALIZED_VIEW: &str = "
    create materialized view if not exists todays_cryptos as
    select * from cryptos join crypto_price 
    on cryptos.id = crypto_price.crypto_id
    where date::date = now()::date
    and   date <= now()
    order by date asc;
";

pub const CREATE_TODAYS_STOCKS_MATERIALIZED_VIEW: &str = "
    create materialized view if not exists todays_stocks as
    select * from stocks join stock_price 
    on stocks.id = stock_price.stock_id
    where date::date = now()::date
    and   date <= now()
    order by date asc;
";

pub const CREATE_THIS_WEEKS_CRYPTOS_MATERIALIZED_VIEW: &str = "
    create materialized view if not exists this_weeks_cryptos as
    select * from cryptos join crypto_price 
    on cryptos.id = crypto_price.crypto_id
    where extract(week from date) = extract(week from now())
    and   extract(year from date) = extract(year from now())
    and   extract(minute from date) % 10 = 0
    and   date <= now()
    order by date asc;
";

pub const CREATE_THIS_WEEKS_STOCKS_MATERIALIZED_VIEW: &str = "
    create materialized view if not exists this_weeks_stocks as
    select * from stocks join stock_price 
    on stocks.id = stock_price.stock_id
    where extract(week from date) = extract(week from now())
    and   extract(year from date) = extract(year from now())
    and   extract(minute from date) % 10 = 0
    and   date <= now()
    order by date asc;
";

pub const CREATE_THIS_MONTHS_CRYPTOS_MATERIALIZED_VIEW: &str = "
    create materialized view if not exists this_months_cryptos as
    select * from cryptos join crypto_price
    on cryptos.id = crypto_price.crypto_id
    where extract(month from date) = extract(month from now())
    and   extract(year from date) = extract(year from now())
    and   extract(minute from date) % 30 = 0
    and   date <= now()
    order by date asc;
";

pub const CREATE_THIS_MONTHS_STOCKS_MATERIALIZED_VIEW: &str = "
    create materialized view if not exists this_months_stocks as
    select * from stocks join stock_price
    on stocks.id = stock_price.stock_id
    where extract(month from date) = extract(month from now())
    and   extract(year from date) = extract(year from now())
    and   extract(minute from date) % 30 = 0
    and   date <= now()
    order by date asc;
";

pub const CREATE_CRYPTO_GROWTH_LAST_MINUTE_MATERIALIZED_VIEW: &str = "
    create materialized view if not exists crypto_growth_last_minute as
    select distinct on (id) id, price_change(lag(price) over (partition by id order by id, date), price)
    from todays_cryptos
    order by id, date desc;
";

pub const CREATE_CRYPTO_GROWTH_LAST_HOUR_MATERIALIZED_VIEW: &str = "
    create materialized view if not exists crypto_growth_last_hour as
    select distinct on (id) id, price_change(lag(price) over (partition by id order by id, date), price)
    from this_months_cryptos
    where extract(minute from date) = 0
    order by id, date desc;
";

pub const CREATE_CRYPTO_GROWTH_LAST_DAY_MATERIALIZED_VIEW: &str = "
    create materialized view if not exists crypto_growth_last_day as
    select distinct on (id) id, price_change(lag(price) over (partition by id order by id, date), price)
    from this_months_cryptos
    where date::time = '00:00:00'
    order by id, date desc;
";

pub const CREATE_CRYPTO_GROWTH_LAST_WEEK_MATERIALIZED_VIEW: &str = "
    create materialized view if not exists crypto_growth_last_week as
    select distinct on (id) id, price_change(lag(price) over (partition by id order by id, date), price)
    from this_months_cryptos
    where date::time = '00:00:00'
    and   extract(dow from date) = 1
    order by id, date desc;
";

// --->
pub const CREATE_LAST_CRYPTO_PRICE_VIEW: &str = "
    create or replace view last_crypto_price as
    select distinct on (id) id, price from todays_cryptos;
";

pub const CREATE_LAST_STOCK_PRICE_VIEW: &str = "
    create or replace view last_stock_price as
    select distinct on (id) id, price from todays_stocks;
";

pub const REFRESH_CRYPTO_MARKET_CAP_MATERIALIZED_VIEW: &str = "
    refresh materialized view crypto_market_cap;
";

pub const REFRESH_STOCK_MARKET_CAP_MATERIALIZED_VIEW: &str = "
    refresh materialized view stock_market_cap;
";

pub const REFRESH_TODAYS_CRYPTO_PRICES_MATERIALIZED_VIEW: &str = "
    refresh materialized view todays_crypto_prices;
";

pub const REFRESH_TODAYS_STOCK_PRICES_MATERIALIZED_VIEW: &str = "
    refresh materialized view todays_stock_prices;
";

pub const REFRESH_THIS_WEEKS_CRYPTO_PRICES_MATERIALIZED_VIEW: &str = "
    refresh materialized view todays_crypto_prices;
";

pub const REFRESH_THIS_WEEKS_STOCK_PRICES_MATERIALIZED_VIEW: &str = "
    refresh materialized view todays_stock_prices;
";

pub const REFRESH_THIS_MONTHS_CRYPTO_PRICES_MATERIALIZED_VIEW: &str = "
    refresh materialized view this_months_crypto_prices;
";

pub const REFRESH_THIS_MONTHS_STOCK_PRICES_MATERIALIZED_VIEW: &str = "
    refresh materialized view this_months_stock_prices;
";

pub const REFRESH_CRYPTO_GROWTH_LAST_MINUTE_MATERIALIZED_VIEW: &str = "
    refresh materialized view last_minute_crypto_growth;
";

pub const REFRESH_STOCK_GROWTH_LAST_MINUTE_MATERIALIZED_VIEW: &str = "
    refresh materialized view last_minute_stock_growth;
";

pub const REFRESH_CRYPTO_GROWTH_LAST_HOUR_MATERIALIZED_VIEW: &str = "
    refresh materialized view last_hour_crypto_growth;
";

pub const REFRESH_STOCK_GROWTH_LAST_HOUR_MATERIALIZED_VIEW: &str = "
    refresh materialized view last_hour_stock_growth;
";

pub const REFRESH_CRYPTO_GROWTH_LAST_DAY_MATERIALIZED_VIEW: &str = "
    refresh materialized view last_day_crypto_growth;
";

pub const REFRESH_STOCK_GROWTH_LAST_DAY_MATERIALIZED_VIEW: &str = "
    refresh materialized view last_day_stock_growth;
";

pub const REFRESH_CRYPTO_GROWTH_LAST_WEEK_MATERIALIZED_VIEW: &str = "
    refresh materialized view last_week_crypto_growth;
";

pub const REFRESH_STOCK_GROWTH_LAST_WEEK_MATERIALIZED_VIEW: &str = "
    refresh materialized view last_week_stock_growth;
";

pub const REFRESH_MARKET_CRYPTOS_MATERIALIZED_VIEW: &str = "
    refresh materialized view market_cryptos;
";

pub const REFRESH_MARKET_STOCKS_MATERIALIZED_VIEW: &str = "
    refresh materialized view market_stocks;
";
