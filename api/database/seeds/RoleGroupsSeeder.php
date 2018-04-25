<?php

use Illuminate\Database\Seeder;

class RoleGroupsSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {

//        Cache::tags('tag_name')->put($key, $content, $duration_in_minutes);
//        $item = Cache::get('key');
//        dd($item);

        $role_groups = config('role-groups.rolegroups');

        $role_group_names = [];
        foreach($role_groups as $role_group_name) {
            $role_group_names[] = $role_group_name['system_name'];
        }

        $db_role_groups = RoleGroup::all('id', 'system_name')->whereIn('system_name', $role_group_names);

        foreach($role_groups as $role_group_data) {
            if ($db_role_groups->contains('system_name', $role_group_data['system_name'])) {
                unset($role_groups[array_search($role_group_data['system_name'], $role_groups)]);
            }
        }

        foreach($role_groups as $role_group_data) {
            if (!$role_group = RoleGroup::create($role_group_data)) {
                return FALSE;
          }
      }
  }
}