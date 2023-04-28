<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Models\Course;
use App\Models\Student;
use App\Models\Subject;
use App\Models\Studentclass;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\Redirect;
use Illuminate\Support\Facades\DB;
use Illuminate\Database\Query\JoinClause;
use Illuminate\Support\Facades\Gate;
use Illuminate\Auth\Access\AuthorizationException;
use App\Exports\ClassListExport;
use Maatwebsite\Excel\Facades\Excel;

class ClassController extends Controller
{
    //
    /***
     * 
     * loads the course page of the class section
     * and sends the pagination information to the page
     */

    public function course(){
        

        $courseArray=Course::paginate(15)->toArray();

        return Inertia::render('class/course',
        [
            'courseArray'=>$courseArray['data'],
            'currentPage'=>$courseArray['current_page'],
            'lastPage'=>$courseArray['last_page'],
            'route'=>'',// no need, but must appear as empty, because of the front error implementation 
            'isSearchable'=>false,
            'queryString'=>''
        ]);

    }
/*

searches for the course in the course page of the 
pagination section
*/

    public function search(Request $request){
        $validator = Validator::make($request->all(), [
            'searchItemData' => [
                'required',
                'string',
                'min:1',
            ]
        ]);

        if ($validator->fails()){
            return response($validator->errors());
        }        


    
       $searchItem=$request->toArray()['searchItemData'];
      
       $searchArray = Course::search($searchItem)->paginate(15);
        
       $searchConfigArray=$searchArray->toArray()['data'];
       
       return response($searchConfigArray);

    }
/***
 * list the subject for the course
 * **/
    public function subject($courseName, $courseId,$className,$classId,$levelId){
        $subjectArray=self::listSubject($courseId, $levelId);
        
        return Inertia::render('class/subject',[
            'courseName'=>$courseName,
            'className'=>$className,
            'classId'=>$classId,
            'courseId'=>$courseId,
            'subjectConfigArray'=>$subjectArray
        ]);

    }

    /*
        show classroom creation form and classes stored in the database
    */
    public function index($courseName, $courseId){

        $classConfigArray=self::listClasses($courseId);

        $classConfigArray=$classConfigArray->toArray();
        
        return Inertia::render('class/index',[
            'courseName'=>$courseName,
            'courseId'=>$courseId,
            'classConfigArray'=>$classConfigArray['data'],
            'currentPage'=>$classConfigArray['current_page'],
            'lastPage'=>$classConfigArray['last_page'],
            'route'=>'',// no need, but must appear as empty, because of the front error implementation 
            'isSearchable'=>false,
            'queryString'=>''

        ]);
    }

/*
    See the students grade for the current subject
*/
    public function grade($classId, $subjectId){
        $classId=htmlspecialchars($classId,ENT_QUOTES);

        
        $subjectName=Subject::where('id',$subjectId)->first()->name;//Get the subjectName

        //Get the students from DB
       $studentConfigArray=DB::table('students')
       ->select('*')
       ->join('student_studentclass', function($join){
           $join->on('student_studentclass.student_id','=','students.id');
       })
       ->where('student_studentclass.studentclass_id','=',$classId)
       ->orderBy('students.surname')
       ->orderBy('students.name')
       ->get();
       
       $studentConfigArray=$studentConfigArray->toArray();

       //dd($studentConfigArray);
       //Get information about the class from DB
       $classConfigArray=DB::table('studentclasses')
       ->where('id','=',$classId)
       ->get()
       ->toArray();

       $courseId=(array)$classConfigArray[0];
       $courseId=$courseId['course_id'];

       $courseName=DB::table('courses')
                    ->select('name')
                    ->where('id','=', $courseId)
                    ->get()
                    ->toArray();
       
    // get the grades for the specific subject from the DB
    $gradeConfigArray=DB::table('student_subject')
    ->where('class_id','=',$classId)
    ->where('subject_id','=',$subjectId)
    ->get()
    ->toArray();
    
       
       return Inertia::render('class/grade',[
           'studentConfigArray'=>$studentConfigArray,
           'classConfigArray'=>$classConfigArray[0],
           'subjectId'=>$subjectId,
           'subjectName'=>$subjectName,
           'gradeConfigArray'=>$gradeConfigArray,
           'courseName'=>(array)$courseName[0]
          // 'courseConfigArray'=>$courseConfigArray[0]
       ]);

    }

