<?php

namespace App\Services;

use GuzzleHttp\Client;

class CryptoService {
    protected $url;
    protected $http;
    protected $headers;

    public function __construct(Client $client) {
        $this->url = "https://pro-api.coinmarketcap.com/v1";
        $this->http = $client;
        $this->headers = [
            'X-CMC_PRO_API_KEY' => env('CMC_PRO_API_KEY', null)
        ];
    }

    public function get(string $url) {
        $full_url = $this->url . $url;
        $request = $this->http->get($full_url, [
            'headers' => $this->headers
        ]);

        $response = $request ? $request->getBody()->getContents() : null;
        $status = $request ? $request->getStatusCode() : null;

        return $response && $status === 200 
            ? json_decode($response, true)['data']
            : null;
    }

    public function getLatestCryptoListings($limit) {
        return $this->get("/cryptocurrency/listings/latest?limit=$limit");
    }
}
