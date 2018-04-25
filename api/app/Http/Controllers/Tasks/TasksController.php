<?php

namespace App\Http\Controllers\Tasks;

use App\Http\Controllers\Controller;

use App\Models\Tasks\Task;
use Illuminate\Http\Request;

class TasksController extends Controller
{
    public function __construct() {

    }

    public function getAll(Request $request)
    {
        $tasks = $request->user()->tasks;
        return response()->json($tasks);
    }

    public function getUserTasks($id)
    {
        $user = User::where('id', $id)->first();
        $tasks = $user->tasks()->get();
        return response()->json($tasks);
    }
}

