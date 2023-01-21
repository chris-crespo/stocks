<?php

namespace App\Http\Controllers;

use App\Models\Stock;
use App\Http\Resources\AssetCollection;
use App\Http\Resources\StockCollection;
use Illuminate\Http\Request;

class StockController extends Controller
{
    public function __construct() {
        $this->middleware('auth:api');
    }

    public function index(Request $request) {
        $searchTerm = $request->input('searchTerm') ?? '';
        $size = $request->input('size') ?? 10;

        $page = Stock::where('name', 'like', "%$searchTerm%")
            ->orWhere('symbol', 'like', "%$searchTerm%")
            ->join('last_stock_price', 'stocks.id', '=', 'last_stock_price.id')
            ->join('stock_market_cap', 'stocks.id', '=', 'stock_market_cap.stock_id')
            ->join('last_hour_stock_growth', 'stocks.id', '=', 'last_hour_stock_growth.id')
            ->join('last_day_stock_growth', 'stocks.id', '=', 'last_day_stock_growth.id')
            ->join('last_week_stock_growth', 'stocks.id', '=', 'last_week_stock_growth.id')
            ->paginate($size)
            ->toArray();

        return response()->json([
            'status' => 'success',
            'data' => [
                'page' => [
                    'data' => new AssetCollection($page['data']),
                    'total' => $page['total']
                ]
            ]
        ]);
    }

    public function search(Request $request) {
        $searchTerm = $request->input('searchTerm') ?? '';
        $size = $request->input('size') ?? 5;

        $page = Stock::where('name', 'ilike', "%$searchTerm%")
            ->orWhere('symbol', 'ilike', "%$searchTerm%")
            ->paginate($size)
            ->toArray();

        return response()->json([
            'status' => 'success',
            'data' => [
                'page' => [
                    'data' => $page['data'],
                    'total' => $page['total']
                ]
            ]
        ]);
    }
}
