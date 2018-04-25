<?php

namespace App\Http\Controllers\Roles;

use App\Http\Controllers\Controller;
use App\Models\Users\Roles\Role;

class RolesController extends Controller
{
    /**
     * Create a new controller instance.
     */
    public function __construct()
    {

    }

    public function getRoles()
    {
        return response()->json(Role::all(['id', 'display_name']));
    }
}
