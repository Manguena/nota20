<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Course;
use App\Models\School;
use Illuminate\Validation\Rule;
use  Illuminate\Support\MessageBag;
use Illuminate\Support\Facades\Validator;

class CourseController extends Controller
{
    /*
    
        list stored courses
    */

    public function index(){
        $courseConfigArray=self::listCourse();
       
        return response($courseConfigArray);
    }

    // store the new course into the database
    public function store(Request $request){
        //dd($request);
        $validator = Validator::make($request->all(), [
            'courseName' => [
                'required',
                'string',
                'min:3',
                'unique:App\Models\Course,name'
            ],
           'schoolId'=>[
               'required',
               'exists:App\Models\School,id'
           ] 
        ]);

        if ($validator->fails()){
            return response($validator->errors());
        }

        $course= new Course();
        $course->name=$request->courseName;
        $school=School::find(School::all()->toArray()[0]['id']);
        $school->courses()->save($course);

        return response(['id'=>$course->id, 'name'=>$course->name]);
      
    }

    public function update(Request $request,$id){
        $validator = Validator::make($request->all(), [
            'courseName' => [
                'required',
                'string',
                'min:3',
                Rule::unique('courses','name')->ignore($id)
            ]
        ]);

         if ($validator->fails()){
            return response($validator->errors());
        }

        $course=Course::find($id);
        $course->name=$request->courseName;
        $course->save();

        return response(['id'=>$id, 'name'=>$course->name]);
    }

    public function destroy($id){
        Course::destroy($id);

        $courseConfigArray=self::listCourse();

      return response($courseConfigArray);

    }

    /**
     * This method lists courses and returns
     * 
     * */ 
    public function listCourse(){
        $courseConfigArray=array();
        $courseArray=Course::all()->toArray();
        for ($i=0; $i<count($courseArray); $i++){
            $courseConfigArray[$i]=[
                'id'=>$courseArray[$i]['id'],
                'name'=>$courseArray[$i]['name']
            ];
        }
 
        return $courseConfigArray;
    }
}
