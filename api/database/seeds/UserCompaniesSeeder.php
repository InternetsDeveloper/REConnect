<?php

use Illuminate\Database\Seeder;

class UserCompaniesSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $user_companies = config('user-companies.user_companies');

        $user_company_names = [];
        foreach($user_companies as $user_company_data) {
            $user_company_names[] = $user_company_data['system_name'];
        }

        $db_sources = UserCompany::all('id', 'system_name')->whereIn('system_name', $user_company_names);

        foreach($user_companies as $user_company_data) {
            if ($db_sources->contains('system_name', $user_company_data['system_name'])) {
                unset($user_companies[array_search($user_company_data['system_name'], $user_companies)]);
            }
        }

        foreach($user_companies as $user_company_data) {
            if(!$user_company = UserCompany::create($user_company_data)) {
                return FALSE;
            }
        }
    }
}
