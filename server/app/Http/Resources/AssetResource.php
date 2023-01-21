<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

class AssetResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return array|\Illuminate\Contracts\Support\Arrayable|\JsonSerializable
     */
    public function toArray($request)
    {
        return [
            'id' => $this['id'],
            'name' => $this['name'],
            'symbol' => $this['symbol'],
            'price' => $this['price'],
            'marketCap' => $this['market_cap'],
            'lastHourGrowth' => $this['last_hour_growth'],
            'lastDayGrowth' => $this['last_day_growth'],
            'lastWeekGrowth' => $this['last_week_growth']
        ];
    }
}
