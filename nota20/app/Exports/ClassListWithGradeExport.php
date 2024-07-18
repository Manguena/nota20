<?php

namespace App\Exports;

//use Maatwebsite\Excel\Concerns\FromCollection;
use Maatwebsite\Excel\Concerns\FromArray;
use Illuminate\Support\Facades\DB;
use Maatwebsite\Excel\Concerns\WithHeadings;

class ClassListWithGradeExport implements FromArray, WithHeadings
{
    protected $classId;

    

    public function __construct($classId) {
        $this->classId=$classId;
    }
    /**
    * @return \Illuminate\Support\Collection
    */
    public function array(): array
    {   
        $newlistWithGrades=[];
        $temporaryArray=[];

        $listWithGrades=DB::table('student_subject')
                            ->join('students', 'students.id','=','student_subject.student_id')
                            ->select('student_subject.grade','students.surname','students.name')
                            ->where('class_id','=','30')
                            ->orderBy('student_subject.student_id')
                            ->orderBy('student_subject.subject_id')
                            ->get();

        $listWithGrades=$listWithGrades->toArray();
       
       
        
    $size=count($listWithGrades);
    

        for($i=0; $i< $size; $i++){
           
            array_push($temporaryArray, $listWithGrades[$i]->grade);

            if(($listWithGrades[$i]==$listWithGrades[$size-1]) ){
                array_push($temporaryArray, $listWithGrades[$i]->surname);
                array_push($temporaryArray, $listWithGrades[$i]->name);
                array_push($newlistWithGrades,$temporaryArray);
                
                $temporaryArray=[];
                }
            else if(($listWithGrades[$i]->surname != $listWithGrades[$i+1]->surname)){
                array_push($temporaryArray, $listWithGrades[$i]->surname);
                array_push($temporaryArray, $listWithGrades[$i]->name);
                array_push($newlistWithGrades,$temporaryArray);
                $temporaryArray=[];
                }
       }
       
      
       return $newlistWithGrades;
       
        
    }
    
    
    
    
    /**
     * go to the database, get the subjects that belong to a class
     * then add surname and name to it
     */
    
    public function headings(): array
    {

        $newSubjectArray=[];// array with subjects, name and surname

       $subjectArray=DB::table('subjects') 
            ->select('subjects.name')
            ->whereRaw('subjects.id IN (SELECT subject_id FROM student_subject WHERE class_id=? ORDER BY subject_id)',[$this->classId])
            ->get()
            ->toArray();
        
            foreach ($subjectArray as $value) {
                
                array_push($newSubjectArray,$value->name);
            }

            array_push($newSubjectArray, "Apelido");
            array_push($newSubjectArray, "Nome");


        return $newSubjectArray;
  
    }
        
}
