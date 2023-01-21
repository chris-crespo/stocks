<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\DB;

return new class extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        DB::statement("
            create materialized view if not exists this_months_crypto_prices as
            select crypto_id, name, symbol, price, date from cryptos join crypto_price
            on cryptos.id = crypto_price.crypto_id
            where date between now() - interval '1 month' and now()
            and   extract(minute from date) % 30 = 0
            order by date asc;
        ");

        DB::statement("
            create materialized view if not exists this_months_stock_prices as
            select stock_id, name, symbol, price, date from stocks join stock_price
            on stocks.id = stock_price.stock_id
            where date between now() - interval '1 month' and now()
            and   extract(minute from date) % 30 = 0
            order by date asc;
        ");

        DB::statement("
            create or replace view this_months_asset_prices as
            select name, symbol, price, date 
            from this_months_crypto_prices 
            union 
            select name, symbol, price, date 
            from this_months_stock_prices;
        ");
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        DB::statement("
            drop materialized view if exists 
                this_months_crypto_prices,
                this_months_stock_prices
                cascade;
        ");

        DB::statement("
            drop view if exists
                this_months_asset_prices
                cascade;
        ");
    }
};
