<?php

namespace App\Http\Controllers\AreaOfSpeciality;

use App\Http\Controllers\Controller;
use App\Models\Users\AreaOfSpeciality;

class AreaOfSpecialityController extends Controller
{
    public function __construct()
    {

    }

    public function getAll()
    {
        $items = AreaOfSpeciality::all();
        return response()->json($items);
    }
}
