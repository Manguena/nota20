<?php

namespace App\Http\Controllers;

use Illuminate\Support\Facades\Auth;

use Illuminate\Http\Request;
use Inertia\Inertia;


class InicioController extends Controller
{
    
public function index(){
    /**
    *return Inertia::render('/inicio',[]); 
        ****/
    
        if (Auth::check()) { 
            
        }
        
            
        
    return view('nota20auth.userlogin');
}

 
}
