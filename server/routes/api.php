<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

use App\Http\Controllers\AuthController;
use App\Http\Controllers\MarketController;
use App\Http\Controllers\CryptoController;
use App\Http\Controllers\StockController;
use App\Http\Controllers\WatchlistController;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::controller(AuthController::class)->prefix('auth')->group(function() {
    Route::get('me', 'me');
    Route::post('login', 'login');
    Route::post('register', 'register');
    Route::post('logout', 'logout');
    Route::post('refresh', 'refresh');
});

Route::controller(MarketController::class)->prefix('market')->group(function() {
    Route::get('cryptos', 'cryptos');
    Route::get('stocks', 'stocks');
});

Route::controller(CryptoController::class)->prefix('cryptos')->group(function() {
    Route::get('search', 'search');
    Route::get('today', 'today');
});

Route::controller(StockController::class)->prefix('stocks')->group(function() {
    Route::get('search', 'search');
});

Route::controller(WatchlistController::class)->prefix('watchlists')->group(function() {
    Route::get('my', 'myWatchlists');
    Route::get('{id}', 'getWatchlist');
    Route::post('', 'create');
});

Route::fallback(function() {
    return response()->json([
        'status' => 'error',
        'message' => 'Not found.'
    ], 404);
});
