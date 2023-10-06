<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use App\Models\User;
use App\Models\Role;


class HomeController extends Controller
{

   
    /**
     * Create a new controller instance.
     *
     * @return void
     */
    public function __construct()
    {   
        $this->middleware('auth');
    }

    /**
     * Show the application dashboard.
     *
     * @return \Illuminate\Contracts\Support\Renderable
     */
    public function index()
    {
        self::createSuperAdminRole();
       
        return view('home');
    }
 /*****
  * CRIA O ROLE DO USUA'RIO ADMINISTRADOR 
  */
    public function createSuperAdminRole(){

            if(self::onlyOneUser() && self::checkNoRole()){

                $superAdminRole= new Role();
                $superAdminRole->name='superadmin';// It is wrong!!!!!!!!
                $user=User::find(Auth::id());
                
                $user->roles()->save($superAdminRole);
                
                $user->refresh();
                
            }
        
 }

 
 /**
  * this functions checks if there is only one user in the database
* and returns true or false according to the result
 */
 public function onlyOneUser(){
      // vamos verificar se existe um usuario
    $query=DB::table('users')->orderBy('email')->take(2)->get();
   // dd($query);
    return count($query)==1;
 }

 /** this function checks if the authenticated user has no user roles
***/

public function checkNoRole(){

    $role=User::find(Auth::id())->roles()->get();
    return count($role)==0;
}

}
