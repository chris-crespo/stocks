<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Crypto extends Model
{
    use HasFactory;

    protected $fillable = [
        'name',
        'symbol',
    ];

    protected $casts = [
        'price' => 'decimal:6',
        'market_cap' => 'decimal:6'
    ];
}
