<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Student extends Model
{
    use HasFactory;

    public function studentclasses(){
        return $this->belongsToMany(Studentclass::class,'student_studentclass','student_id','studentclass_id');
    }

    public function subjects(){
        return $this->belongsToMany(Subject::class)->withPivot('class_id','grade');
    }
}
