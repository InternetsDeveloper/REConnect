<?php

namespace App\Models\System;

use App\Models\Model as REConnectedModel;

class Module extends REConnectedModel
{

    protected $dates = ['created_at', 'updated_at', 'deleted_at'];

    /**
     * A module can have many permissions
     *
     * @return \Illuminate\Database\Eloquent\Relations\HasMany
     */
    public function permissions()
    {
        return $this->hasMany(Permission::class);
    }
}
