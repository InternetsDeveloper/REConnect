<?php

namespace App\Http\Controllers\Module;

use App\Http\Controllers\Controller;
use App\Models\System\Module;

class ModuleController extends Controller {

    /**
     * Create a new controller instance.
     *
     * @return void
     */
    public function __construct() {

    }

    public function getModules() {

        $modules = Module::with('permissions')->get();

        return response()->json($modules);
    }
}
