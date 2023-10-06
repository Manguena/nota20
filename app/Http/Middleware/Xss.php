<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;

class Xss
{
    /**
     * 
     */
    /**
     * sanitizes form inputs, to avoid Xss attacks, except for "password" and "new-password" fields
     * Handle an incoming request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \Closure  $next
     * @return mixed
     */
    public function handle(Request $request, Closure $next)
    {
        $input=$request->all();
    
        array_walk_recursive($input, function(&$item, $key){
        
            if($key=="password"){}
            else if( $key=="new_password"){}
            else{
                 $item=strip_tags($item);
            }
        });

        $request->merge($input);

        return $next($request);
    }
}
