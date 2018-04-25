<?php

use Illuminate\Database\Seeder;
use Carbon\Carbon;

class InitialSetupSeeder extends Seeder {

    public function __construct()
    {
        $this->table = 'users';
    }

    public function run()
    {
        // Uncomment the below to wipe the table clean before populating
        DB::table($this->table)->delete();

        $config = config('users');

        $initial_user_fields = $config['defaults']['initial_user']['user'];

        DB::table('users')->insert(
            [
                'id' => 1,
                'name' => $initial_user_fields['name'],
                'email' => $initial_user_fields['email'],
                'age' => $initial_user_fields['age'],
                'password' => Hash::make($initial_user_fields['password']),
                'created_at' => Carbon::now()->format('Y-m-d H:i:s'),
                'updated_at' => Carbon::now()->format('Y-m-d H:i:s'),
                'created_by' => 1,
                'updated_by' => 1
            ]
        );

        $initial_department_fields = $config['defaults']['initial_user']['department'];
        DB::table('departments')->insert(
            [
                'id' => 1,
                'system_name' => $initial_department_fields['system_name'],
                'display_name' => $initial_department_fields['display_name'],
                'description' => $initial_department_fields['description'],
                'created_at' => Carbon::now()->format('Y-m-d H:i:s'),
                'updated_at' => Carbon::now()->format('Y-m-d H:i:s'),
                'created_by' => 1,
                'updated_by' => 1
            ]
        );

        $initial_role_fields = $config['defaults']['initial_user']['user_role'];
        DB::table('roles')->insert(
            [
                'id' => 1,
                'name' => $initial_role_fields['name'],
                'rolegroup_id' => 1,
                'display_name' => $initial_role_fields['display_name'],
                'created_at' => Carbon::now()->format('Y-m-d H:i:s'),
                'updated_at' => Carbon::now()->format('Y-m-d H:i:s'),
                'created_by' => 1,
                'updated_by' => 1
            ]
        );
    }
}