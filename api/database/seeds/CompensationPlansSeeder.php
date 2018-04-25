<?php

use Illuminate\Database\Seeder;

class CompensationPlansSeeder extends Seeder
{
  /**
   * Run the database seeds.
   *
   * @return void
   */
  public function run()
  {
      $compensation_plans = config('compensation-plans.compensation_plans');

      $compensation_plans_names = [];
      foreach($compensation_plans as $compensation_plan_data) {
          $compensation_plans_names[] = $compensation_plan_data['system_name'];
      }

      $db_compensation_plans = CompensationPlan::all('id', 'system_name')->whereIn('system_name', $compensation_plans_names);

      foreach($compensation_plans as $compensation_plan_data) {
          if ($db_compensation_plans->contains('system_name', $compensation_plan_data['system_name'])) {
              unset($compensation_plans[array_search($compensation_plan_data['system_name'], $compensation_plans)]);
          }
      }

      foreach($compensation_plans as $compensation_plan_data) {
          if (!$compensation_plans = CompensationPlan::create($compensation_plan_data)) {
              return FALSE;
          }
      }
  }
}