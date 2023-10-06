<?php

namespace App\Policies;

use App\Models\User;
use Illuminate\Auth\Access\HandlesAuthorization;

class ConfigPolicy
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

    // updates the system configuration if the user is an administrator
    public function update(User $user){
        return User::find($user->id)->roles()->get()[0]['name']=='superadmin';
    }
}
