<?php

namespace App\Http\Controllers;

use App\Http\Resources\AssetCollection;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class MarketController extends Controller
{
    public function __construct() {
        $this->middleware('auth:api');
    }

    public function cryptos(Request $request) {
        $searchTerm = $request->input('searchTerm') ?? '';
        $size = $request->input('size') ?? 10;

        $page = DB::table('market_cryptos')
            ->where('name', 'ilike', "%$searchTerm%")
            ->orWhere('symbol', 'ilike', "%$searchTerm%")
            ->paginate($size)
            ->toArray();

        return response()->json([
            'status' => 'success',
            'data' => [
                'page' => [
                    'data' => new AssetCollection($this->stdClassToArray($page['data'])),
                    'total' => $page['total']
                ]
            ]
        ]);
    }

    public function stocks(Request $request) {
        $searchTerm = $request->input('searchTerm') ?? '';
        $size = $request->input('size') ?? 10;

        $page = DB::table('market_stocks')
            ->where('name', 'like', "%$searchTerm%")
            ->orWhere('symbol', 'like', "%$searchTerm%")
            ->paginate($size)
            ->toArray();
        
        return response()->json([
            'status' => 'success',
            'data' => [
                'page' => [
                    'data' => new AssetCollection($this->stdClassToArray($page['data'])),
                    'total' => $page['total']
                ]
            ]
        ]);
    }

    public function last_prices(Request $request) {
        $symbols = $request->input('symbol') ?? [];
        $span = $request->input('span') ?? 'day';

        $table = $span === 'month'
          ? 'this_months_asset_prices'
          : ($span === 'week'
            ? 'this_weeks_asset_prices'
            : 'todays_asset_prices');

        $prices = DB::table($table)
            ->orderBy('date', 'asc')
            ->whereIn('symbol', $symbols)
            ->get()
            ->toArray();

        return response()->json([
            'status' => 'success',
            'data' => [
                'prices' => $prices
            ]
        ]);
    }

    function stdClassToArray($klass) {
        return json_decode(json_encode($klass, true), true);
    }
}
