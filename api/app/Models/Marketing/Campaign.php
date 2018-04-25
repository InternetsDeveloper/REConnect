<?php

namespace App\Models\Marketing;

use App\Models\Model as REConnectedModel;
use App\Traits\IsSearchUserFilterField;

class Campaign extends REConnectedModel
{
    use IsSearchUserFilterField;

    /**
    * @inheritdoc
    */
    protected $table = 'campaigns';

    /**
    * @inheritdoc
    */
    protected $fillable = [
    	'name'
    ];

    /**
    * @inheritdoc
    */
    protected $hidden = [];

    /**
    * @inheritdoc
    */
    protected $dates = ['created_at', 'updated_at', 'deleted_at'];

    /**
     * The "booting" method of the model.
     *
     * @return void
     */
    protected static function boot()
    {
        parent::boot();

//        static::addGlobalScope(\App::make('App\Models\Scopes\LoggedInUserScope'));
    }
}
