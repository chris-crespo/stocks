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
        Schema::create('stock_watchlist', function (Blueprint $table) {
            $table->id();
            $table->bigInteger('watchlist_id')->unsigned();
            $table->bigInteger('stock_id')->unsigned();
            $table->timestamps();

            $table->foreign('watchlist_id')
                ->references('id')
                ->on('watchlists')
                ->onDelete('cascade');
            $table->foreign('stock_id')
                ->references('id')
                ->on('stocks')
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
        Schema::dropIfExists('stock_watchlist');
    }
};
