<?php

namespace App\Models;

use App\Models\Model as REConnectedModel;
use App\Traits\HasPhoneNumbers;

class Card extends REConnectedModel
{
    use HasPhoneNumbers;

    /**
     * @inheritdoc
     */
    protected $table = 'cards';

    /**
     * @inheritdoc
     */
    protected $fillable = [
        'stripe_id',
        'card_brand',
        'card_last_four',
        'address_id',
        'cardable_id',
        'cardable_type',
        'is_primary',
        'is_visa',
        'is_mastercard',
        'is_discover',
        'is_americanexpress',
        'is_dinersclub',
        'is_jbc',
        'vat_id',
        'extra_billing_information'
    ];

    /**
     * @inheritdoc
     */
    protected $hidden = [];

    /**
     * @inheritdoc
     */
    protected $dates = ['created_at', 'updated_at', 'deleted_at'];

    /**
     * Get all of the owning cardable models.
     * @return \Illuminate\Database\Eloquent\Relations\MorphTo
     */
    public function cardable()
    {
        return $this->morphTo();
    }
}
