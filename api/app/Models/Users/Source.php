<?php

namespace App\Models\Users;

use App\Models\Model as REConnectedModel;
use App\Traits\IsSearchUserFilterField;
use Illuminate\Notifications\Notifiable;
use Sarav\Traits\CacheHandler;

class Source extends REConnectedModel
{
    use IsSearchUserFilterField;
    use Notifiable;
    use CacheHandler;

    protected $individualCache = false;
    protected $cacheAll = true;
    protected $cacheName = 'sources';

    /**
     * @inheritdoc
     */
    protected $table = 'sources';

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
    protected $hidden = [];

    /**
     * @inheritdoc
     */
    protected $dates = ['created_at', 'updated_at', 'deleted_at'];

    public function users()
    {
        return $this->hasMany(User::class);
    }
}
