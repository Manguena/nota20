<?php

namespace App\Http\Controllers;
use Illuminate\Support\Facades\Auth;

use Illuminate\Http\Request;
use Inertia\Inertia;

class DashboardController extends Controller
{
    //

/**
 * This function launches the dashboard and sends the authenticated user's name 
 * as a porp
*/
    public function index(){
      
    return Inertia::render('dashboard/index');
    }
}
