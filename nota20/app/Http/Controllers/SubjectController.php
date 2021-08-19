<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Facades\Validator;
use App\Models\Level;
class SubjectController extends Controller
{
    //
/**
 * provides the page to create subjects
 * */ 
    public function index(Request $request){
        return Inertia::render('subject/index');
    }

/*searches the levels
*/
    public function search(Request $request){
       
        
        $validator = Validator::make($request->all(), [
            'searchLevelData' => [
                'required',
                'string',
                'min:1',
            ]
        ]);

        if ($validator->fails()){
            return response($validator->errors());
        }        



    
       $searchItem=$request->toArray()['searchLevelData'];
      
       $levelArray = Level::search($searchItem)->paginate(15);
        
       $levelConfigArray=$levelArray->toArray()['data'];
       
       return response($levelConfigArray);
    }
}
