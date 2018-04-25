<?php

namespace App\Traits;

use App\Models\Market;
use App\FailedValidationException;

/**
 * Class HasMarkets
 * @package App\Traits
 */
trait HasMarkets
{
	/**
	 * Check if model has a market.
	 *
	 * @return bool
	 */
	public function hasMarket()
	{
		return (bool) $this->markets()->count();
	}

    /**
     * Associate markets to HasMarket implementor
     *
     * @return \Illuminate\Database\Eloquent\Relations\MorphToMany
     */
    public function markets()
    {
        return $this->morphToMany(Market::class, 'marketable');
    }

	/**
	 * Add a market to this model.
	 *
	 * @param Market $market
	 * @return mixed
	 */
	public function addMarket(Market $market)
	{
        return $this->markets()->attach($market->id) && $this->touch();
	}

	/**
     * Removes association for this model for given market.
	 *
     * @param Market $market
	 * @return bool
	 */
	public function deleteMarket(Market $market)
	{
        return $this->markets()->detach($market->id);
	}

	/**
     * Removes all association for this model for given market.
	 *
	 * @return bool
	 */
	public function flushMarkets()
	{
		return $this->markets()->detach();
	}

    public function marketable()
    {
        return $this->morphTo();
    }
}