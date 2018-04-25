<?php

namespace App\Models\Transactions;

use App\Models\Model as REConnectedModel;

class TransactionStatus extends REConnectedModel
{
    /**
     * @inheritdoc
     */
    protected $table = 'transaction_statuses';

    /**
     * @inheritdoc
     */
    protected $fillable = [
        'system_name',
        'display_name',
        'description'
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

    public function transactions()
    {
        return $this->belongsToMany(Transaction::class);
    }
}
