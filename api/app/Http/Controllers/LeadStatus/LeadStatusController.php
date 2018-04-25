<?php

namespace App\Http\Controllers\LeadStatus;

use App\Http\Controllers\Controller;
use App\Models\Users\LeadStatus;

class LeadStatusController extends Controller
{
    public function __construct()
    {

    }

    public function getAll()
    {
        $items = LeadStatus::all();
        return response()->json($items);
    }
}

