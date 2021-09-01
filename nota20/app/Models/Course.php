<?php

namespace App\Models;
use App\Models\School;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Laravel\Scout\Searchable;

class Course extends Model
{
    use HasFactory;
    use Searchable;

    protected $guarded=['name'];

    public function subjects(){
        return $this->hasMany(Subject::class);
    }

}
