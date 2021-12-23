<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Models\Course;
use App\Models\Student;
use App\Models\Studentclass;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\Redirect;
use Illuminate\Support\Facades\DB;

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
    public function subject($courseName, $courseId){
        $subjectArray=self::listSubject($courseId);

        return Inertia::render('class/subject',[
            'courseName'=>$courseName,
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
        /*
        $classConfigArray=DB::table('class')
        ->select('class.id as id', 'class.name as name','class.year as year','levels.name as level')
        ->join('levels', function($join){
            $join->on('class.level_id','=','levels.id');
        })
        ->where('class.course_id','=',$courseId)
        ->orderByDesc('class.year')
        ->get();
        **/;
        
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

    public function store(Request $request){

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
      *  Remove enrollment
      */ 
      public function unenroll($id,$classId,$studentSurname){

        $classId=htmlspecialchars($classId,ENT_QUOTES);
        $studentId=htmlspecialchars($id,ENT_QUOTES);
        $studentSurname=htmlspecialchars($studentSurname,ENT_QUOTES);
      
       $class=Studentclass::find($classId);
       $class->students()->detach($studentId);

       return Redirect::route('class.show',['id'=>$classId])->with('message', $studentSurname);
          
      }

     /**
      * Show classes with students enrolled in a specific class it
     */
     public function show($id){
         $classId=htmlspecialchars($id,ENT_QUOTES);

         //Get the students from DB
        $studentConfigArray=DB::table('students')
        ->select('*')
        ->join('student_studentclass', function($join){
            $join->on('student_studentclass.student_id','=','students.id');
        })
        ->where('student_studentclass.studentclass_id','=',$id)
        ->orderBy('students.surname')
        ->orderBy('students.name')
        ->get();
        
        $studentConfigArray=$studentConfigArray->toArray();

        //Get information about the class from DB
        $classConfigArray=DB::table('studentclasses')
        ->where('id','=',$classId)
        ->get()
        ->toArray();

       //dd($classConfigArray);
// Get the course name, level and course_d from the DB
/*
       $courseConfigArray=DB::table('subjects')
       ->select('courses.name', 'subjects.course_id', 'subjects.level_id')
       ->join('courses', function($join){
           $join->on('subjects.course_id','=','courses.id');
       })
       ->whereRaw('courses.id=(SELECT course_id FROM studentclasses WHERE id=?)', [$classId])
       ->orderBy('courses.name')
       ->get();
***/
       
        $courseConfigArray=DB::table('subjects')
        ->select('courses.name', 'subjects.course_id', 'subjects.level_id')
        ->join('courses', function($join){
            $join->on('subjects.course_id','=','courses.id');
        })
        ->whereRaw('courses.id=(SELECT course_id FROM studentclasses WHERE id=?) AND
            level_id=(SELECT level_id FROM studentclasses WHERE id=?)', [$classId,$classId])
        ->orderBy('courses.name')
        ->get();

        return Inertia::render('class/show',[
            'studentConfigArray'=>$studentConfigArray,
            'classConfigArray'=>$classConfigArray[0],
            'courseConfigArray'=>$courseConfigArray[0]
        ]);
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

        $className=DB::table('studentclasses')
        ->where('id','=',$request->classId)
        ->get()
        ->toArray()[0];
        dd($className['name']);
       return Redirect::route('class.student',['id'=>$request->classId, 'className'=>$className])->with('message', $sudent['surname']);
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
    public function listSubject($courseId){
        // inner join sql
        $subjectArray=DB::table('subjects')
        ->select('subjects.id as id','subjects.name as subject', 'subjects.course_id','levels.name as level')
        ->join('levels', function($join){
            $join->on('subjects.level_id','=','levels.id');
        })
        ->where('subjects.course_id','=',$courseId)
        ->orderBy('levels.order')
        ->get();

        return $subjectArray;
  }
}
