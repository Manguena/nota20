<?php

namespace App\Http\Controllers;

use Illuminate\Support\Facades\Auth;

use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Facades\Redirect;


class InicioController extends Controller
{
    
public function index(){
    /**
    *return Inertia::render('/inicio',[]); 
        ****/
    
       // if (Auth::check()) { 
                                //this is useful
        //}
        
            
        
        //return Inertia::render('login');
   // return view('nota20auth.userlogin');
return Inertia::render('login');
}

 
}
