<?php

namespace App\Models\CompensationPlans;

use App\Models\Model as REConnectedModel;
use App\Traits\IsSearchUserFilterField;
use Illuminate\Notifications\Notifiable;
use Sarav\Traits\CacheHandler;

class CompensationPlan extends REConnectedModel
{
    use IsSearchUserFilterField;
    use Notifiable;
    use CacheHandler;

    protected $individualCache = false;
    protected $cacheAll = true;
    protected $cacheName = 'compensation_plans';

    /**
     * @inheritdoc
     */
    protected $table = 'compensation_plans';

    /**
     * @inheritdoc
     */
    protected $fillable = [
        'system_name',
        'display_name',
        'description',
        'payout_type',
        'amount'
    ];

    /**
    /**
     * @inheritdoc
     */
    protected $hidden = [];

    /**
     * @inheritdoc
     */
    protected $dates = ['created_at', 'updated_at', 'deleted_at'];

    /**
     * Get the users for the compensation plan
     */
    public function users()
    {
        return $this->hasMany('App\Models\Users\User');
    }

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
