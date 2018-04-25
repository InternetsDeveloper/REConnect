<?php

namespace App\Traits;

use App\Models\Users\AreaOfSpeciality;

/**
 * Class AreaOfSpeciality
 * @package App\Traits
 */

trait HasAreaOfSpeciality {

    public function areaOfSpeciality() {
        return $this->belongsTo(AreaOfSpeciality::class);
    }

    /**
     * Check if model has a areaOfSpeciality.
     *
     * @return bool
     */
    public function hasAreaOfSpeciality()
    {
        return (bool) $this->areaOfSpeciality()->count();
    }

    /**
     * Add a areaOfSpeciality to this model.
     *q
     * @param AreaOfSpeciality $areaOfSpeciality
     * @return mixed
     */
    public function addAreaOfSpeciality(AreaOfSpeciality $areaOfSpeciality)
    {
        return $this->areaOfSpeciality()->associate($areaOfSpeciality) && $this->touch();
    }

    /**
     * Deletes all the areaOfSpeciality of this model.
     *
     * @return bool
     */
    public function flushAreaOfSpeciality()
    {
        return $this->areaOfSpeciality()->dissociate();
    }
}