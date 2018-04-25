<?php

use Illuminate\Database\Seeder;

class ModulesSeeder extends Seeder
{
  /**
   * Run the database seeds.
   *
   * @return void
   */
  public function run() {

      $modules_config = config('modules');

      $modules = $modules_config['modules'];

      $module_names = [];
      foreach ($modules as $module_data) {
          $module_names[] = $module_data['name'];
      }

      $db_modules = Module::all('id', 'name')->whereIn('name', $module_names);

      foreach ($modules as $module_data) {
          if ($db_modules->contains('name', $module_data['name'])) {
              unset($modules[array_search($module_data['name'], $modules)]);
          }
      }

      foreach ($modules as $module_data) {
          if (!$module = Module::create($module_data)) {
              return FALSE;
          }
      }
  }
}