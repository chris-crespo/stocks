<?php

namespace App\Console\Commands;

use App\Models\Crypto;
use App\Services\CryptoService;
use Illuminate\Console\Command;
use Illuminate\Support\Facades\DB;

class FetchCryptos extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'cryptos:fetch {--limit=}';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Fetch latest crypto listings from CoinMarketCap';

    /**
     * Execute the console command.
     *
     * @return int
     */
    public function handle(CryptoService $cryptoService)
    {
        DB::transaction(function() use ($cryptoService) {
            Crypto::query()->delete();

            $limit = $this->option('limit') ?? 100;
            $listings = $cryptoService->getLatestCryptoListings($limit);

            foreach ($listings as $listing) {
                $crypto = new Crypto([...$listing, ...$listing['quote']['USD']]);
                $crypto->save();
            }
        });
    }
}
