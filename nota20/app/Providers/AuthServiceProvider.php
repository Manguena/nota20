<?php

namespace App\Providers;

use Illuminate\Foundation\Support\Providers\AuthServiceProvider as ServiceProvider;
use Illuminate\Support\Facades\Gate;
use App\Policies\UserPolicy;

class AuthServiceProvider extends ServiceProvider
{
    /**
     * The policy mappings for the application.
     *
     * @var array
     */
    protected $policies = [
        // 'App\Models\Model' => 'App\Policies\ModelPolicy',
    ];

    /**
     * Register any authentication / authorization services.
     *
     * @return void
     */
    public function boot()
    {
        $this->registerPolicies();
        
        //gate para criacao de usuarios
        Gate::define('create-user', [UserPolicy::class, 'create']);

        // edit user who is standard or an admin
        Gate::define('edit-user', [UserPolicy::class, 'edit']);

        //
       // Gate::define('create-user', [UserPolicy::class, 'create']);

    }
}
