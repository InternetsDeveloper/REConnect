<?php

namespace App\Traits;

use App\Models\Marketing\Campaign;

/**
 * Class HasCampaigns
 * @package App\Traits
 */

trait HasCampaigns {

    /**
     * Check if model has a campaign.
     *
     * @return bool
     */
    public function hasCampaigns()
    {
        return (bool) $this->campaigns()->count();
    }

    /**
     * Add a campaign to this model.
     *
     * @param Campaign $campaign
     * @return mixed
     */
//    public function addCampaign(Campaign $campaign)
//    {
//        return $this->campaigns()->attach($campaign->id)->withTimeStamps() && $this->touch();
//    }

    /**
     * Add a campaign to this model.
     *
     * @param  array $attributes
     * @return mixed
     */
    public function addCampaign(array $attributes, array $values)
    {
        return $this->campaigns()->updateOrCreate($attributes, $values);
    }

    /**
     * Deletes given campaign
     *
     * @param Campaign $campaign
     * @return bool
     */
    public function deleteCampaign(Campaign $campaign)
    {
        return $this->campaigns()->detach($campaign->id);
    }

    /**
     * Updates the given campaign.
     *
     * @param  Campaign $campaign
     * @param  array   $attributes
     * @return mixed
     */
    public function updateCampaign(Campaign $campaign, array $attributes)
    {
        $attributes = $this->loadAddressAttributes($attributes);

        return $campaign->fill($attributes)->save();
    }

    /**
     * Deletes all the campaign of this model.
     *
     * @return bool
     */
    public function flushCampaigns()
    {
        return $this->campaigns()->detach();
    }

    public function campaignable()
    {
        return $this->morphTo();
    }
}