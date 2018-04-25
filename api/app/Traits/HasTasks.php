<?php

namespace App\Traits;

use App\Models\Tasks\Task;

/**
 * Class HasTasks
 * @package App\Traits
 */

trait HasTasks {

    /**
     * Get all tasks for this model.
     *
     * @return \Illuminate\Database\Eloquent\Relations\MorphToMany
     */
    public function tasks()
    {
        return $this->morphToMany(Task::class, 'taskable');
    }

    /**
     * Check if model has a task.
     *
     * @return bool
     */
    public function hasTask()
    {
        return (bool) $this->tasks()->count();
    }

    /**
     * Add a task to this model.
     *
     * @param  array $attributes
     * @return mixed
     */
    public function addTask(array $attributes, array $values)
    {
        return $this->tasks()->updateOrCreate($attributes, $values);
    }

    /**
     * Deletes given task
     *
     * @param Task $task
     * @return bool
     */
    public function deleteTask(Task $task)
    {
        return $this->tasks()->detach($task->id);
    }

    /**
     * Deletes all the task of this model.
     *
     * @return bool
     */
    public function flushTasks()
    {
        return $this->tasks()->detach();
    }
}