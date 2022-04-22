<?php

namespace App\Exports;

use Maatwebsite\Excel\Concerns\FromCollection;
use Illuminate\Support\Facades\DB;
use App\Models\User;

class GradesExport implements FromCollection
{
    

 /*   protected $userId;

    public function __construct($id){
        $this->userId=$id;
    }
***/

    /**
        * @return \Illuminate\Support\Collection
        */

    public function collection()
    {
       /*
        $fullGradeConfigCollection=DB::table('student_subject')
        ->select('student_subject.grade as grade', 'subjects.name as subject', 'levels.name as level','levels.order', 'studentclasses.name as class', 'courses.name as course')
        ->join('subjects', function($join){
            $join->on('student_subject.subject_id','=','subjects.id');
        })
        ->join('levels', function($join){
            $join->on('subjects.level_id','=','levels.id');
        })
        ->join('studentclasses', function($join){
            $join->on('student_subject.class_id','=','studentclasses.id');
        })
        ->join('courses', function($join){
            $join->on('courses.id','=','studentclasses.course_id');
        })
        ->where('student_subject.student_id','=',1)
        ->orderBy('courses.name')
        ->orderBy('levels.order','asc')
        ->orderBy('studentclasses.name')
        ->get();

        return $fullGradeConfigCollection;
         ***/
    
        return User::all();
    }

}