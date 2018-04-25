<?php

use Illuminate\Database\Seeder;

class LeadStatusSeeder extends Seeder
{
  /**
   * Run the database seeds.
   *
   * @return void
   */
  public function run()
  {
      $lead_statuses = config('lead-status.lead_statuses');

      $lead_status_names = [];
      foreach($lead_statuses as $lead_status_data) {
          $lead_status_names[] = $lead_status_data['system_name'];
      }

      $db_lead_statuses = LeadStatus::all('id', 'system_name')->whereIn('system_name', $lead_status_names);

      foreach($lead_statuses as $lead_status_data) {
          if ($db_lead_statuses->contains('system_name', $lead_status_data['system_name'])) {
              unset($lead_statuses[array_search($lead_status_data['system_name'], $lead_statuses)]);
          }
      }

      foreach($lead_statuses as $lead_status_data) {
          if (!$lead_status = LeadStatus::create($lead_status_data)) {
              return FALSE;
          }
      }
  }
}