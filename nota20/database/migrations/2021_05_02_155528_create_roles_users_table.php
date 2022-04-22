<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateRolesUsersTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        if (!Schema::hasTable('role_user')) {// temporariamente para evitar erros
        Schema::create('role_user', function (Blueprint $table) {
            $table->foreignId('role_id')
            ->constrained();
            
            
            $table->foreignId('user_id')
            ->constrained(); 
            
            $table->timestamps();
        });
    }// temporariamente para evitar erros
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('role_user');
    }
}
