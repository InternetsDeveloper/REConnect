<?php

namespace App\Http\Controllers\CompensationPlan;

use App\Http\Controllers\Controller;
use App\Models\CompensationPlans\CompensationPlan;

class CompensationPlanController extends Controller
{
    public function __construct()
    {

    }

    public function getAll()
    {
        $items = CompensationPlan::all();
        return response()->json($items);
    }
}

