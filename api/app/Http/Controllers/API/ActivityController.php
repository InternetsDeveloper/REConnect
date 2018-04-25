<?php

namespace App\Http\Controllers\API;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;

class ActivityController extends Controller
{
    /**
     * Create a new controller instance.
     *
     * @return void
     */
    public function __construct()
    {
        $this->middleware('auth:api');
        $this->middleware('subscribed');
    }

    /**
     * Get all of the tasks.
     *
     * @return Response
     */
    public function all(Request $request)
    {
        return $request->user()->activity()->with('user')->take(20)->get();
    }
}
