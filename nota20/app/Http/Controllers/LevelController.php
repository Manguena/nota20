<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Level;
use Illuminate\Validation\Rule;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\DB;



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
            ] ,
            'orderNr'=>[
                'required',
                'integer',
                'min:1',
                'max:50',
                'unique:App\Models\Level,order'
            ]
        ]);

        if ($validator->fails()){
            return response($validator->errors());
        }

        $level= new Level();
        $level->name=$request->levelName;// make a change here
        $level->order=$request->orderNr;
        $level->save();

        return response(['id'=>$level->id, 'name'=>$level->name, 'order'=>$level->order]);
      
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
    /*
    Delete the selected level
    */
    public function destroy($id){
        Level::destroy($id);

        $levelConfigArray=self::listLevel();

      return response($levelConfigArray);

    }

    /*
    get all the leves from database and orders by its "order"
    **/
    public function listLevel(){
        $levelConfigArray=array();
        
        $levelArray=DB::table('levels')
                        ->select('id', 'name', 'order')
                        ->orderBy('order')
                        ->get()
                        ->toArray();
        
         return $levelArray;
    }

}

