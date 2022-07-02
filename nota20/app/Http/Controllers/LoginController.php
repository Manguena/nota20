<?php

namespace App\Http\Controllers;

use Illuminate\Support\Facades\Auth;

use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Facades\Redirect;
//validator
use Illuminate\Support\Facades\Validator;


class LoginController extends Controller
{
    
public function index(){
    
    
        if (Auth::check()) { 
                                //this is useful
        }  
/*
        if($Request->inertia()){
            return response('',409)
                ->header('X-inertia-location', url()->current());
        }
        ***/
        return Inertia::render('login');
}

/**
     * Handle an authentication attempt.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
       // $credentials=null;
        /*** 
        $token = $request->session()->token();
        dd($token);

        ***/

        /*
        
        $credentials = $request->validate([
            'email' => ['required', 'email'],
            'password' => ['required'],
        ]);
        ****/
        /*
        $validator=Validator::make( $request->all(),[
            'email' => ['required', 'email'],
            'password' => ['required'],
        ]
        );

        $errors=$validator->errors();

        if (count($errors)!=0){
            return Inertia::render('login',['love'=>'fuck you nigger']); $credentials->errors();
        }
        ***/
        $credentials = $request->validate([
                'email' => ['required', 'email'],
                'password' => ['required'],
            ]);

        if (Auth::attempt($credentials)) {
            $request->session()->regenerate();
            
           // return Inertia::render('dashboard');
            //return redirect::route('dashboard');
            return redirect()->intended('/');
        }
 
       // dd('The provided credentials do not match our records.');

        return back()->withErrors([
            'email' => 'The provided credentials do not match our records.',
        ]);
    }
 
}
