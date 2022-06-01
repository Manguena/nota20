<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Redirect;
use Inertia\Inertia;
use App\Models\Config;
use Illuminate\Support\Facades\Gate;


class ConfigController extends Controller
{
    //
    public function index(){
        $configArray=Config::all()->toArray()[0];

        return Inertia::render('config/index',['configArray'=>$configArray]);
    }

    public function update(Request $request, $id){

        if(!Gate::allows('update-config')){
            abort(403,'Sem permissão');
        }

        $request->validate([
            'superadmin'=>'required|integer|gte:2|lt:4',
            'admin' => 'required|integer|gte:2|lt:6',
            'standard' => 'required|integer|gte:5|lt:11',
        ]);
       

        $config=Config::find($id);
        $config->superadmin=$request->toArray()['superadmin'];
        $config->admin=$request->toArray()['admin'];
        $config->standard=$request->toArray()['standard'];
        $config->save();

        return Redirect::route('config')->with('message','Actualização realizada com sucesso');
    }
}
