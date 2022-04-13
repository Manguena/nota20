<?php

namespace App\Providers;

use Illuminate\Foundation\Support\Providers\AuthServiceProvider as ServiceProvider;
use Illuminate\Support\Facades\Gate;
use App\Policies\UserPolicy;
use App\Policies\ConfigPolicy;
use App\Policies\SchoolPolicy;
use App\Policies\SubjectPolicy;
use App\Policies\ClassPolicy;

class AuthServiceProvider extends ServiceProvider
{
    /**
     * The policy mappings for the application.
     *
     * @var array
     */
    protected $policies = [
        // 'App\Models\Model' => 'App\Policies\ModelPolicy',
        'App\Models\Studentclass'=>'App\Policies\ClassPolicy',
    ];

    /**
     * Register any authentication / authorization services.
     *
     * @return void
     */
    public function boot()
    {
        $this->registerPolicies();
        /*-----------------------------------------------------------------------------------------------------
            User controller       
        -----------------------------------------------------------------------------------------------------**/
        //Permission to create user
        Gate::define('create-user', [UserPolicy::class, 'create']);

        //permission to edit a user profile
        Gate::define('edit-user', [UserPolicy::class, 'edit']);

       /****-----------------------------------------------------------------------------------------------------
        * Config controller
        --------------------------------------------------------------------------------------------------------*/
        // Update system configurations 
        Gate:: define('update-config',[ConfigPolicy::class,'update']);

         /****-----------------------------------------------------------------------------------------------------
        * school controller
        --------------------------------------------------------------------------------------------------------*/
        //permission to access the school page
        Gate:: define('view-schoolPage',[SchoolPolicy::class,'view']);

          /****-----------------------------------------------------------------------------------------------------
        * school controller
        --------------------------------------------------------------------------------------------------------*/

        //permission to access the page to introduce system subjects
        Gate:: define('view-subjectPage',[SubjectPolicy::class,'view']);

        /****-----------------------------------------------------------------------------------------------------
        * class controller
        --------------------------------------------------------------------------------------------------------*/

        Gate:: define('create-class',[ClassPolicy::class, 'create']);
        
        Gate:: define('update-class',[ClassPolicy::class, 'update']);

        //Gate:: define('delete-class',[ClassPolicy::class,'delete']);

        

    }
}
