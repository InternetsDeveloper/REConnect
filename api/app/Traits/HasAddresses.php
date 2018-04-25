<?php

namespace App\Traits;

use App\Models\Address;
use App\Exceptions\AddressNotFoundException;

/**
 * Class HasAddresses
 * @package App\Traits
 */
trait HasAddresses
{
	/**
	 * Get primary address
	 *
	 * @return AddressNotFoundException
	 */
	public function getPrimaryAddress()
    {
        throw new AddressNotFoundException('Primary address not a valid address type');
	}

    /**
     * Get mailing address
     *
     * @return Address|null
     */
    public function getMailingAddress()
    {
        return $this->addresses()->orderBy('is_mailing', 'DESC')->first();
    }

	/**
	 * Get billing address
	 *
	 * @return AddressNotFoundException
	 */
	public function getBillingAddress()
    {
        return $this->addresses()->orderBy('is_billing', 'DESC')->first();
	}

    /**
     * Get property address
     *
     * @return Address|null
     */
    public function getPropertyAddress()
    {
        return $this->addresses()->orderBy('is_property', 'DESC')->first();
    }

    /**
     * Get all addresses for this model.
     *
     * @return \Illuminate\Database\Eloquent\Relations\MorphMany
     */
    public function addresses()
    {
        return $this->morphMany(Address::class, 'addressable');
    }

    /**
     * Check if model has an address.
     *
     * @return bool
     */
    public function hasAddress()
    {
        return (bool)$this->addresses()->count();
    }

    /**
     * Add an address to this model.
     *
     * @param  array $attributes
     * @return mixed
     */
    public function addAddress(array $attributes)
    {
        $attributes = $this->loadAddressAttributes($attributes);

        return $this->addresses()->updateOrCreate($attributes);
    }

    /**
     * Updates the given address.
     *
     * @param  Address $address
     * @param  array   $attributes
     * @return mixed
     */
    public function updateAddress(Address $address, array $attributes )
    {
        $attributes = $this->loadAddressAttributes($attributes);

        return $address->fill($attributes)->save();
    }

    /**
     * Deletes given address.
     *
     * @param  Address $address
     * @return bool
     */
    public function deleteAddress(Address $address)
    {
        if ( $this != $address->addressable()->first() )
            return false;

        return $address->delete();
    }

    /**
     * Deletes all the addresses of this model.
     *
     * @return bool
     */
    public function flushAddresses()
    {
        return $this->addresses()->delete();
    }

    /**
     * Add country id to attributes array
     *
     * @param  array $attributes
     * @return array $attributes
     * @throws FailedValidationException
     */
    public function loadAddressAttributes(array $attributes)
    {
        // return if no country given
        if ( ! isset($attributes['country']) )
            return $attributes;

        // find country
        $country = \Countries::where('iso_3166_2', $attributes['country'])
            ->orWhere('iso_3166_3', $attributes['country'])
            ->first();

        // unset country from attributes array
        unset($attributes['country']);

        // add country_id to attributes array
        if ( is_object($country) && isset($country->id) )
            $attributes['country_id'] = $country->id;

        // run validation
        $validator = $this->validateAddress($attributes);

        if ( $validator->fails() )
            throw new FailedValidationException('Validator failed for: '. implode(', ', $attributes));

        // return attributes array with country_id key/value pair
        return $attributes;
    }

    /**
     * Add country id to attributes array
     *
     * @param  array $attributes
     * @return array $attributes
     */
    function validateAddress(array $attributes)
    {
        $rules = Address::getValidationRules();

        return \Validator::make($attributes, $rules);
    }
}