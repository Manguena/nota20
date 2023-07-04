<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;
use App\Models\Role;

class CreateRolesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('roles', function (Blueprint $table) {
            $table->id();
            $table->set('name',['superadmin','admin', 'standard','docente']);
            $table->timestamps();
        });


         // Insert default data for user configuration in the database
         $role = new Role;

         $config->name='superadmin';
         $config->save();

         $config->name='admin';
         $config->save();
         
         $config->name='standard';
         $config->save(); 
        }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('roles');
    }
}
