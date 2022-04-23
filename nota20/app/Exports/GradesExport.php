<?php

namespace App\Exports;

use Maatwebsite\Excel\Concerns\FromCollection;
use Illuminate\Support\Facades\DB;
use Maatwebsite\Excel\Concerns\WithHeadings;
use Maatwebsite\Excel\Concerns\ShouldAutoSize;
use Maatwebsite\Excel\Concerns\WithMapping;

class GradesExport implements FromCollection, WithHeadings, WithMapping, ShouldAutoSize
{
   protected $studentId;
   protected $studentName;
   protected $studentSurname;

    public function __construct($studentConfigArray){
        $this->studentId=$studentConfigArray['id'];
        $this->studentName=$studentConfigArray['name'];
        $this->studentSurname=$studentConfigArray['surname'];
    }


    /**
        * @return \Illuminate\Support\Collection
        */

    public function collection()
    {

        $fullGradeConfigCollection=DB::table('student_subject')
        ->select('courses.name as course', 'levels.name as level', 'studentclasses.name as class', 'subjects.name as subject', 'student_subject.grade as grade','levels.order')
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
        ->where('student_subject.student_id','=',$this->studentId)
        ->orderBy('courses.name')
        ->orderBy('levels.order','asc')
        ->orderBy('studentclasses.name')
        ->get();
    
        return $fullGradeConfigCollection;
         
    }

    public function headings():array{
        return [
            [
                'Apelido:',
                $this->studentSurname
            ],
            [
                'Nome:',
                $this->studentName
            ],
            [
                // one empty line in the excel file
            ],
            [
                'Curso',
                'Nível',
                'Turma',
                'Disciplina',
                'Nota'
            ]
        ];
    }


    public function map($invoice):array{
        return [
           [ 
            $invoice->course,
            $invoice->level,
            $invoice->class,
            $invoice->subject,
            $invoice->grade
            ]
        ];
    }

}