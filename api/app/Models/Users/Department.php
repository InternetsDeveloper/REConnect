<?php

namespace App\Models\Users;

use App\Facades\RoleGroup;
use App\Models\Model as REConnectedModel;
use App\Traits\IsSearchUserFilterField;
use Illuminate\Notifications\Notifiable;
use Sarav\Traits\CacheHandler;

class Department extends REConnectedModel
{
    use IsSearchUserFilterField;
    use Notifiable;
    use CacheHandler;

    protected $individualCache = false;
    protected $cacheAll = true;
    protected $cacheName = 'departments';

    /**
     * @inheritdoc
     */
    protected $table = 'departments';

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

    public function roleGroups()
    {
        return $this->hasMany(RoleGroup::class);
    }
}
