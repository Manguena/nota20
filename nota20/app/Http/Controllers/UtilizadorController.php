<?php

namespace App\Http\Controllers;

use App\Models\Role;
use App\Models\User;
use Inertia\Inertia;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Http\RedirectResponse;
use Illuminate\Support\Facades\Redirect;
use Illuminate\Routing\Redirector;//nao sei se funciona
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\Auth;// retirar depois de realizar testes
use Illuminate\Support\Facades\Gate;
use Illuminate\Auth\Access\AuthorizationException;
use Illuminate\Support\Facades\DB;

   
class UtilizadorController extends Controller
{

    public function index(Request $request) {
        //Check if the array has a search query
        // This check is only necessary with meilisearh, and will be removed with laravel scout
        if(array_key_exists('searchbar', $request->toArray())){// check if searchbar has an index
            if($request->toArray()['searchbar']!=null){// if a words is entered set maximum 20 results
                        $query=User::search($request->searchbar)->paginate(20)->toArray();
                    }else{// if a null search is executed by user, paginate with 15 items per page
                        $query=User::search($request->searchbar)->paginate(1)->toArray();
                    }
        }else{
            $query=User::search($request->searchbar)->paginate(1)->toArray();
        } 
        
        // Create pagination content
        
        $userArray=array();// array containig pagination data
        $userArrayCounter=0;//array index
        
        //fiil the pagination content array
       foreach ($query['data'] as $user) {
           
           $userArray[$userArrayCounter]=
           array(
                "id"=>$user['id'],
                "apelido"=>$user['apelido'],
                "email"=>$user['email'],
                "nome"=>$user['name'],
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
           'route'=>'utilizador',
           'isSearchable'=>$isSearchable,
           'queryString'=>$queryString // query string
        ]);

    }

    public function create(){

        Gate::authorize('create-user');
        
        return Inertia::render('user/create',[]);
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
            'admin'=>'exclude_if:standard,standard|required|regex:/\badmin\b/',
            'standard'=>'exclude_if:admin,admin|required|regex:/\bstandard\b/'
        ]);

      

      // creating and store the user in the DATABASE
        $user= new User;
        $user->name=$request->name;
        $user->email=$request->email;
        $user->password=Hash::make($request->password);// deve ser encriptado
        $user->bi=$request->bi;
        $user->apelido=$request->apelido;
        $user->save();

        //The Id of the user just created
        $userId=$user->id;
        $role=new Role(['name'=>$request->role]);
        
        $user=User::find($userId);
       

       $user->roles()->save($role);
        $user->refresh();

// Redirect to the same page
  return Redirect::route('utilizador.create')->with('message', $request->apelido);
  
}

public function edit(){
    return Inertia::render('user/edit');
}

}
