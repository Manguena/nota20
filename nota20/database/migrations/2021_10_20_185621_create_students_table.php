<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateStudentsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('students', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->string('surname');// surname
            $table->string('year');// student enrollment year            
            $table->string('id_number')->unique();//error, it should be id
            $table->timestamps();
        });

        //MYSQL FULLTEXT SEARCH
        //Create a index for searching the surname or the name of the student
        DB::statement('ALTER TABLE students ADD FULLTEXT search(surname, name)');
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('students');
    }
}
