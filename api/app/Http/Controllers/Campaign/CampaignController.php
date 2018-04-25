<?php

namespace App\Http\Controllers\Campaign;

use App\Http\Controllers\Controller;
use App\Models\Marketing\Campaign;

class CampaignController extends Controller
{
    public function __construct() {

    }

    public function getAll(){
        $items = Campaign::all();
        return response()->json($items);
    }
}

