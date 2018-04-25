<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class TaskController extends Controller
{
    /**
     * Create a new controller instance.
     *
     * @return void
     */
    public function __construct()
    {
        $this->middleware('auth');
        $this->middleware('subscribed');
    }

    /**
     * Display the task list screen.
     *
     * @return Response
     */
    public function index()
    {
        return view('home');
    }
}
