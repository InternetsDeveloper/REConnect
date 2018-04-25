<?php

namespace App\Models\Users;

use App\Models\Model as REConnectedModel;
use App\Traits\IsSearchUserFilterField;

class UserCompany extends REConnectedModel
{
    use IsSearchUserFilterField;

    /**
     * @inheritdoc
     */
    protected $table = 'user_companies';

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
        return $this->belongsTo(User::class);
    }
}
