<?php

namespace App\Http\Controllers;

use App\Models\Crypto;
use App\Http\Resources\AssetCollection;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class CryptoController extends Controller
{
    public function __construct() {
        $this->middleware('auth:api');
    }

    public function search(Request $request) {
        $searchTerm = $request->input('searchTerm') ?? '';
        $size = $request->input('size') ?? 5;

        $page = Crypto::where('name', 'ilike', "%$searchTerm%")
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

    public function today(Request $request) {
        $symbols = $request->input('symbols');
        if (!$symbols) return response()->json([
            'status' => 'error',
            'message' => 'No symbols have been selected.'
        ]);

        $cryptos = DB::table('todays_asset_prices')
            ->whereIn('symbol', $symbols)
            ->get()
            ->toArray();
        
        return response()->json([
            'status' => 'success',
            'data' => [
                'cryptos' => $cryptos
            ]
        ]);
    }
}
