<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Facades\Validator;
use App\Models\Level;
use App\Models\Subject;
use App\Models\Course;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Gate;


class SubjectController extends Controller
{
    //
/**
 * provides the page to create subjects
 * */ 
    public function index(Request $request, $courseName, $courseId){
        
        if(!Gate::allows('view-subjectPage')){
            abort(403,'Sem permissão');
        }

        $course=Course::find($courseId);

        $subjectArray=self::listSubject($courseId);
        

        return Inertia::render('subject/index', [
            'courseName'=>$courseName,
            "courseId"=>$courseId,
            'subjectConfigArray'=>$subjectArray

        ]);
    }

/*searches the levels for the subject
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
      
       $searchArray = Level::search($searchItem)->paginate(15);
        
       $searchConfigArray=$searchArray->toArray()['data'];
       
       return response($searchConfigArray);
    }

    public function store(Request $request){
      
        $validator = Validator::make($request->all(), [
            'subjectName' => [
                'required', 
                'min:3',
                'string'
            ], 
            'levelName'=>[
                'required',
                'exists:levels,name'
            ]
        ]);

         if ($validator->fails()){
            return response($validator->errors());
            }
        // save data into the database

        // related to level movel
        $subject= new Subject();
        $subject->name=$request->subjectName;
        
        $level=Level::find($request->levelId);

        $level->subjects()->save($subject);

        //related to course model
        $course=new Course();
        $course= Course::find($request->courseId);// remos que adiquirir o id do curso
        
        
        $subject->course()->associate($course);
        $subject->save();

        // ['id'=>$level->id, 'name'=>$level->name, 'order'=>$level->order]
        return response(['id'=>$subject->id, 'subject'=>$subject->name, 'level'=>$request->levelName]);
    }

    /*
     Update the subject name
    */ 
    public function update(Request $request, $id){
       
        $validator = Validator::make($request->all(), [
            'subjectName' => [
                'required', 
                'min:1',
                'string'
            ]
        ]);


         if ($validator->fails()){
            return response($validator->errors());
            }

        $subject=Subject::find($request->id);
        $subject->name=$request->subjectName;
        $subject->save();

        return response(['id'=>$subject->id, 'name'=>$subject->name]);
    }

    /*
    Delete the selected subject
    */

    public function destroy($id, $courseId){
        Subject::destroy($id);

        $subjectConfigArray=self::listSubject($courseId);

      return response($subjectConfigArray);

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
