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
            create materialized view if not exists market_cryptos as
            select 
                crypto_id as id, 
                name, 
                symbol, 
                price, 
                market_cap, 
                last_hour_growth, 
                last_day_growth, 
                last_week_growth
            from cryptos
            join last_crypto_price on cryptos.id = last_crypto_price.crypto_id
            join crypto_market_cap using (crypto_id)
            join last_hour_crypto_growth using (crypto_id)
            join last_day_crypto_growth using (crypto_id)
            join last_week_crypto_growth using (crypto_id);
        ");

        DB::statement("
            create materialized view if not exists market_stocks as
            select 
                stock_id as id, 
                name, 
                symbol, 
                price, 
                market_cap, 
                last_hour_growth, 
                last_day_growth, 
                last_week_growth
            from stocks
            join last_stock_price on stocks.id = last_stock_price.stock_id
            join stock_market_cap using (stock_id)
            join last_hour_stock_growth using (stock_id)
            join last_day_stock_growth using (stock_id)
            join last_week_stock_growth using (stock_id);
        ");
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('market_assets');
    }
};
