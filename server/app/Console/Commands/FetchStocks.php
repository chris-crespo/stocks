<?php

namespace App\Console\Commands;

use App\Models\Stock;
use App\Services\StockService;
use Illuminate\Console\Command;
use Illuminate\Database\QueryException;
use Illuminate\Support\Facades\DB;

class FetchStocks extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'stocks:fetch {--limit=}';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Fetch latest stock listings from Nasdaq';

    /**
     * Execute the console command.
     *
     * @return int
     */
    public function handle(StockService $stockService)
    {
        DB::transaction(function() use ($stockService) {
            Stock::query()->delete();

            $limit = $this->option('limit') ?? 100;
            $listings = $stockService->getLatestStockListings($limit);

            foreach ($listings as $listing) {
                try {
                    $stock = new Stock($listing);
                    $stock->save();
                } catch (QueryException $e) {
                    // Any entry with a missing field gets omitted.
                    // Special chars such as `%` or `$` should have been removed previously.
                }
            }
        });
    }
}
