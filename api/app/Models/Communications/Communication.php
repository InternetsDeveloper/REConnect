<?php

namespace App\Models\Communications;

use App\Models\Model as REConnectedModel;

class Communication extends REConnectedModel
{
    /**
    * @inheritdoc
    */
    protected $table = 'communications';

    /**
    * @inheritdoc
    */
    protected $fillable = [
    	'user_id',
    	'created_by',
        'updated_by',
        'deleted_by',
    	'body',
        'read'
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

        static::addGlobalScope(\App::make('App\Models\Scopes\LoggedInUserScope'));
    }
}
