<?php

namespace App\Http\Controllers\Brokerage;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Users\Brokerage;

class BrokerageController extends Controller
{
    public function __construct() {

    }

    public function getAll(){
        $items = Brokerage::all();
        return response()->json($items);
    }

    public function searchBrokerages(Request $request){
        $searchParam = $request->query('name');
        $brokerages = Brokerage::where('display_name', 'like', "%{$searchParam}%")->get();
        return response()->json($brokerages);
    }
}

