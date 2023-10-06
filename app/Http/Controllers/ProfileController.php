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
       //dd($request);
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
            'password' =>'exclude_if:password,null|required|password',
            'new_password' => 'exclude_if:password,null|required|min:8|string|regex:/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).+$/',
        ]);

        if($validator->fails()){
            $errors=$validator->errors();
            return response()->json($errors);
        }


        //save the changes to database
        $userUpdateArray=$request->toArray();
    
        $user=User::find($id);
        $user->name=$userUpdateArray['name'];
        $user->surname=$userUpdateArray['surname'];
        $user->email=$userUpdateArray['email'];
        $user->user_id=$userUpdateArray['user_id'];
        if($userUpdateArray['password']!=null || trim($userUpdateArray['password'])!=""){
           $user->password= Hash::make($userUpdateArray['new_password']);
        }
        $user->save();

        return response()->json([
            'message' => 'Actualização realizada com sucesso'
        ]);
       // return Redirect::route('profile.edit', ['id' => $id])->with('message', $user->apelido);

    }


}
