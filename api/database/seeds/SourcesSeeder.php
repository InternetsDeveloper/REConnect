<?php

use Illuminate\Database\Seeder;

class SourcesSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $sources = config('sources.sources');

        $source_names = [];
        foreach($sources as $source_data) {
            $source_names[] = $source_data['system_name'];
        }

        $db_sources = Source::all('id', 'system_name')->whereIn('system_name', $source_names);

        foreach($sources as $source_data) {
            if ($db_sources->contains('system_name', $source_data['system_name'])) {
                unset($sources[array_search($source_data['system_name'], $sources)]);
            }
        }

        foreach($sources as $source_data) {
            if(!$source = Source::create($source_data)) {
                return FALSE;
            }
        }
    }
}
