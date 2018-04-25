<?php

namespace App\Models\Communications;

use App\Models\System\REConnected;
use Illuminate\Database\Eloquent\Model;

class Notification extends Model
{
    /**
     * The database table used by the model.
     *
     * @var string
     */
    protected $table = 'notifications';

    /**
     * The guarded attributes on the model.
     *
     * @var array
     */
    protected $guarded = [];

    /**
     * The attributes excluded from the model's JSON form.
     *
     * @var array
     */
    protected $hidden = [];

    /**
     * The attributes that should be cast to native types.
     *
     * @var array
     */
    protected $casts = [
        'read' => 'boolean',
    ];

    /**
     * Get the user the notification belongs to.
     */
    public function user()
    {
        return $this->belongsTo(REConnected::userModel(), 'user_id');
    }

    /**
     * Get the user that created the notification (if any).
     */
    public function creator()
    {
        return $this->belongsTo(REConnected::userModel(), 'created_by');
    }

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
