<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Laravel\Scout\Searchable;
use App\Models\Subject;

class Level extends Model
{
    
    use HasFactory;
    use Searchable;

   public function subjects(){
       return $this->hasMany(Subject::class);
   }
}
