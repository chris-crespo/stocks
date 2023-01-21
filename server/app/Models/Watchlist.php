<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Watchlist extends Model
{
    use HasFactory;

    protected $guarded = [];

    public function cryptos() {
        return $this->belongsToMany(Crypto::class);
    }

    public function stocks() {
        return $this->belongsToMany(Stock::class);
    }
}
