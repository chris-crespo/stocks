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
            create materialized view if not exists crypto_market_cap as
            select crypto_id, max(price) as market_cap from crypto_price
            group by crypto_id;
        ");

        DB::statement("
            create materialized view if not exists stock_market_cap as
            select stock_id, max(price) as market_cap from stock_price
            group by stock_id;
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
                crypto_market_cap,
                stock_market_cap
                cascade;
        ");
    }

};
