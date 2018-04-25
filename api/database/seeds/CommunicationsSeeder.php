<?php

use Illuminate\Database\Seeder;
use App\Models\Communications\Communication;

class CommunicationsSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
    	$communications_config = config('communications.communications');

        for ($i = 0; $i < count($communications_config); $i ++) {
        	$communications_names[$communications_config[$i]['name']] = $communications_config[$i]['name'];
        }

        $db_communications = Communication::all('id', 'name')->whereIn('name', $communications_names);

        foreach ($communications_config as $communication_data) {
        	if ($db_communications->contains($communication_data['name'])) {
        		continue;
        	}

            if (!$communication = Communication::create($communication_data)) {
                return FALSE;
            }
        }
    }
}
