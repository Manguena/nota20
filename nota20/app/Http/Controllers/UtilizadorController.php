<?php

namespace App\Http\Controllers;

use Inertia\Inertia;
use Illuminate\Http\Request;

class UtilizadorController extends Controller
{
    //
    public function index(){

        return Inertia::render('user/index');
    }

    public function create(){
        return Inertia::render('user/create');
    }
}
