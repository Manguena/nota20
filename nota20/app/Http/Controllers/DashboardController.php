<?php

namespace App\Http\Controllers;
use Illuminate\Support\Facades\Auth;

use Illuminate\Http\Request;
use Inertia\Inertia;

use Illuminate\Support\Facades\DB;
use App\Models\User;
use App\Models\Role;


class DashboardController extends Controller
{
    //

/**
 * This function launches the dashboard and sends the authenticated user's name 
 * as a porp
*/
    public function index(){
    
        self::createRole();

        return Inertia::render('dashboard/index');
    }



    /*****
  * CRIA O ROLE DO USUA'RIO ADMINISTRADOR 

  */
  public function createRole(){

    //if(self::onlyOneUser() && self::checkNoRole()){

        
        $superAdminRole= new Role([
            'name'=>'superadmin'
        ]);
    
        $user=User::find(Auth::id());
        
        $user->roles()->save($superAdminRole);
        
        $user->refresh();
        
    //}

}


/**
* this functions checks if there is only one user in the database
* and returns true or false according to the result
*/
public function onlyOneUser(){
// vamos verificar se existe um usuario
$query=DB::table('users')->orderBy('email')->take(2)->get();

return count($query)==1;
}

/** this function checks if the authenticated user has no user roles
***/

public function checkNoRole(){
$role=User::find(Auth::id())->roles()->get();
return count($role)==0;

}

}
