<?php

namespace App\Models\Transactions;

use App\Models\Model as REConnectedModel;
use App\Traits\IsSearchUserFilterField;

/**
 * Class Transaction
 * @package App
 */
class Transaction extends REConnectedModel
{
    use IsSearchUserFilterField;

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'name'
    ];

    protected $dates = ['created_at', 'updated_at', 'deleted_at'];

    /**
     * Get the user that created the transaction.
     */
    public function user()
    {
        return $this->belongsTo(User::class);
    }

//    public function addUser(array $attributes) {
//        return $this->user()->u($attributes);
//    }
}
