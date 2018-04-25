<?php

namespace App\Http\Controllers\Source;

use App\Http\Controllers\Controller;
use App\Models\Users\Source;

class SourceController extends Controller
{
    public function __construct()
    {

    }

    public function getAll()
    {
        $items = Source::all();
        return response()->json($items);
    }
}

