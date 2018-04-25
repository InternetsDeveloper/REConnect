<?php

namespace App\Http\Controllers\Language;

use App\Http\Controllers\Controller;
use App\Models\Language;

class LanguageController extends Controller
{
    public function __construct()
    {

    }

    public function getAll(){
        $items = Language::all();
        return response()->json($items);
    }
}

