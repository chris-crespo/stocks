<?php

namespace App\Http\Controllers;

use App\Models\Watchlist;
use App\Http\Resources\WatchlistCollection;
use App\Http\Resources\WatchlistResource;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Validation\Rule;

class WatchlistController extends Controller
{
    public function __construct() {
        $this->middleware('auth:api');
    }

    public function getWatchlist($id) {
        $watchlist = Watchlist::with(['cryptos', 'stocks'])->find($id);
        if (!$watchlist) return response()->json([
            'status' => 'error',
            'message' => 'Watchlist doesn\'t exist'
        ], 404);

        return response()->json([
            'status' => 'success',
            'data' => [
                'watchlist' => $watchlist
            ]
        ]);
    }

    public function myWatchlists() {
        $user = Auth::user();
        $watchlists = $user->watchlists()
            ->with(['cryptos', 'stocks'])
            ->paginate(10)
            ->toArray();

        return response()->json([
            'status' => 'success',
            'data' => [
                'page' => [
                    'data' => $watchlists['data'],
                    'total' => $watchlists['total']
                ]
            ]
        ]);
    }

    public function create(Request $request) {
        $user = Auth::user();
        $request->validate([
            'name' => ['required', 'max:20', 'string', Rule::unique('watchlists')->where('user_id', $user->id)],
            'description' => 'nullable|string',
            'cryptos' => 'present|array|exists:cryptos,id',
            'stocks' => 'present|array|exists:stocks,id'
        ]);

        $watchlist = Watchlist::create([
            'name' => $request->name,
            'description' => $request->description,
            'user_id' => $user->id,
        ]);
        $watchlist->cryptos()->sync($request['cryptos']);
        $watchlist->stocks()->sync($request['stocks']);

        return response()->json([
            'status' => 'success',
            'message' => 'Watchlist created successfully.',
            'data' => [
                'watchlist' => $watchlist
            ]
        ]);
    }
}
