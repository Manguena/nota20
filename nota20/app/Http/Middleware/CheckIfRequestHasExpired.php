<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
//temp shit
use Inertia\Inertia;

class CheckIfRequestHasExpired
{
    /**
     * Handle an incoming request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \Closure  $next
     * @return mixed
     */
    public function handle(Request $request, Closure $next)
    {  
        
       $test=($next($request));
        $testToArray=(array)$test;
        if($testToArray["\x00*\x00statusCode"]){
            return response('',409)
                ->header('X-inertia-location', url()->current());
        }

       return $next($request);
    }
}
