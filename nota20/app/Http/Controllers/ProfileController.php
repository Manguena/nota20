<?php

namespace App\Http\Controllers;

use App\Models\User;
use Inertia\Inertia;
use Illuminate\Validation\Rule;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Redirect;

use Illuminate\Http\Request;

class ProfileController extends Controller
{
    public function edit($id){
        // Run a gate to check if the current user is logged or not
        $user=User::where('id', $id)
        ->get()->toArray();

        $userRole=User::find($id)->roles()->get()[0]['name'];

        return Inertia::render('profile/edit', [
            "user"=>$user,
            "userRole"=>$userRole
        ]);
        
    }

    public function update(Request $request, $id){
       //sanitize the request and id
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
            'password' =>'exclude_if:passwordctr,false|required|password',
            'new_password' => 'exclude_if:passwordctr,false|required|min:8|string|regex:/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).+$/',
        ]);

        //save the changes to database
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

        return Redirect::route('profile.edit', ['id' => $id])->with('message', $user->apelido);

    }


}
