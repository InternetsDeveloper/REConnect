<?php

namespace App\Events;

use App\Task;
use App\Events\Event;
use Illuminate\Queue\SerializesModels;

class TaskCompleted extends Event
{
    use SerializesModels;

    /**
     * The task instance.
     *
     * @var Task
     */
    public $task;

    /**
     * Create a new event instance.
     *
     * @param  Task  $task
     * @return void
     */
    public function __construct(Task $task)
    {
        $this->task = $task;
    }
}
