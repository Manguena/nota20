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
        
        if(array_key_exists('searchbar', $request->toArray())){// check if searchbar has an index
            if($request->toArray()['searchbar']!=null){// if a words is entered set maximum 20 results
                        $query=User::search($request->searchbar)->paginate(30)->toArray();
                    }else{// if a null search is executed by user, paginate with 15 items per page
                        $query=User::search($request->searchbar)->paginate(15)->toArray();
                    }
        }else{
            $query=User::search($request->searchbar)->paginate(15)->toArray();
        } 
        
        // Create pagination content
        $userArray=array();// array containig pagination data
        $userArrayCounter=0;//array index
      
        //fiil the pagination content array

        /**problema com pesquisa de 'jo' comexa aqui mesmo */
    // dd($query);

       foreach ($query['data'] as $user) {
           $userArray[$userArrayCounter]=
           array(
                "id"=>$user['id'],
                "apelido"=>$user['apelido'],
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
           'route'=>'user',
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
            if(Role::where('name','superadmin')->count()< Config::all()->toArray()[0]['superadmin']){
                array_push($roleList, 'superadmin');
            }
            if(Role::where('name','admin')->count()<Config::all()->toArray()[0]['admin']){
                array_push($roleList, 'admin');
            }
            if(Role::where('name','standard')->count()<Config::all()->toArray()[0]['standard']){
                array_push($roleList, 'standard');
            }
        }else if ($user->currentUserRole()=='admin'){
            if(Role::where('name','standard')->count()<Config::all()->toArray()[0]['standard']){
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

        //validation of input
         $request->validate([
            'apelido' => 'required|max:255|min:3',
            'name' => 'required|max:255|min:3',
            'email' => 'required | max:50|min:3|unique:App\Models\User|email',
            'bi' => 'required|min:3|max:255|unique:App\Models\User',
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
        $user->bi=$request->bi;
        $user->apelido=$request->apelido;
        $user->save();

        $userId=$user->id;
        $role=new Role();
        $role->name=$request->role;
        $user=User::find($userId);
        $user->roles()->save($role);
        $user->refresh();

// Redirect to the same page
  return Redirect::route('user.create')->with('message', $request->apelido);
  
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
//sanitize the request and the ID


// sanitise this id??????

    $request->validate([
        'passwordctr'=>'boolean',
        'apelido' => 'required|max:255|min:3',
        'name' => 'required|max:255|min:3',
        'email' => ['required',
                Rule::unique('users')->ignore($id),
                 'max:50',
                 'min:3',
                 'email'
                ],
        'bi' => ['required',
                Rule::unique('users')->ignore($id),
                'min:3',
                'max:255'],
        'password' =>'exclude_if:passwordctr,false|required|confirmed|min:8|string|regex:/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).+$/',
        'password_confirmation' => 'exclude_if:passwordctr,false|required|min:8|string|regex:/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).+$/',
        'role'=>[
            'required',
            Rule::in (['standard','admin'])
        ],
    ]);

    $userUpdateArray=$request->toArray();
    
    $user=User::find($id);
    $user->name=$userUpdateArray['name'];
    $user->apelido=$userUpdateArray['apelido'];
    $user->email=$userUpdateArray['email'];
    $user->bi=$userUpdateArray['bi'];
    if($userUpdateArray['password']!=null || trim($userUpdateArray['password'])!=""){
       $user->password= Hash::make($userUpdateArray['password']);
    }
    $user->save();

    //Actualizacao do User Role
    $roleId=User::find($id)->roles()->get()->toArray()['0']['id'];
    $role=Role::find($roleId);
    $role->name=$userUpdateArray['role'];
    $role->save();
  
  return Redirect::route('user.edit', ['id' => $id])->with('message', $user->apelido);

}

public function destroy($id){
    $removedUser=User::find($id)->apelido;    
    User::destroy($id);

    return Redirect::route('user')->with('message', $removedUser);
}
}

