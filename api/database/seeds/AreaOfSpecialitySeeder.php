<?php

use Illuminate\Database\Seeder;

class AreaOfSpecialitySeeder extends Seeder
{
  /**
   * Run the database seeds.
   *
   * @return void
   */
  public function run()
  {
      $area_of_specialities = config('area-of-speciality.area_of_specialities');

      $area_of_speciality_names = [];
      foreach($area_of_specialities as $area_of_speciality_data) {
          $area_of_speciality_names[] = $area_of_speciality_data['system_name'];
      }

      $db_area_of_specialities = AreaOfSpeciality::all('id', 'system_name')->whereIn('system_name', $area_of_speciality_names);

      foreach($area_of_specialities as $area_of_speciality_data) {
          if ($db_area_of_specialities->contains('system_name', $area_of_speciality_data['system_name'])) {
              unset($area_of_specialities[array_search($area_of_speciality_data['system_name'], $area_of_specialities)]);
          }
      }

      foreach($area_of_specialities as $area_of_speciality_data) {
          if (!$area_of_speciality = AreaOfSpeciality::create($area_of_speciality_data)) {
              return FALSE;
          }
      }
  }
}