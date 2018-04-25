<?php

namespace App\Models;

use App\Models\Model as REConnectedModel;
use App\Models\Users\User as User;
use App\Traits\IsSearchUserFilterField;
use Illuminate\Notifications\Notifiable;
use Sarav\Traits\CacheHandler;

/**
 * App\Module
 * @property int $id
 * @property string $system_name
 * @property string $display_name
 * @method static \Illuminate\Database\Query\Builder|\App\Market whereId($value)
 * @method static \Illuminate\Database\Query\Builder|\App\Market whereSystemName($value)
 * @mixin \Eloquent
 */
class Market extends REConnectedModel
{
    use IsSearchUserFilterField;
    use Notifiable;
    use CacheHandler;

    protected $individualCache = false;
    protected $cacheAll = true;
    protected $cacheName = 'markets';

    /**
     * @inheritdoc
     */
    protected $table = 'markets';

    /**
     * @inheritdoc
     */
    protected $fillable = [
        'system_name',
        'display_name'
    ];

    /**
     * @inheritdoc
     */
    protected $hidden = [];

    /**
     * @inheritdoc
     */
    protected $dates = ['created_at', 'updated_at', 'deleted_at'];

    public function user()
    {
        return $this->morphedByMany(User::class, 'marketable');
    }
}
