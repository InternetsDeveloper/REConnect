<?php

namespace App\Models\Users;

use App\Models\Model as REConnectedModel;
use App\Traits\IsSearchUserFilterField;
use Illuminate\Notifications\Notifiable;
use Sarav\Traits\CacheHandler;

class Brokerage extends REConnectedModel
{
    use IsSearchUserFilterField;
    use Notifiable;
    use CacheHandler;

    protected $individualCache = false;
    protected $cacheAll = true;
    protected $cacheName = 'brokerages';

    /**
     * @inheritdoc
     */
    protected $table = 'brokerages';

    /**
     * @inheritdoc
     */
    protected $fillable = [
        'system_name',
        'display_name',
        'description'
    ];

    /**
     * @inheritdoc
     */
    protected $hidden = ['agency_id'];

    protected $touches = ['users'];

    /**
     * @inheritdoc
     */
    protected $dates = ['created_at', 'updated_at', 'deleted_at'];

    public function users()
    {
        return $this->morphedByMany(User::class, 'brokerageable');
    }

}
