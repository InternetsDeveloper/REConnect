<?php

use Illuminate\Database\Seeder;

class MarketsSeeder extends Seeder {

    /**
     * Run the database seeds.
     *
     * @return  void
     */
    public function run() {
        // get markets config
        $markets_config = config('markets.markets');

        // create markets scaler indexed by name
        for ($i = 0; $i < count($markets_config); $i++) {
            $market_names[$markets_config[$i]['system_name']] = $markets_config[$i]['system_name'];
        }

        // return all pre-existing markets in the db based on config scaler
        $db_markets = Market::all('id', 'system_name')
            ->whereIn('name', $market_names);

        // loop through market config array
        // check if module exists in the db
        // if it does continue
        // create market
        foreach ($markets_config as $market_data) {
            if ($db_markets->contains($market_data['system_name'])) {
                continue;
            }

            if (!$module = Market::create($market_data)) {
                return FALSE;
            }
        }
    }
}