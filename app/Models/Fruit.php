<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Fruit extends Model
{
    use HasFactory;

    protected $fillable = [
        'name',
        'size',
        'color',
    ];

    public function getSizeNameAttribute(){
        switch ($this->size){
            case 0:
                return 'pequeño';
                break;
            case 1:
                return 'mediano';
                break;
            case 2:
                return 'grande';
                break;
            default:
                return 'error';
                break;
        }
    }

}
