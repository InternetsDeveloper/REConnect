<?php

namespace App\Http\Controllers\Department;

use App\Http\Controllers\Controller;
use App\Models\Users\Department;

class DepartmentController extends Controller
{
    public function __construct()
    {

    }

    public function getAll()
    {
        $items = Department::all();
        return response()->json($items);
    }
}

