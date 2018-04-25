<?php

namespace App\Traits;

use App\Models\PhoneNumber;

/**
 * Trait HasPhoneNumber
 * @package App\Traits
 */
trait HasPhoneNumbers
{
    /**
     * Check if a model has a phonenumber
     *
     * @return bool
     */
    public function hasPhonenumber()
    {
        return (bool) $this->phonenumbers()->count();
    }

    /**
     * Add a phone number to this model.
     * Pass an array instead of an object because
     * PhoneNumber is a weak entity which is to say
     * that a phone number will never be created
     * without being associated to another entity
     *
     * @param  array $attributes
     * @return mixed
     */
    public function addPhoneNumber(array $attributes)
    {
        return $this->phonenumbers()->updateOrCreate($attributes);
    }


    /**
     * Deletes given phonenumber.
     *
     * @param PhoneNumber $number
     * @return bool
     */
    public function deletePhonenumber(PhoneNumber $number)
    {
        return $this->phonenumbers()->detach($number->id);
    }

    /**
     * Deletes all the phonenumbers of this model.
     *
     * @return bool
     */
    public function flushPhonenumbers()
    {
        return $this->phonenumbers()->detatch();
    }

    /**
     * Get all of the owning phonenumberable models.
     * @return \Illuminate\Database\Eloquent\Relations\MorphTo
     */
    public function phonenumberable()
    {
        return $this->morphTo();
    }
}
