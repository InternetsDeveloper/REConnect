<?php

use Illuminate\Database\Seeder;

class DepartmentsSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $departments_config = config('departments.departments');

        // create departments scaler indexed by name
        for ($i = 0; $i < count($departments_config); $i++) {
            $department_names[$departments_config[$i]['system_name']] = $departments_config[$i]['system_name'];
        }

        // return all pre-existing departments in the db based on config scaler
        $db_departments = Department::all('id', 'system_name')
            ->whereIn('name', $department_names);

        // loop through department config array
        // check if module exists in the db
        // if it does continue
        // create department
        foreach ($departments_config as $department_data) {
            if ($db_departments->contains($department_data['system_name'])) {
                continue;
            }

            if (!$module = Department::create($department_data)) {
                return FALSE;
            }
        }
    }
}
