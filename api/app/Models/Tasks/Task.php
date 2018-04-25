<?php

namespace App\Models\Tasks;

use App\Models\Model as REConnectedModel;

/**
 * App\Task
 *
 * @property-read \App\User $user
 * @mixin \Eloquent
 */
class Task extends REConnectedModel
{
    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'name',
    ];

    protected $dates = ['created_at', 'updated_at', 'deleted_at'];


    protected $touches = ['user'];

    public function taskable()
    {
        return $this->morphTo();
    }

    /**
     * Get the user that created the task.
     */
    public function user()
    {
        return $this->morphedByMany(User::class, 'user_id');
    }
}
