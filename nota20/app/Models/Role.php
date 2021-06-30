<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Models\User;
use Laravel\Scout\Searchable; 

class Role extends Model
{
    use HasFactory;
    use Searchable;
    //protected $guarded
   protected $fillable = [
        'name'
   ];

    public function users(){
        return $this->belongsToMany(User::class);
    }
}
