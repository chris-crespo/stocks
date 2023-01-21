<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

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
            create or replace view last_day_crypto_growth as
            select 
                distinct on (crypto_id) crypto_id, 
                price_change(lag(price) over (partition by crypto_id order by crypto_id, date), price) as last_day_growth
            from this_months_crypto_prices
            where date::time = '00:00:00'
            order by crypto_id, date desc;
        ");

        DB::statement("
            create or replace view last_day_stock_growth as
            select 
                distinct on (stock_id) stock_id, 
                price_change(lag(price) over (partition by stock_id order by stock_id, date), price) as last_day_growth
            from this_months_stock_prices
            where date::time = '00:00:00'
            order by stock_id, date desc;
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
            drop view if exists 
                last_day_crypto_growth,
                last_day_stock_growth
                cascade;
        ");
    }
};
