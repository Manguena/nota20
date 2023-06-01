<?php

namespace App\Models;

use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use App\Models\Role;
use Illuminate\Support\Facades\Auth;
use Laravel\Scout\Searchable; 
class User extends Authenticatable
{
    use HasFactory, Notifiable;
    use Searchable;

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'name',
        'email',
        'password',
        'user_id',
        'surname'
    ];

    /**
     * The attributes that should be hidden for arrays.
     *
     * @var array
     */
    protected $hidden = [
        'password',
        'remember_token',
    ];

    /**
     * The attributes that should be cast to native types.
     *
     * @var array
     */
    protected $casts = [
        'email_verified_at' => 'datetime',
    ];

    public function roles(){
        return $this->belongsToMany(Role::class);
    }

    public function isAdministrator(){
       $user =Auth::user();
      return User::find($user->id)->roles()->get()[0]['name']=='superadmin'||User::find($user->id)->roles()->get()[0]['name']=='admin';
    }

    public function currentUserRole(){
        $user =Auth::user();

        return User::find($user->id)->roles()->get()[0]['name']; 
    }

    public function currentUserId(){
        $user =Auth::user();
        return $user->id;
    }

    public function toSearchableArray()
    {
        $array = $this->toArray();

        // Customize the data array...
        return $array;
    }
}
