<?php

namespace App\Services;

use Spatie\SimpleExcel\SimpleExcelReader;

class StockService {
    public function getLatestStockListings($limit) {
        return SimpleExcelReader::create('./resources/csv/stocks.csv')
            ->getRows() 
            ->all();
    }
}
