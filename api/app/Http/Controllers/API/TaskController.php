<?php

namespace App\Http\Controllers\API;

use App\Task;
use Illuminate\Http\Request;
use App\Events\TaskCompleted;
use App\Http\Controllers\Controller;

class TaskController extends Controller
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
        return $request->user()->tasks;
    }

    /**
     * Create a new Task.
     *
     * @return Response
     */
    public function store(Request $request)
    {
        $this->validate($request, [
            'name' => 'required|max:255',
        ]);

        return $request->user()->tasks()->create([
            'name' => $request->name,
        ]);
    }

    /**
     * Destroy the given task.
     *
     * @param  Request  $request
     * @param  Task  $task
     * @return Response
     */
    public function destroy(Request $request, Task $task)
    {
        abort_unless($request->user()->tasks->contains($task), 403);

        event(new TaskCompleted($task));

        $task->delete();
    }
}
