<?php

use Illuminate\Database\Seeder;

class CampaignsSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $campaigns = config('campaigns.campaigns');

        $campaign_names = [];
        foreach($campaigns as $campaign_data) {
            $campaign_names[] = $campaign_data['name'];
        }

        $bd_campaigns = Campaign::all('id', 'name')->whereIn('name', $campaign_names);

        foreach($campaigns as $campaign_data) {
            if ($bd_campaigns->contains('name', $campaign_data['name'])) {
                unset($campaigns[array_search($campaign_data['name'], $campaigns)]);
            }
        }

        foreach($campaigns as $campaign_data) {
            if(!$user_company = Campaign::create($campaign_data)) {
                return FALSE;
            }
        }
    }
}
