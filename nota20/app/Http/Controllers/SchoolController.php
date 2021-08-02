<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Redirect;
use Inertia\Inertia;
use App\Models\School;
use App\Models\Config;

class SchoolController extends Controller
{
    
    public function create(){

       $createSchool=true;
        if(count(School::all()->toArray())<1){
            $schoolConfigArray=[
                'name'=>'',
                'abbreviation'=>''
            ];
            
            return Inertia::render('school/index',['schoolConfigArray'=>$schoolConfigArray, 'createSchool'=>$createSchool]);
        }
        
        $createSchool=false;

        $schoolConfigArray=School::all()->toArray()[0];

        return Inertia::render('school/index',['schoolConfigArray'=>$schoolConfigArray, 'createSchool'=>$createSchool]);
    }

    public function store(Request $request){
        $request->validate([
            'name'=>'required|string|min:5',
            'abbreviation' => 'required|string|min:1',
            'id' => 'integer',
        ]);

        $school= new School();
        $school->name=$request->name;
        $school->abbreviation=$request->abbreviation;
        $school->save();

       return Redirect::route('school.create')->with('message', $request->abbreviation);

    }

    public function update(Request $request,$id){
        if($id==='undefined'){
           $id= School::all()->toArray()[0]['id'];
        }

        $request->validate([
            'name'=>'required|string|min:5',
            'abbreviation' => 'required|string|min:1',
        ]);

        
        
        $school=School::find($id);
        $school->name=$request->name;
        $school->abbreviation=$request->abbreviation;
        $school->save();

        return Redirect:: route('school.create')->with('message', $request->abbreviation);

    }
}
