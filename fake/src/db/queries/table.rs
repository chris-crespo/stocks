pub const DROP_CRYPTOS: &str = "drop table if exists cryptos cascade;";
pub const DROP_STOCKS: &str = "drop table if exists stocks cascade;";
pub const DROP_CRYPTO_PRICE: &str = "drop table if exists crypto_price cascade;";
pub const DROP_STOCK_PRICE: &str = "drop table if exists stock_price cascade;";

pub const CREATE_CRYPTOS: &str = "
    create table if not exists cryptos (
        id bigint not null,
        symbol varchar(10) not null,
        name text not null,
        primary key (id)
    );
";

pub const CREATE_STOCKS: &str = "
    create table if not exists stocks (
        id bigint not null,
        symbol varchar(10) not null,
        name text not null,
        primary key (id)
    );
";

pub const CREATE_CRYPTO_PRICE: &str = "
    create table if not exists crypto_price (
        crypto_id int,
        price double precision,
        date timestamp
    );
";

pub const CREATE_STOCK_PRICE: &str = "
    create table if not exists stock_price (
        stock_id int,
        price double precision,
        date timestamp
    );
";

pub const TRUNCATE_CRYPTOS: &str = "truncate cryptos cascade;";
pub const TRUNCATE_STOCKS: &str = "truncate stocks cascade;";
pub const TRUNCATE_CRYPTO_PRICE: &str = "truncate crypto_price cascade;";
pub const TRUNCATE_STOCK_PRICE: &str = "truncate stock_price cascade;";

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
