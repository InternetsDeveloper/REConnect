<?php

use Illuminate\Database\Seeder;

class LanguagesSeeder extends Seeder
{
  /**
   * Run the database seeds.
   *
   * @return void
   */
  public function run()
  {
      $languages = config('languages.languages');

      $language_names = [];
      foreach($languages as $language_data) {
          $language_names[] = $language_data['system_name'];
      }

      $db_languages = Language::all('id', 'system_name')->whereIn('system_name', $language_names);

      foreach($languages as $language_data) {
          if ($db_languages->contains('system_name', $language_data['system_name'])) {
              unset($languages[array_search($language_data['system_name'], $languages)]);
          }
      }

      foreach($languages as $language_data) {
          if (!$language = Language::create($language_data)) {
              return FALSE;
          }
      }
  }
}