<?php

namespace App\Models;

use App\Models\Model as REConnectedModel;

class Note extends REConnectedModel
{
    /**
     * @inheritdoc
     */
    protected $table = 'notes';

    /**
     * @inheritdoc
     */
    protected $fillable = [
        'note'
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
        return $this->belongsTo(User::class);
    }
}
