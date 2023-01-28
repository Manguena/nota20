<?php

namespace App\Exceptions;

use Illuminate\Foundation\Exceptions\Handler as ExceptionHandler;
use Throwable;
use Inertia\Inertia;// I added this 
use Illuminate\Support\Facades\Auth;// only for testing

//eu
use Illuminate\Http\RedirectResponse;
use Illuminate\Support\Facades\Redirect;

class Handler extends ExceptionHandler
{
    /**
     * A list of the exception types that are not reported.
     *
     * @var array
     */
    protected $dontReport = [
        //
    ];

    /**
     * A list of the inputs that are never flashed for validation exceptions.
     *
     * @var array
     */
    protected $dontFlash = [
        'current_password',
        'password',
        'password_confirmation',
    ];

    /**
     * Register the exception handling callbacks for the application.
     *
     * @return void
     */
    public function register()
    {
        $this->reportable(function (Throwable $e) {
            //
        });
    }

    public function render($request, Throwable $e)
    {
        $response = parent::render($request, $e);
          
      // dd($request->input());//-> take all the inputs from the request; in order to figure out that it is a request
        //dd($response->status()); //-> necessary for tomorrow
        if($request->method()==='PATCH'){
           // $response->setStatusCode(404);            
        }

        //return redirect('login');
      
      
       if ($response->status() === 419) {
           
            return back()->with([
                'message' => '419',
            ]);
        }

      //dd($response->status());
    
      // return redirect('login')->with('message', 'Profile updated!');
     
/*
        if (!app()->environment(['local', 'testing']) && in_array($response->status(), [500, 503, 404, 403])) {
            return Inertia::render('Error', ['status' => $response->status()])
                ->toResponse($request)
                ->setStatusCode($response->status());
        } else if ($response->status() === 419) {
            return back()->with([
                'message' => 'The page expired, please try again.',
            ]);
        }
   ***/     
       return $response;
      

    }
}
