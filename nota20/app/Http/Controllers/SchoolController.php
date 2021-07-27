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

        $editUser=false;
        if(count(School::all()->toArray())<1){
            $configArray=[
                'name'=>'',
                'abbreviation'=>''
            ];
            
            return Inertia::render('school/index',['configArray'=>$configArray, 'editUser'=>$editUser]);
        }
        
        $editUser=true;

        $configArray=School::all()->toArray()[0];

        return Inertia::render('school/index',['configArray'=>$configArray, 'editUser'=>$editUser]);
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
}
