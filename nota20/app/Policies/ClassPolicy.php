<?php

namespace App\Policies;

use App\Models\User;
use Illuminate\Auth\Access\HandlesAuthorization;
use Illuminate\Auth\Access\Response;

class ClassPolicy
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
        return $user->isAdministrator();
    }

    public function update(User $user){
        return self::create($user);
    }

    public function delete(User $user){
        return self::create($user);
    }

}
