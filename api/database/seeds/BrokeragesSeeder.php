<?php

use Illuminate\Database\Seeder;

class BrokeragesSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $brokerages = config('brokerages.brokerages');

        $brokerage_names = [];
        foreach($brokerages as $brokerage_data) {
            $brokerage_names[] = $brokerage_data['system_name'];
        }

        $db_brokerages = Brokerage::all('id', 'system_name')->whereIn('system_name', $brokerage_names);

        foreach($brokerages as $brokerage_data) {
            if ($db_brokerages->contains('system_name', $brokerage_data['system_name'])) {
                unset($brokerages[array_search($brokerage_data['system_name'], $brokerages)]);
            }
        }

        foreach($brokerages as$brokerage_data) {
            if(!$brokerage = Brokerage::create($brokerage_data)) {
                return FALSE;
            }
        }
    }
}
