<?php

use Illuminate\Database\Seeder;

class ProspectStatusSeeder extends Seeder
{
  /**
   * Run the database seeds.
   *
   * @return void
   */
  public function run()
  {
      $prospect_statuses = config('prospect-status.prospect_statuses');

      $prospect_status_names = [];
      foreach($prospect_statuses as $prospect_status_data) {
          $prospect_status_names[] = $prospect_status_data['system_name'];
      }

      $db_prospect_statuses = ProspectStatus::all('id', 'system_name')->whereIn('system_name', $prospect_status_names);

      foreach($prospect_statuses as $prospect_status_data) {
          if ($db_prospect_statuses->contains('system_name', $prospect_status_data['system_name'])) {
              unset($prospect_statuses[array_search($prospect_status_data['system_name'], $prospect_statuses)]);
          }
      }

      foreach($prospect_statuses as $prospect_status_data) {
          if (!$prospect_status = ProspectStatus::create($prospect_status_data)) {
              return FALSE;
          }
      }
  }
}