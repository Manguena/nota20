<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;

class DealWithExcelDownloadError
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
        
        // if the sessions expires while,then the user downloads a report file,
        // redirect to the report/create route, instead of trying to download the file, to avoid an error
        //http://127.0.0.1:8000/login
        if(str_ends_with($request->session()->previousUrl(),'/login')){
    
            $getRouteParam=$request->route()->parameter('id');
            $getRouteParam=(int)$getRouteParam;

            return redirect()->route('report.create',['id'=>$getRouteParam]);
        }   
        
        return $next($request);
    }
}
