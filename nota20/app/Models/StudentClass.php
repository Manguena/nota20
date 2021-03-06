<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class StudentClass extends Model
{
    use HasFactory;

    /**
     * The table associated with the model.
     *
     * @var string
     */
    protected $table = 'studentclasses';

    public function students(){
       return $this->belongsToMany(Student::class,'student_studentclass','studentclass_id','student_id');
    }

}
