<?php

namespace App\Http\Controllers\Market;

use App\Http\Controllers\Controller;

use App\Models\Market;
use App\Models\Users\User;

class MarketController extends Controller
{
    public function __construct() {

    }

    public function getAll()
    {
        $items = Market::all();
        return response()->json($items);
    }

    public function getUserMarkets($id)
    {
        $user = User::where('id', $id)->first();
        $markets = $user->markets()->get();
        return response()->json($markets);
    }
}