    public function store(Request $request){

//     Gate::authorize('create-class');// gate to authorize admin users to create classes and store into the database

         $validator = Validator::make($request->all(), [
            'className' => [
                'required',
                'string',
                'min:1',
            ],
            'levelName' => [
                'required',
                'string',
                'min:1',
            ],
            'schoolYear' => [
                'required',
                'regex:/^(19|20)\d{2}$/',
                'integer',
                'min:4',
            ],
            //no need to send the validation errors below to the user
            // it's unnecessary
            'levelId' => [
                'integer'
            ],
            'courseId' => [
                'integer',
            ],

        ]);

        if ($validator->fails()){
            return response($validator->errors());
        }  

        $class= new Studentclass();
        $class->name=$request->className;
        $class->year=$request->schoolYear;
        $class->course_id=$request->courseId;
        $class->level_id=$request->levelId;
        $class->save();

        return response([
            'id'=>$class->id,
            'name'=>$class->name,
            'level'=>$request->levelName,
            'levelId'=>$request->levelId,
            'year'=>$class->year
        ]);
        
    }
    /**
     * Store grades in the database
    */

    public function storeGrade(Request $request){
        $studentArray=$request->toArray();
        $errorArray=[];
       $validatorErrorArray=[];
        
        $subjectId=$request[0]['subject'];// get the subject ID
        $classId=$request[0]['class'];// get the class Id

        // form validation
       foreach ($studentArray as $value) {
    
        $validator = Validator::make($value, [
                    'id' => [
                        'required',
                        'integer',
                        'min:1',
                    ],
                    'grade' => [
                        'nullable',
                        'numeric',
                        'min:0',
                        'max:20'
                    ]

                ]);
            
            array_push($validatorErrorArray,
                       [$validator->errors()
                        ->first('grade')]
                    );
       }

           

             //create a unique array with all the form errors 
             $validatorErrorArray=array_map(function($nr){
                return $nr[0];
            }, $validatorErrorArray);

            if($validator->fails() || strlen(implode($validatorErrorArray)) >0){
                
                return Redirect::route('class.grade',['classId'=>$classId, 'subjectId'=>$subjectId])->withErrors($validatorErrorArray);

            }

    // Get the Current Subject object from eloquent
    $subject=Subject::find( $subjectId);
    
    //if grade from front end is empty 

    $data=$request->toArray();

        // insert the data into the database by looping the request from the front end
    foreach ($data as $value) {
       $grade=$value["grade"];
       
        if($value["grade"]==""){
            $grade=null;
        }
        
        
       $subject->students()->attach($value['id'], ['class_id'=>$value['class'],'grade'=>$grade]);
    }
    
    unset($value);// Break reference with the last element(Fom PHP.NET)

    return Redirect::route('class.grade', ['classId' =>$classId, 'subjectId'=>$subjectId])->with('message', 'Notas introduzidas com Sucesso');

    }

    /**
     * update the students grade for a certain subject
     */
    public function updateGrade(Request $request){

        $data=$request->toArray();
    
       // $classId=$request[0]['class'];->Not used
        $studentArray=$request->toArray();
        $subjectId=$request[0]['subject'];
        $subject=Subject::find($subjectId);//get the subject object
        $classId=$request[0]['class'];// get the class Id
        $validatorErrorArray=[];// array to hold  validation errors
        // form validation
        foreach ($studentArray as $value) {
    
            $validator = Validator::make($value, [
                        'id' => [
                            'nullable',
                            'integer',
                            'min:1',
                        ],
                        'grade' => [
                            'nullable',
                            'numeric',
                            'min:0',
                            'max:20'
                        ]
    
                    ]);
                
                array_push($validatorErrorArray,
                           [$validator->errors()
                            ->first('grade')]
                        );
           }

           //create a unique array with all the form errors 
           $validatorErrorArray=array_map(function($nr){
            return $nr[0];
        }, $validatorErrorArray);

        if($validator->fails() || strlen(implode($validatorErrorArray)) >0){
            
            //return Redirect::route('class.grade',['classId'=>$classId, 'subjectId'=>$subjectId])->withErrors($validatorErrorArray);
            return response()->json($validatorErrorArray);
        }

       // Test
       // $test=

        //test

       // loop the request and update the table in the DB
     foreach ($data as &$value) {
            //if $value is empty, set it to null
            if(strlen(trim($value['grade']))==0){
                $value['grade']=null;
            }


            DB::table('student_subject')
                ->where('student_id',$value['id'])
                ->where('class_id',$value['class'])
                ->where('subject_id',$value['subject'])
                ->update(['grade'=>$value['grade']]);
        }

        unset($value);// Break reference with the last element(Fom PHP.NET)
        /*** 
        return response()->json([
            'message' => 'Notas actualizadas com sucesso'
        ]);*/
        return Redirect::route('class.grade', ['classId' =>$classId, 'subjectId'=>$subjectId])->with('message', 'Notas Actualizadas com Sucesso');
        
    }

