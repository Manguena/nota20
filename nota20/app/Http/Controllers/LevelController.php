<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Level;
use Illuminate\Validation\Rule;
use Illuminate\Support\Facades\Validator;


class LevelController extends Controller
{
    
    public function index(){
        $levelConfigArray=self::listLevel();
       
        return response($levelConfigArray);
    }

    public function store(Request $request){
        $validator = Validator::make($request->all(), [
            'levelName' => [
                'required',
                'string',
                'min:1',
                'unique:App\Models\Level,name'
            ] 
        ]);

        if ($validator->fails()){
            return response($validator->errors());
        }

        $level= new Level();
        $level->name=$request->levelName;// make a change here
        $level->save();

        return response(['id'=>$level->id, 'name'=>$level->name]);
      
    }
    public function update(Request $request,$id){
        $validator = Validator::make($request->all(), [
            'levelName' => [
                'required',
                'string',
                'min:1',
                Rule::unique('levels','name')->ignore($id)
            ]
        ]);

         if ($validator->fails()){
            return response($validator->errors());
        }

        $level=Level::find($id);
        $level->name=$request->levelName;
        $level->save();

        return response(['id'=>$id, 'name'=>$level->name]);
    }

    public function destroy($id){
        Level::destroy($id);

        $levelConfigArray=self::listLevel();

      return response($levelConfigArray);

    }

    public function listLevel(){
        $levelConfigArray=array();
        $levelArray=Level::all()->toArray();
        for ($i=0; $i<count($levelArray); $i++){
            $levelConfigArray[$i]=[
                'id'=>$levelArray[$i]['id'],
                'name'=>$levelArray[$i]['name']
            ];
        }
 
        return $levelConfigArray;
    }

}

