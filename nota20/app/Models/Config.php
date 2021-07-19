<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Config extends Model
{
    use HasFactory;

    protected $attributes = [
        'admin'=>2,
        'superadmin'=>2,
        'standard'=>5
    ];
}
