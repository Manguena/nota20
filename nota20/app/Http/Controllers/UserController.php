<?php

namespace App\Http\Controllers;
use App\Models\Config;
use App\Models\Role;
use App\Models\User;
use Inertia\Inertia;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Http\RedirectResponse;
use Illuminate\Support\Facades\Redirect;
use Illuminate\Routing\Redirector;//nao sei se funciona
use Illuminate\Support\Facades\Validator;
use Illuminate\Validation\Rule;
use Illuminate\Support\Facades\Auth;// retirar depois de realizar testes
use Illuminate\Support\Facades\Gate;
use Illuminate\Auth\Access\AuthorizationException;
use Illuminate\Support\Facades\DB;

   
class UserController extends Controller
{   

    public function index(Request $request) {
       
        //Check if the array has a search query
        // This check is only necessary with meilisearh, and will be removed with laravel scout
        
        $emptyDbSearch=DB::table('users')
                                    ->orderBy('surname', 'asc')                        
                                    ->paginate(15)
                                    ->toArray();

       

        if(array_key_exists('searchbar', $request->toArray())){// check if searchbar has an index
            if($request->toArray()['searchbar']!=null){// if a words is entered set maximum 20 results
                        $query=User::search($request->searchbar)->paginate(30)->toArray();
                    }else{// if a null search is executed by user, paginate with 15 items per page
                        
                       // $query=User::search($request->searchbar)->paginate(15)->toArray();
                        $query=$emptyDbSearch;
                    }
        }else{
           $query=$emptyDbSearch;
           // $query=User::search($request->searchbar)->paginate(15)->toArray();
        } 
        
        // Create pagination content
        $userArray=array();// array containig pagination data
        $userArrayCounter=0;//array index
      
        //fiil the pagination content array

    // dd($query);
        
       foreach ($query['data'] as $user) {
        
        is_array($user)? :$user=(array)$user;// if it is an object change it to an array

           $userArray[$userArrayCounter]=
           array(
                "id"=>$user['id'],
                "surname"=>$user['surname'],
                "email"=>$user['email'],
                "nome"=>$user['name'],
                "editUri"=>"user/".$user['id']."/edit",
                "role"=>User::find($user['id'])->roles()->get()[0]['name']
                 );
           $userArrayCounter++;
        }
        
         
        // determines if a user entered a search content or a null search which returns all the User Model
        $url=url()->full();
        
        $urlArray=explode('=',$url,2);// devides the array in 2 parts
        $isSearchable=false;
        $queryString=null;
       
        if (count($urlArray)==1){ }
        elseif (count($urlArray)==2){
            if(strlen(trim(trim($urlArray[1], "%20")))>0 && strrpos($query['first_page_url'], "query")!=false){// urls convert emptey space to %20 code
                $queryString=$urlArray[1];//get the text the user searched
                $isSearchable=true;
            }

        }        
      
        //Return pagination data to the front end (ath, last_page, and the 'current_page')

        return Inertia::render('user/index',[
           'useraArray'=>$userArray,
           'currentPage'=>$query['current_page'],
           'lastPage'=>$query['last_page'],
           'route'=>'',// no need, but must appear as empty, because of the front error implementation
           'isSearchable'=>$isSearchable,
           'queryString'=>$queryString // query string
        ]);

    }

    public function create(){

        Gate::authorize('create-user');
        
        $user= new User();

        $roleList=array();

        $userCreationMsg='';

        //Determinar ki tipo de usuarios podem ser criados pelo superadmin e o admin
        if ($user->currentUserRole()=='superadmin'){
            //1-check the number of admns and super admin and standard before creating the list
            if(self::numberOfUsersInConfig()['superadmin']> self::numberOfUsersInARole('superadmin')){
                array_push($roleList, 'superadmin');
            }
            if(self::numberOfUsersInConfig()['admin']>self::numberOfUsersInARole('admin')){
                array_push($roleList, 'admin');
            }
            if(self::numberOfUsersInConfig()['standard']>self::numberOfUsersInARole('standard')){
                array_push($roleList, 'standard');
            }
        }

        // Define message of rejection of possibility of creating users
        if(count($roleList)==0){
            $userCreationMsg='Esgotou o número de possiveis de criar';
            abort(403, 'O limite de utilizadores foi atingido');
        }

        return Inertia::render('user/create',['roleList'=>$roleList]);
    }

