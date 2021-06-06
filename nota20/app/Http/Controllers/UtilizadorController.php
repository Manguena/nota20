<?php

namespace App\Http\Controllers;

use App\Models\Role;
use App\Models\User;
use Inertia\Inertia;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Http\RedirectResponse;
use Illuminate\Support\Facades\Redirect;
use Illuminate\Routing\Redirector;//nao sei se funciona
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\Auth;// retirar depois de realizar testes
use Illuminate\Support\Facades\Gate;
use Illuminate\Auth\Access\AuthorizationException;
class UtilizadorController extends Controller
{
    

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

        Gate::authorize('create-user');
        
        return Inertia::render('user/create',[]);
    }

    public function store(Request $request, User $user){

        // You can only create a user if you are an administrator,
        // otherwise throw error
        Gate::authorize('create-user');

         $request->validate([
            'apelido' => 'required|max:255|min:3',
            'name' => 'required|max:255|min:3',
            'email' => 'required | max:50|min:3|unique:App\Models\User|email',
            'bi' => 'required|min:3|max:255|unique:App\Models\User',
            'password' =>'required|confirmed|min:8|string|regex:/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).+$/',
            'password_confirmation' => 'required | min:8|string|regex:/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).+$/',
            'admin'=>'exclude_if:standard,standard|required|regex:/\badmin\b/',
            'standard'=>'exclude_if:admin,admin|required|regex:/\bstandard\b/'
        ]);

      

      
        /**$user= new User;
        $user->name=$request->name;
        $user->email=$request->email;
        $user->password=Hash::make($request->password);// deve ser encriptado
        $user->bi=$request->bi;
        $user->apelido=$request->apelido;
        $user->save();

        //The Id of the user just created
        $userId=$user->id;
        $role=new Role(['name'=>$request->role]);
        
        $user=User::find($userId);
       

       $user->roles()->save($role);
        $user->refresh();
***/

  return Redirect::route('utilizador.create')->with('message', $request->apelido);
  
}

public function edit(){
    return Inertia::render('user/edit');
}

}
