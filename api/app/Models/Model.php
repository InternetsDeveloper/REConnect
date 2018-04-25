<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model as EloquentModel;
use App\Traits\Userstamps;
use Illuminate\Database\Eloquent\SoftDeletes;

class Model extends EloquentModel
{
    use Userstamps;
    use SoftDeletes;

    public $forceFilled = false;

    /**
     * Fill the model with an array of attributes. Force mass assignment.
     *
     * @param  array  $attributes
     * @return $this
     */
    public function forceFill(array $attributes)
    {
        $this->forceFilled = true;

        return static::unguarded(function () use ($attributes) {
            return $this->fill($attributes);
        });
    }
}