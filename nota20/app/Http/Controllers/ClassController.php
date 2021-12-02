<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Models\Course;
use App\Models\StudentClass;
use Illuminate\Support\Facades\Validator;
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
        

        $courseArray=Course::paginate(2)->toArray();

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

        $class= new StudentClass();
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

        $class=StudentClass::find($request->id);
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
     deletes a class for a cours
     */
     public function destroy($id, $courseId){
        StudentClass::destroy($id);

        $classConfigArray=self::listClasses($courseId);
        $classConfigArray=$classConfigArray->toArray();

      return response($classConfigArray['data']);

     }

     /**
      * Show classes with students enrolled in it
     */
     public function show($id){
        //dd($id);
        $classConfigArray=DB::table('class')
                ->where('id',$id)
                ->get();

        $classConfigArray=$classConfigArray[0];

        return Inertia::render('class/show',[
            'classConfigArray'=>$classConfigArray
        ]);
     }

    /***
     *Show students page 
     */

     public function student(){

        $studentConfigArray=DB::table('students')
        ->orderBy('year', 'desc')
        ->orderBy('surname', 'asc')                        
        ->paginate(15);
        
    $studentConfigArray=$studentConfigArray->toArray();
        

         return Inertia::render('class/student',[
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
      
      public function studentSearch(Request $request){
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
    return Inertia::render('class/student',[
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
     * list classes for a certain course
     * 
    */

    public function listClasses($courseId){
        $classConfigArray=DB::table('class')
        ->select('class.id as id', 'class.name as name','class.year as year','levels.name as level')
        ->join('levels', function($join){
            $join->on('class.level_id','=','levels.id');
        })
        ->where('class.course_id','=',$courseId)
        ->orderByDesc('class.year')
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
