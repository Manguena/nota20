<?php

namespace App\Models;
use App\Models\Course;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Laravel\Scout\Searchable;

class School extends Model
{
    use HasFactory;
    use Searchable;

    public function courses(){
        return $this->hasMany(Course::class);
    }
}
