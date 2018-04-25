<?php

namespace App\Http\Controllers\Company;

use App\Http\Controllers\Controller;
use App\Models\Users\UserCompany;

class CompanyController extends Controller
{
    public function __construct()
    {

    }

    public function getAll()
    {
        $items = UserCompany::all();
        return response()->json($items);
    }
}

