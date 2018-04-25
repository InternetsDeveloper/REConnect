<?php

namespace App\Traits;

use App\FailedValidationException;
use App\Models\Users\Brokerage;

/**
 * Class HasBrokerages
 * @package App\Traits
 */
trait HasBrokerages
{
    /**
     * Check if model has a brokerage.
     *
     * @return bool
     */
    public function hasBrokerage()
    {
        return (bool) $this->brokerages()->count();
    }

    /**
     * Associate brokerage to HasBrokeages implementor
     *
     * @return \Illuminate\Database\Eloquent\Relations\MorphToMany
     */
    public function brokerages()
    {
        return $this->morphToMany(Brokerage::class, 'brokerageable');
    }

    /**
     * Add a brokerage to this model.
     *
     * @param Brokerage $brokerage
     * @return mixed
     */
    public function addBrokerage(Brokerage $brokerage)
    {
        return $this->brokerages()->attach($brokerage->id) && $this->touch();
    }

    /**
     * Removes association for this model for given brokerage.
     *
     * @param Brokerage $brokerage
     * @return bool
     */
    public function deleteBrokerage(Brokerage $brokerage)
    {
        return $this->brokerages()->detach($brokerage->id);
    }

    /**
     * Removes all association for this model for given brokerage.
     *
     * @return bool
     */
    public function flushBrokerages()
    {
        return $this->brokerages()->detach();
    }

    public function brokerageable()
    {
        return $this->morphTo();
    }
}