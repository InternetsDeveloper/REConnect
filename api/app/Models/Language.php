<?php

namespace App\Models;

use App\Models\Model as REConnectedModel;
use App\Models\Users\User;
use App\Traits\IsSearchUserFilterField;
use Illuminate\Notifications\Notifiable;
use Sarav\Traits\CacheHandler;

class Language extends REConnectedModel
{
    use IsSearchUserFilterField;
    use Notifiable;
    use CacheHandler;

    protected $individualCache = false;
    protected $cacheAll = true;
    protected $cacheName = 'languages';

    /**
     * @inheritdoc
     */
    protected $table = 'languages';

    /**
     * @inheritdoc
     */
    protected $fillable = [
        'system_name',
        'display_name'
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

    public function users()
    {
        return $this->belongsToMany(User::class, 'user_language')->withTimestamps();
    }
}
