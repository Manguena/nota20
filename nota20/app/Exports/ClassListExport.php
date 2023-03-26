<?php

namespace App\Exports;

use Maatwebsite\Excel\Concerns\FromCollection;
use Illuminate\Support\Facades\DB;
use Maatwebsite\Excel\Concerns\WithHeadings;

class ClassListExport implements FromCollection, WithHeadings
{
    protected $classId;

    /**
    * @return \Illuminate\Support\Collection
    */
    public function __construct ($classId)
    {
        $this->classId=$classId;
    }

    public function collection(){

        //Get the students from DB
       $studentConfigArray=DB::table('students')
       ->select('surname','name', 'id_number')
       ->join('student_studentclass', function($join){
           $join->on('student_studentclass.student_id','=','students.id');
       })
       ->where('student_studentclass.studentclass_id','=',$this->classId)
       ->orderBy('students.surname')
       ->orderBy('students.name')
       ->get();

       return $studentConfigArray;
    }

    public function headings(): array
    {
        return [
            'Apelido',
            'Nome',
            'B.I',
        ];
    }
}
