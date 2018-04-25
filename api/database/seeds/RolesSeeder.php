<?php

use Illuminate\Database\Seeder;

class RolesSeeder extends Seeder
{
    protected $role_mapping = [
        'name',
        'display_name'
    ];


    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $roles = config('roles.roles');

        $role_names = [];
        foreach($roles as $role_data) {
            $role_names[] = $role_data['role']['name'];
        }

        $db_roles = Role::all('id', 'name')->whereIn('name', $role_names);

        foreach($roles as $role_data) {
            if ($db_roles->contains('name', $role_data['role']['name'])) {
                unset($roles[array_search($role_data['role']['name'], $roles)]);
            }
        }

        foreach($roles as $role_data) {

            $role_row = $this->mapRow($role_data['role'], $this->role_mapping);

            if(!empty($role_data['rolegroup'])) {
                $rolegroup = RoleGroup::where('system_name', $role_data['rolegroup'])->first();
                if (empty($rolegroup)) {
                    return FALSE;
                }

                $role = new Role($role_row);
                $rolegroup->roles()->save($role);
            }
        }
    }

    public function mapRow(array $row, array $mapping) {
        $row_values = [];

        foreach ($mapping as $column) {
            if (isset($row[$column]) && $row[$column] !== '') {
                if ($column == 'password') {
                    $row_values[$column] = Hash::make($row[$column]);
                }
                else {
                    $row_values[$column] = $row[$column];
                }
            }
        }

        return $row_values;
    }

}