<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Models\Course;
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
    public function index(){
        
        return Inertia::render('',[
            
        ]);
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
