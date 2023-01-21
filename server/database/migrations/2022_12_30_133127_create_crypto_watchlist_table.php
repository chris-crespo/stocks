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
        Schema::create('crypto_watchlist', function (Blueprint $table) {
            $table->id();
            $table->bigInteger('watchlist_id')->unsigned();
            $table->bigInteger('crypto_id')->unsigned();
            $table->timestamps();

            $table->foreign('watchlist_id')
                ->references('id')
                ->on('watchlists')
                ->onDelete('cascade');
            $table->foreign('crypto_id')
                ->references('id')
                ->on('cryptos')
                ->onDelete('cascade');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('crypto_watchlist');
    }
};
