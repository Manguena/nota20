<?php

namespace App\Policies;

use App\Models\User;
use Illuminate\Auth\Access\Response;
use Illuminate\Auth\Access\HandlesAuthorization;
use Illuminate\Support\Facades\DB;


class UserPolicy
{
    use HandlesAuthorization;

    /**
     * Create a new policy instance.
     *
     * @return void
     */
    public function __construct()
    {
        //
    }

public function create(User $user){
//$user =Auth::user()
    return $user->isAdministrator();
}

//Gate to edit user profiles
public function edit(User $user, $listedUserId){
    $roleOfTheSelectedUser=User::find($listedUserId)->roles()->get()[0]['name'];
     //
    $numberOfSuperAdminUsers=DB::table('role_user')
        ->whereRaw('role_id= (select id from roles where name=?) 
        ',[$roleOfTheSelectedUser])
        ->count();

    if ($roleOfTheSelectedUser=='superadmin' && $numberOfSuperAdminUsers==3 && $listedUserId!=$user->id) {
        return true;
    }
    
    if ($roleOfTheSelectedUser=='superadmin'){
        return false;
    }

    if ($user->currentUserRole()=='superadmin'){
        return true;
    }

    return false;
}

}
