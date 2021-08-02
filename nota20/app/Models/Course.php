<?php

namespace App\Models;
use App\Models\School;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Course extends Model
{
    use HasFactory;

    protected $guarded=['name'];

    public function school(){
        return $this->belongsTo(School::class);
    }

}
