<?php

namespace App\Traits;

use App\Models\Users\UserCompany;

/**
 * Class UserCompany
 * @package App\Traits
 */

trait HasCompany {

    public function company()
    {
        return $this->belongsTo(UserCompany::class, 'company_id', 'id');
    }

    /**
     * Check if model has a company.
     *
     * @return bool
     */
    public function hasCompany()
    {
        return (bool) $this->company()->count();
    }

    /**
     * Add a company to this model.
     *q
     * @param UserCompany $company
     * @return mixed
     */
    public function addCompany(UserCompany $company)
    {
        return $this->company()->associate($company) && $this->touch();
    }

    /**
     * Deletes all the company of this model.
     *
     * @return bool
     */
    public function flushCompany()
    {
        return $this->company()->dissociate();
    }
}