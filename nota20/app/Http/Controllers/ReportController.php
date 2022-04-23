<?php

namespace App\Http\Controllers;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Facades\DB;
use Maatwebsite\Excel\Facades\Excel;
use App\Exports\GradesExport;
 


class ReportController extends Controller
{
    /*
        List all students in different pages
    */
    public function index(){

        $studentConfigArray=DB::table('students')
                                    ->orderBy('year', 'desc')
                                    ->orderBy('surname', 'asc')                        
                                    ->paginate(15);
                                    
        $studentConfigArray=$studentConfigArray->toArray();
    
        return Inertia::render('report/index',[
            'studentConfigArray'=>$studentConfigArray['data'],
            'currentPage'=>$studentConfigArray['current_page'],
            'lastPage'=>$studentConfigArray['last_page'],
            'route'=>'',// no need, but must appear as empty, because of the front error implementation 
            'isSearchable'=>false,
            'queryString'=>''
        ]
    
    );
    }

    /*
        search students and return to the front end
    */

    public function search(Request $request){

        // dd($request->fullUrl()); //-> this gives the full url  
       
         if(!array_key_exists('page',$request->toArray())){
                 $request->validate( [
                 'surname' => [
                     'nullable',
                     'string'
                 ],
                 'year' => [
                     'required',
                     'regex:/^(19|20)\d{2}$/',
                     'integer',
                     'min:4',
                 ]
             ]);
         }
     
         $surname=$request->surname;
         $year=$request->year;
         
         if($year==null){
             // sanitization of the data to be taken from the url parameters
             $year=htmlspecialchars($_GET["year"]);
         }
     
         if($surname==null){
             $surname=htmlspecialchars($_GET["surname"]);
         }
         
        
         if($surname==null){
             $studentConfigArray=DB::table('students')
                             ->select('*')
                             ->whereRaw('year=?', [$year])
                             ->paginate(1);
         }
         else{
             $studentConfigArray=DB::table('students')
                 ->select('*')
                 ->whereRaw('MATCH(surname, name)AGAINST (? WITH QUERY EXPANSION) AND year=?', [$surname, $year])
                 ->paginate(1);
         }
         
         
        $studentConfigArray->appends(['year'=>$request->year, 'surname'=>$request->surname]);
         
     
         $studentConfigArray=$studentConfigArray->toArray();
        // dd($studentConfigArray);
         //dd(htmlspecialchars($_GET["surname"]));
         return Inertia::render('report/index',[
             'studentConfigArray'=>$studentConfigArray['data'],
             'currentPage'=>$studentConfigArray['current_page'],
             'lastPage'=>$studentConfigArray['last_page'],
             'urlParameter1'=>$year,
             'urlParameter2'=>$surname,
             'route'=>'',// no need, but must appear as empty, because of the front error implementation 
             'isSearchable'=>false,
             'queryString'=>''
         ]);
         
     }

     public function create($id){

        $studentConfigArray=DB::table('students')->find($id);
        
        //Get the garde, class, course, level info for a specific student from the database
        $gradeConfigArray=DB::table('student_subject')
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
        ->where('student_subject.student_id','=',$id)
        ->orderBy('courses.name')
        ->orderBy('levels.order','asc')
        ->orderBy('studentclasses.name')
        ->paginate(30);


        $fullGradeConfigArray=DB::table('student_subject')
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
        ->where('student_subject.student_id','=',$id)
        ->orderBy('courses.name')
        ->orderBy('levels.order','asc')
        ->orderBy('studentclasses.name')
        ->get()
        ->toArray();


    return Excel::download(new GradesExport((array)$studentConfigArray), 'grade.xlsx');
   
        
        /*** 
        $studentConfigArray=DB::table('students')
        ->orderBy('year', 'desc')
        ->orderBy('surname', 'asc')                        
        ->paginate(15);
        **/
        $gradeConfigArray=$gradeConfigArray->toArray();
        //dd($gradeConfigArray);

        return Inertia::render('report/create',[
        'studentConfigArray'=>$studentConfigArray,    
        'gradeConfigArray'=>$gradeConfigArray['data'],
        'currentPage'=>$gradeConfigArray['current_page'],
        'lastPage'=>$gradeConfigArray['last_page'],
        'route'=>'',// no need, but must appear as empty, because of the front error implementation 
        'isSearchable'=>false,
        'queryString'=>''
        ]

        );
    }
    /**
     * export and download users grades
     * */ 
    //public function export(){
      //  $GradesExport= new GradesExport();
        //$GradesExport->collection($id);

        //return Excel::download(new UsersExport, 'users.xlsx');


    //}

    
}