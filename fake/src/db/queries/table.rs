pub const INSERT_MANY_CRYPTOS: &str = "
    insert into cryptos(id, symbol, name)
";

pub const INSERT_MANY_STOCKS: &str = "
    insert into stocks(id, symbol, name)
";

pub const INSERT_MANY_CRYPTO_PRICE: &str = "
    insert into crypto_price(crypto_id, price, date)
";

pub const INSERT_MANY_STOCK_PRICE: &str = "
    insert into stock_price(stock_id, price, date)
";
