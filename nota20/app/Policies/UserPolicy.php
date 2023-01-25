<?php

namespace App\Policies;

use App\Models\User;
use Illuminate\Auth\Access\Response;
use Illuminate\Auth\Access\HandlesAuthorization;

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
public function edit(User $user, $listedUserIid){
    $listedUserRole=User::find($listedUserIid)->roles()->get()[0]['name'];

     if ($user->currentUserRole()=='superadmin'){
        return true;
    }

    return false;
}

}
