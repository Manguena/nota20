<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;

class SetupController extends Controller
{
    
/**
 *  It checks if there is a user in the "users" table
 * if there is a user it launches the login page
 * otherwise it lauches the Registration page
 * **/

    public function index(){

       $query=DB::table('users')->orderBy('email')->take(1)->get();
    
       if (count($query)>=1) return redirect()->route('dashboard');
        // else return view('nota20auth.setup');
        
        return view('nota20auth.setup');
    }
}