    /****
     * 
     * update the subject name
     */

     public function update(Request $request, $id){
         
        $validator = Validator::make($request->all(), [
            'className' => [
                'required',
                'string',
                'min:1',
            ],
            'schoolYear' => [
                'required',
                'regex:/^(19|20)\d{2}$/',
                'integer',
                'min:4',
            ]
        ]);


         if ($validator->fails()){
            return response($validator->errors());
            }

        $class=Studentclass::find($request->id);
        $class->name=$request->className;
        $class->year=$request->schoolYear;
        $class->save();
        
        
        return response([
            'id'=>$class->id,
            'name'=>$class->name,
            'level'=>$request->levelName,
            'year'=>$class->year
        ]);
       //return response(['id'=>$subject->id, 'name'=>$subject->name]);

     }

     /*
     deletes a class for a course
     */
     public function destroy($id, $courseId){
        Studentclass::destroy($id);

        $classConfigArray=self::listClasses($courseId);
        $classConfigArray=$classConfigArray->toArray();

      return response($classConfigArray['data']);

     }

     /**
      *  -Remove enrollment
        * -Remove student grades related to this class
      */ 
      public function unenroll($id,$classId,$studentSurname){

        $classId=htmlspecialchars($classId,ENT_QUOTES);
        $studentId=htmlspecialchars($id,ENT_QUOTES);
        $studentSurname=htmlspecialchars($studentSurname,ENT_QUOTES);
      
       $class=Studentclass::find($classId);
      $class->students()->detach($studentId);
    
        DB::delete('delete from student_subject where class_id=? and student_id=?',[$classId,$studentId]);

       return Redirect::route('class.show',['classId'=>$classId])->with('message', $studentSurname);
          
      }

