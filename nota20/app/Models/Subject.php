<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Laravel\Scout\Searchable;
use App\Models\level;
use App\Models\Course;

class Subject extends Model
{
    use HasFactory;
    use Searchable;

    /**
     * Get the parent commentable model (Level or Course).
     */

    public function level(){
        return $this->belongsTo(Level::class);
    }

    public function course(){
        return $this->belongsTo(Course::class);
    }

    public function students(){
        return $this->belongsToMany(Student::class)->withPivot('class_id','grade');
    }
}
