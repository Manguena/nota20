<?php

namespace App\Http\Controllers;

use App\Models\Role;
use App\Models\User;
use Inertia\Inertia;
use Illuminate\Http\Request;

class UtilizadorController extends Controller
{
    //
    public function index(){

        $userCounter=0;
        $userArray=array();
        $userArrayCounter=0;
        
        
       foreach (User::all() as $user) {
           $userCounter++;
           $userArray[$userArrayCounter]=
           array(
               
                "numero"=> $userCounter,
                "id"=>$user->id,
                "apelido"=>$user->apelido,
                "nome"=>$user->name,
                "role"=>User::find($user->id)->roles()->get()[0]['name']
           );
           $userArrayCounter++;
        }
        
        
        return Inertia::render('user/index',[
            'useraArray'=>$userArray
        ]);

    }

    public function create(){
        return Inertia::render('user/create');
    }
}