     /**
      * Show classes with students enrolled in a specific class it
     */
     public function show($classId){
        
         $classId=htmlspecialchars($classId,ENT_QUOTES);

         //Get the students from DB
        $studentConfigArray=DB::table('students')
        ->select('*')
        ->join('student_studentclass', function($join){
            $join->on('student_studentclass.student_id','=','students.id');
        })
        ->where('student_studentclass.studentclass_id','=',$classId)
        ->orderBy('students.surname')
        ->orderBy('students.name')
        ->get();
        
       
        $studentConfigArray=$studentConfigArray->toArray();

        //Get information about the class from DB
        $classConfigArray=DB::table('studentclasses')
        ->where('id','=',$classId)
        ->get()
        ->toArray();

    // Get the course name, level and course_d from the DB
       
        $courseConfigArray=DB::table('studentclasses')
        ->select('courses.name', 'studentclasses.course_id', 'studentclasses.level_id')
        ->join('courses', function($join){
            $join->on('studentclasses.course_id','=','courses.id');
        })
        ->whereRaw('courses.id=(SELECT course_id FROM studentclasses WHERE id=?) AND
            level_id=(SELECT level_id FROM studentclasses WHERE id=?)', [$classId,$classId])
        ->orderBy('courses.name')
        ->distinct()
        ->get();
        
        //dd($studentConfigArray);
        return Inertia::render('class/show',[
            'studentConfigArray'=>$studentConfigArray,
            'classConfigArray'=>$classConfigArray[0],
            'courseConfigArray'=>$courseConfigArray[0]
        ]);
     }

     /**
 * Export the current class list to excel
  */
  public function export($classId){
    return Excel::download(new ClassListExport($classId), 'classlist.xlsx');
  }




    /***
     *Show students page, excludes all students already enrolled in the class from the list 
     */

     public function student($id,$className){
       
        $className=htmlspecialchars($className,ENT_QUOTES);
        $classId=htmlspecialchars($id,ENT_QUOTES);
        
      /*
        $studentConfigArray=DB::table('students')
        ->orderBy('year', 'desc')
        ->orderBy('surname', 'asc')                        
        ->paginate(15);
        ***/
       
        $studentConfigArray=DB::table('students')
            ->whereRaw('id NOT IN (SELECT student_id FROM student_studentclass WHERE studentclass_id=?)',[$classId])
            ->orderBy('year', 'desc')
            ->orderBy('surname', 'asc')                        
            ->paginate(15);

            //dd($studentConfigArray);
     $studentConfigArray=$studentConfigArray->toArray();
        

         return Inertia::render('class/student',[
            'className'=>$className,
            'classId'=>$classId,
            'studentConfigArray'=>$studentConfigArray['data'],
            'currentPage'=>$studentConfigArray['current_page'],
            'lastPage'=>$studentConfigArray['last_page'],
            'route'=>'',// no need, but must appear as empty, because of the front error implementation 
            'isSearchable'=>false,
            'queryString'=>''  
         ]);
     }
     /**
      * search for the student to be enrolled
      */
      
      public function studentSearch(Request $request, $classId, $className){
       $className=htmlspecialchars($className,ENT_QUOTES);
       $classId=htmlspecialchars($classId,ENT_QUOTES);

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
        $year=htmlspecialchars($_GET["year"],ENT_QUOTES);
    }

    if($surname==null){
        $surname=htmlspecialchars($_GET["surname"],ENT_QUOTES);
    }
    
   
    if($surname==null){
        $studentConfigArray=DB::table('students')
                        ->select('*')
                        ->whereRaw('year=? AND id NOT IN (SELECT student_id FROM student_studentclass WHERE studentclass_id=?)', [$year,$classId])
                        ->paginate(15);
    }
    else{
        $studentConfigArray=DB::table('students')
            ->select('*')
            ->whereRaw('MATCH(surname, name)AGAINST (? WITH QUERY EXPANSION) AND year=?
                AND id NOT IN (SELECT student_id FROM student_studentclass WHERE studentclass_id=?)', [$surname, $year,$classId])
            ->paginate(15);
    }
    
    
   $studentConfigArray->appends(['year'=>$request->year, 'surname'=>$request->surname]);
    

    $studentConfigArray=$studentConfigArray->toArray();
   // dd($studentConfigArray);
    //dd(htmlspecialchars($_GET["surname"]));
    return Inertia::render('class/student',[
        'classId'=>$classId,
        'className'=>$className,
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


public function classSearch($searchItem, $courseId,$courseName){



        

    $classConfigArray=DB::table('studentclasses')
            ->select('studentclasses.id as id', 'studentclasses.name as name','studentclasses.year as year','levels.name as level')
            ->join('levels','levels.id','=','studentclasses.level_id')
            ->whereRaw('studentclasses.id in (SELECT id FROM studentclasses WHERE LOCATE (?,name)>0)',[$searchItem])
            ->orderByDesc('studentclasses.year')
            ->paginate(15)
            ->toArray();

            return Inertia::render('class/index',[
                'courseName'=>$courseName,
                'courseId'=>$courseId,
                'classConfigArray'=>$classConfigArray['data'],
                'currentPage'=>$classConfigArray['current_page'],
                'lastPage'=>$classConfigArray['last_page'],
                'route'=>'',// no need, but must appear as empty, because of the front error implementation 
                'isSearchable'=>false,
                'queryString'=>''
    
            ]);

}



    /**
     * Enroll student to a classroom
     * */ 

     public function enroll(Request $request){ 
        
        $class=Studentclass::find($request->classId);
        $class->students()->attach($request->id);

        $student=DB::table('students')
        ->where('id','=',$request->id)
        ->get()
        ->toArray()[0];

        $student=(array)$student;//Typecast Object A.K.A stdClass to array to avoid errors 
        

        $className=DB::table('studentclasses')
        ->where('id','=',$request->classId)
        ->get()
        ->toArray()[0];

        $className= (array)$className;// //Typecast Object A.K.A stdClass to array to avoid errors
        
        return Redirect::route('class.student',['id'=>$request->classId, 'className'=>$className['name']])->with('message', $student['surname']);
     }
    /**
     * list classes for a certain course
     * 
    */

    public function listClasses($courseId){
        $classConfigArray=DB::table('studentclasses')
        ->select('studentclasses.id as id', 'studentclasses.name as name','studentclasses.year as year','levels.name as level')
        ->join('levels', function($join){
            $join->on('studentclasses.level_id','=','levels.id');
        })
        ->where('studentclasses.course_id','=',$courseId)
        ->orderByDesc('studentclasses.year')
        ->paginate(15);
        
        return $classConfigArray;
    }

     /*
    List of subjects for the current course
    */
    public function listSubject($courseId,$levelId){
        // inner join sql
        $subjectArray=DB::table('subjects')
        ->select('subjects.id as id','subjects.name as subject', 'subjects.course_id','levels.name as level')
        ->join('levels', function($join){
            $join->on('subjects.level_id','=','levels.id');
        })
        ->where('subjects.course_id','=',$courseId)
        ->whereRaw('levels.name= (SELECT levels.name FROM levels WHERE levels.id=?)',[$levelId])
        ->orderBy('levels.order')
        ->get();

        return $subjectArray;
  }

}
