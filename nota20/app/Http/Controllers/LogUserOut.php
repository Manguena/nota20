<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class LogUserOut extends Controller
{
    

    /**
     * fist, log the user out, then
     * returns the login page after the user logs out
    */
    public function index(Request $request){

        Auth::logout();

        $request->session()->invalidate();

        $request->session()->regenerateToken();

        $url='/';// the address to be loaded
        return Inertia::location($url);
    }

}
