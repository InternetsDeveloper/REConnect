<?php

namespace App\Http\Controllers\RoleGroup;

use App\Http\Controllers\Controller;
use App\Models\Users\Roles\RoleGroup;

class RoleGroupController extends Controller
{
    public function __construct()
    {

    }

    public function getAll()
    {
        $items = RoleGroup::all();
        return response()->json($items);
    }
}

