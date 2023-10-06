<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\Redirect;
use App\Models\Student;
use Illuminate\Support\Facades\DB;
use Illuminate\Validation\Rule;


class StudentController extends Controller
{

    //
    public function index(){

        $studentConfigArray=DB::table('students')
                                    ->orderBy('year', 'desc')
                                    ->orderBy('surname', 'asc')                        
                                    ->paginate(30);
                                    
        $studentConfigArray=$studentConfigArray->toArray();
    
        return Inertia::render('student/index',[
            'studentConfigArray'=>$studentConfigArray['data'],
            'currentPage'=>$studentConfigArray['current_page'],
            'lastPage'=>$studentConfigArray['last_page'],
            'route'=>'',// no need, but must appear as empty, because of the front error implementation 
            'isSearchable'=>false,
            'queryString'=>''
        ]
    
    );
    }


    public function create(){
        return Inertia::render('student/create');
    }

    public function store(Request $request){
        $request->validate( [
            'surname' => [
                'required',
                'string',
                'min:1',
            ],
            'name' => [
                'required',
                'string',
                'min:1',
            ],
            'id_number' => [
                'required',
                'string',
                'min:3',
                'unique:App\Models\Student'
            ],
            'year' => [
                'required',
                'regex:/^(19|20)\d{2}$/',
                'integer',
                'min:4',
            ]
        ]);

        $student =new Student();
        $student->name=$request->name;
        $student->surname=$request->surname;
        $student->id_number=$request->id_number;
        $student->year=$request->year;
        $student->save();

        return Redirect::route('student.create')->with('message', $student->surname);

    }

    /**
     * Edit the current student
    */
    public function edit($id){
        $student=Student::where('id', $id)
        ->get()->toArray();
        
        return Inertia::render('student/edit',[
            'student'=>$student
        ]);

    }

    /***
     * update the chosen student 
     */
    public function update(Request $request, $id){

        $validator=Validator::make($request->all(),[
            'surname' => [
                'required',
                'string',
                'min:1',
            ],
            'name' => [
                'required',
                'string',
                'min:1',
            ],
            'id_number' => [
                'required',
                Rule::unique('students')->ignore($id),
                'string',
                'min:3'
            ],
            'year' => [
                'required',
                'regex:/^(19|20)\d{2}$/',
                'integer',
                'min:4',
            ]
        ]);
 
        if($validator->fails()){
            $errors=$validator->errors();
            return response()->json($errors);
        }
        
        
        $studentUpdateArray=$request->toArray();
        $student=Student::find($id);
        $student->name=$studentUpdateArray['name'];
        $student->surname=$studentUpdateArray['surname'];
        $student->id_number=$studentUpdateArray['id_number'];
        $student->year=$studentUpdateArray['year'];
        $student->save();

        
        return response()->json([
            'message' =>$student->surname
        ]);
        
      //  return Redirect::route('student.edit', ['id' => $id])->with('message', $student->surname);


;    }

public function search(Request $request){

   // dd($request->fullUrl()); //-> this gives the full url  
  
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
                        ->paginate(30);
    }
    else{
        
        //SELECT `name`, LOCATE("zi", `name`) FROM `students` WHERE LOCATE("zi", `name`)>0 AND `year`=2021

        /*
        $studentConfigArray=DB::table('students')
            ->select('*')
            ->whereRaw('MATCH(surname, name)AGAINST (? IN NATURAL LANGUAGE MODE WITH QUERY EXPANSION) AND year=?', [$surname, $year])
            ->paginate(30);**/
        $studentConfigArray=DB::table('students')
            ->select('*')
            ->whereRaw('LOCATE(?, surname)>0 AND year=?',[ $surname, $year])
            ->paginate(30);
            
            //if searching the surname does not return a result, search the name and return the result
            if($studentConfigArray->toArray()['data']===[]){
                $studentConfigArray=DB::table('students')
                    ->select('*')
                    ->whereRaw('LOCATE(?, name)>0 AND year=?',[ $surname, $year])
                    ->paginate(30);
            }
    }
    
    
   $studentConfigArray->appends(['year'=>$request->year, 'surname'=>$request->surname]);
    

    $studentConfigArray=$studentConfigArray->toArray();
   // dd($studentConfigArray);
    //dd(htmlspecialchars($_GET["surname"]));
    return Inertia::render('student/index',[
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


public function destroy($id){
    $removedStudent=Student::find($id)->surname;

    try{
       Student::destroy($id); 
    }
    catch(\Exception $e){
        return Redirect::route('student')->with('message', "Nao pode excluir estudante $removedStudent");
    }
    
    
    //DB::table('students')->where('id','=',$id)->delete();

    return Redirect::route('student')->with('message', $removedStudent);
}

}
