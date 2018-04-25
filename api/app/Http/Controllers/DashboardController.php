<?php

namespace App\Http\Controllers;

use Illuminate\Http\Response;

class DashboardController extends Controller
{
    /**
     * Show the dashboard
     *
     * @return Response
     */
    public function show()
    {
        return response(\GuzzleHttp\json_encode('Hello World'), 200)->header('Content-Type', 'text/json');
    }

    public function contactList()
    {
        return view('mocks.contact-list');
    }

    public function homeList()
    {
        return view('mocks.dashboard-home');
    }
}
