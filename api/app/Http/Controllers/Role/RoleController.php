<?php

namespace App\Http\Controllers\Role;

use App\Http\Controllers\Controller;
use App\Contracts\Role;

class RoleController extends Controller
{
    public function __construct()
    {

    }

    public function getAll()
    {
        $items = Role::all();
        return response()->json($items);
    }
}