    public function store(Request $request, User $user){
        // You can only create a user if you are an administrator,
        // otherwise throw error
        Gate::authorize('create-user');
        //dd($request);
        //validation of input
         $request->validate([
            'surname' => 'required|max:255|min:3',
            'name' => 'required|max:255|min:3',
            'email' => 'required | max:50|min:3|unique:App\Models\User|email',
            'user_id' => 'required|min:3|max:255|unique:App\Models\User',
            'password' =>'required|confirmed|min:8|string|regex:/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).+$/',
            'password_confirmation' => 'required | min:8|string|regex:/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).+$/',
            'role'=>[
                'required',
                Rule::in (['standard','admin','superadmin'])
            ]
        ]);

      // creating and store the user in the DATABASE
        $user= new User;
        $user->name=$request->name;
        $user->email=$request->email;
        $user->password=Hash::make($request->password);
        $user->user_id=$request->user_id;
        $user->surname=$request->surname;
        $user->save();

        //Get the roleId of the current user
        $roleId=self::getRoleId($request->input('role'));

        //add role to a user in the pivot table
        $user=User::find($user->id);
        $user->roles()->attach($roleId);

// Redirect to the same page
  return Redirect::route('user.create')->with('message', $request->surname);
  
}

public function edit($id){
    //TODO: sanitize the ID provided by the user, and make sure it is a number
    // verificar quem pode editar e quem nao pode editar
    //dd($userpass=User::find($id));
    
    Gate::authorize('edit-user', $id);
    
    $user=User::where('id', $id)
        ->get()->toArray();

    $userRole=User::find($id)->roles()->get()[0]['name'];
  
    return Inertia::render('user/edit', [
        "user"=>$user,
        "userRole"=>$userRole
    ]);
}

public function update(Request $request, $id){

    $validator=Validator::make($request->all(),[
        'surname' => 'required|max:255|min:3',
        'name' => 'required|max:255|min:3',
        'email' => ['required',
                Rule::unique('users')->ignore($id),
                 'max:50',
                 'min:3',
                 'email'
                ],
        'user_id' => ['required',
                Rule::unique('users')->ignore($id),
                'min:3',
                'max:255'],
        'password' =>'exclude_if:password,null|required|confirmed|min:8|string|regex:/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).+$/',
        'password_confirmation' => 'exclude_if:password,null|required|min:8|string|regex:/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).+$/',
        'role'=>[
            'required',
            Rule::in (['standard','admin','superadmin'])
        ],
    ]);

    if($validator->fails()){
        $errors=$validator->errors();
        return response()->json($errors);
    }

    // Get configuration information from database
      
    
        // Get the defined number of user for each role
       // $numberOfSuperadminUsers=$test['superadmin'];
        //$numberOfAdminUsers=$test['admin'];
        ///$numberOfStandardUsers=$test['standard'];
        
        if ($request->input('role')=='superadmin'){
            if(self::numberOfUsersInARole('superadmin')>=self::numberOfUsersInConfig()['superadmin']){
                return response()->json([
                    'userLimitError' =>'Numero de utilizadores esgotados para este perfil'  
                ]);
            }
        }
            else if($request->input('role')=='admin'){
                 if(self::numberOfUsersInARole('admin')>=self::numberOfUsersInConfig()['admin']){
                return response()->json([
                    'userLimitError' =>'Numero de utilizadores esgotados para este perfil'  
                ]);
            }
            } 
            else if($request->input('role')=='standard'){
                if(self::numberOfUsersInARole('standard')>=self::numberOfUsersInConfig()['standard']){
                    return response()->json([
                        'userLimitError' =>'Numero de utilizadores esgotados para este perfil'  
                    ]);
                    }
            }
        

    $userUpdateArray=$request->toArray();
    
    $user=User::find($id);
    $user->name=$userUpdateArray['name'];
    $user->surname=$userUpdateArray['surname'];
    $user->email=$userUpdateArray['email'];
    $user->user_id=$userUpdateArray['user_id'];
    if($userUpdateArray['password']!=null || trim($userUpdateArray['password'])!=""){
       $user->password= Hash::make($userUpdateArray['password']);
    }
    $user->save();

    //Update of the user role
    $currentRoleId=User::find($id)->roles()->get()->toArray()['0']['id'];
    $newRoleId=self::getRoleId($request->input('role'));
    

  $user->roles()->updateExistingPivot($currentRoleId,[
    'role_id'=>$newRoleId
  ]);

    return response()->json([
        'message' =>  $user->surname
    ]);

  //return Redirect::route('user.edit', ['id' => $id])->with('message', $user->surname);

}

public function destroy($id){
    $removedUser=User::find($id)->surname;    
    User::destroy($id);

    return Redirect::route('user')->with('message', $removedUser);
}

/*
    Get the number of users in a certain role
*/
public function numberOfUsersInARole($userRole){

    $numberOfUsersInARole=DB::table('role_user')
    ->select('user_id')
    ->whereRaw('role_id=(
        SELECT id FROM roles WHERE name=?)', [$userRole])
        ->count();

    return $numberOfUsersInARole;
    
}

/**
 * Gets the configuration about the number of users for each role
 * 
 */

public function numberOfUsersInConfig(){
    $configArray=DB::table('configs')
    ->select('superadmin', 'admin', 'standard')
    ->get()
    ->toArray()[0];

    return $configArray=(array) $configArray;
}

/**
 * return the role id for a certain role
 */
public function getRoleId ($role){
    
    $roleModel=Role::where('name',$role)->first();
    

    $roleId=$roleModel->id;

    return $roleId;
}

}

