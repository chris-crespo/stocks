<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Auth\Middleware\Authenticate as Middleware;

class Json extends Middleware
{
    /**
     * Handle an incoming request.
     *
     * @param \Illuminate\Http\Request  $request
     * @param Closure  $next
     * @return mixed
     */
    public function handle($request, Closure $next, ...$guards)
    {
        $request->headers->set('Accept', 'application/json');
        return $next($request);
    }
}
