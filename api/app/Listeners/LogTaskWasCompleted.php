<?php

namespace App\Listeners;

use App\Events\TaskCompleted;

class LogTaskWasCompleted
{
    /**
     * Handle the event.
     *
     * @param  TaskCompleted  $event
     * @return void
     */
    public function handle(TaskCompleted $event)
    {
        $event->task->user->activity()->create([
            'message' => "{$event->task->user->name} completed the \"{$event->task->name}\" task.",
        ]);
    }
}
