<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class StudentSubject extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        //
        Schema::create('student_subject', function (Blueprint $table) {
            $table->string('class_id');
            $table->decimal('grade', $precision = 4, $scale = 2);
            
            $table->foreignId('student_id')
            ->constrained();
            
            $table->foreignId('subject_id')
            ->constrained(); 
            
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        //
    }
}
