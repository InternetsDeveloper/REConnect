<?php

namespace App\Http\Controllers\ProspectStatus;

use App\Http\Controllers\Controller;
use App\Models\Users\ProspectStatus;

class ProspectStatusController extends Controller
{
    public function __construct() {

    }

    public function getAll(){
        $items = ProspectStatus::all();
        return response()->json($items);
    }
}

