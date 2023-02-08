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
            create or replace view last_crypto_price as
            select 
                distinct on (crypto_id) crypto_id, 
                price 
            from todays_crypto_prices
            order by crypto_id, date desc;
        ");

        DB::statement("
            create or replace view last_stock_price as
            select 
                distinct on (stock_id) stock_id as stock_id, 
                price 
            from todays_stock_prices
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
                last_crypto_price,
                last_stock_price
                cascade;
        ");
    }
};
