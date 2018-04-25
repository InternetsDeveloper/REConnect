<?php

namespace App\Traits;

use App\Models\CompensationPlans\CompensationPlan;

/**
 * Class HasCompensationPlans
 * @package App\Traits
 */

trait HasCompensationPlan {

    /**
     * Get the compensation plan for this model.
     *
     */
    public function compensationPlan()
    {
        return $this->belongsToMany(CompensationPlan::class);
    }

    /**
     * Check if model has a compensation plan.
     *
     * @return bool
     */
    public function hasCompensationPlan()
    {
        return (bool)$this->compensationPlan()->count();
    }

    /**
     * Add a compensation plan to this model.
     *q
     * @param CompensationPlan $compensation_plan
     * @return mixed
     */
    public function addCompensationPlan(CompensationPlan $compensation_plan)
    {
        return $this->compensationPlan()->associate($compensation_plan) && $this->touch();
    }

    /**
     * Deletes the compensation plan of this model.
     *
     * @return bool
     */
    public function flushCompensationPlan()
    {
        return $this->compensationPlan()->dissociate();
    }
}