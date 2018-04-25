<?php

use Illuminate\Database\Seeder;

class SearchUserFiltersSeeder extends Seeder
{
    protected $search_filter_mapping = [
        'name',
        'min_age',
        'max_age',
        'gender_male',
        'gender_female',
        'gender_not_indicated',
        'area_of_speciality_id',
        'min_insurance_expiration_date',
        'max_insurance_expiration_date',
        'min_license_expiration_date',
        'max_license_expiration_date',
        'min_start_date',
        'max_start_date',
        'email_subscribed',
        'campaign_status_has_been_on',
        'campaign_status_is_on',
        'campaign_status_has_not_been_on',
        'user_created_by_id',
        'min_close_date',
        'max_close_date',
        'is_lead',
        'min_assigned_date',
        'max_assigned_date'

    ];

    protected $name_mapping = [
        'name'
    ];

    protected $system_name_mapping = [
        'system_name'
    ];

    protected $email_mapping = [
        'email'
    ];

    protected $id_mapping = [
        'id'
    ];


    public function run()
    {
        $search_user_filters = config('search-user-filters.search_user_filters');

        foreach($search_user_filters as $filter_data){
            $this->create($filter_data);
        }
    }

    public function create($search_filter_data){

        //Pull the basic filter data
        $filter_row = $this->mapRow($search_filter_data['search_user_filter'], $this->search_filter_mapping);
        if(!$filter_row){
            return FALSE;
        }

        //Get the user who owns this filter
        $user_row = $this->mapRow($search_filter_data['filter_owner_user'], $this->email_mapping);
        $user = User::where('email', $user_row)->first();
        Auth::setUser($user);

        //Create the filter
        $filter = $this->createOrUpdateFilter($filter_row, $user);

        //Create Associations

        if(!empty($search_filter_data['companies'])) {
            foreach ($search_filter_data['companies'] as $company_row) {
                $company_row = $this->mapRow($company_row, $this->system_name_mapping);
                $this->associateField($company_row, $filter, UserCompany::class, 'system_name');
            }
        }

        if(!empty($search_filter_data['area_of_specialities'])) {
            foreach ($search_filter_data['area_of_specialities'] as $area_of_speciality_row) {
                $area_of_speciality_row = $this->mapRow($area_of_speciality_row, $this->system_name_mapping);
                $this->associateField($area_of_speciality_row, $filter, AreaOfSpeciality::class, 'system_name');
            }
        }

        if(!empty($search_filter_data['departments'])) {
            foreach ($search_filter_data['departments'] as $department_row) {
                $department_row = $this->mapRow($department_row, $this->system_name_mapping);
                $this->associateField($department_row, $filter, Department::class, 'system_name');
            }
        }

        if(!empty($search_filter_data['sources'])) {
            foreach ($search_filter_data['sources'] as $source_row) {
                $source_row = $this->mapRow($source_row, $this->system_name_mapping);
                $this->associateField($source_row, $filter, Source::class, 'system_name');
            }
        }

        if(!empty($search_filter_data['campaigns'])) {
            foreach ($search_filter_data['campaigns'] as $campaign_row) {
                $campaign_row = $this->mapRow($campaign_row, $this->id_mapping);
                $this->associateField($campaign_row, $filter, Campaign::class, 'id');
            }
        }

        if(!empty($search_filter_data['languages'])) {
            foreach ($search_filter_data['languages'] as $language_row) {
                $language_row = $this->mapRow($language_row, $this->system_name_mapping);
                $this->associateField($language_row, $filter, Language::class, 'system_name');
            }
        }

        if(!empty($search_filter_data['compensation_plans'])) {
            foreach ($search_filter_data['compensation_plans'] as $comp_plan_row) {
                $comp_plan_row = $this->mapRow($comp_plan_row, $this->system_name_mapping);
                $this->associateField($comp_plan_row, $filter, CompensationPlan::class, 'system_name');
            }
        }

        if(!empty($search_filter_data['brokerages'])) {
            foreach ($search_filter_data['brokerages'] as $brokerage_row) {
                $brokerage_row = $this->mapRow($brokerage_row, $this->system_name_mapping);
                $this->associateField($brokerage_row, $filter, Brokerage::class, 'system_name');
            }
        }

        if(!empty($search_filter_data['markets'])) {
            foreach ($search_filter_data['markets'] as $market_row) {
                $market_row = $this->mapRow($market_row, $this->system_name_mapping);
                $this->associateField($market_row, $filter, Market::class, 'system_name');
            }
        }

        if(!empty($search_filter_data['lead_statuses'])) {
            foreach ($search_filter_data['lead_statuses'] as $status_row) {
                $status_row = $this->mapRow($status_row, $this->system_name_mapping);
                $this->associateField($status_row, $filter, LeadStatus::class, 'system_name');
            }
        }

        if(!empty($search_filter_data['prospect_statuses'])) {
            foreach ($search_filter_data['prospect_statuses'] as $status_row) {
                $status_row = $this->mapRow($status_row, $this->system_name_mapping);
                $this->associateField($status_row, $filter, ProspectStatus::class, 'system_name');
            }
        }

        if(!empty($search_filter_data['rolegroups'])) {
            foreach ($search_filter_data['rolegroups'] as $group_row) {
                $group_row = $this->mapRow($group_row, $this->system_name_mapping);
                $this->associateField($group_row, $filter, RoleGroup::class, 'system_name');
            }
        }

        if(!empty($search_filter_data['transactions'])) {
            foreach ($search_filter_data['transactions'] as $t_row) {
                $t_row = $this->mapRow($t_row, $this->name_mapping);
                $this->associateField($t_row, $filter, Transaction::class, 'name');
            }
        }

        if(!empty($search_filter_data['assigned_to_users'])) {
            foreach ($search_filter_data['assigned_to_users'] as $assigned_to_user_row) {
                $assigned_to_user_row = $this->mapRow($assigned_to_user_row, $this->email_mapping);
                $this->associateAssignedToUser($assigned_to_user_row, $filter);
            }
        }

        if(!empty($search_filter_data['rep_users'])) {
            foreach ($search_filter_data['rep_users'] as $rep_user_row) {
                $rep_user_row = $this->mapRow($rep_user_row, $this->email_mapping);
                $this->associateRepUser($rep_user_row, $filter);
            }
        }

        if(!empty($search_filter_data['created_by_users'])) {
            foreach ($search_filter_data['created_by_users'] as $cb_user_row) {
                $cb_user_row = $this->mapRow($cb_user_row, $this->email_mapping);
                $this->associateUserCreatedBy($cb_user_row, $filter);
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

    public function createOrUpdateFilter($filterRow, $user){
        $filter = SearchUserFilter::updateOrCreate(['name' => $filterRow['name']], $filterRow);
        $user->addSearchUserFilter($filter);
        return $filter;
    }

    public function associateUserCreatedBy($user_data, $filter){
        $user = User::where('email', $user_data)->first();
        if(!empty($user)) {
            $filter->addUserCreatedBy($user);
            $filter->save();
        }
    }

    public function associateAssignedToUser($user_data, $filter){
        $user = User::where('email', $user_data)->first();
        if(!empty($user)) {
            $filter->addAssignedToUser($user);
            $filter->save();
        }
    }

    public function associateRepUser($user_data, $filter){
        $user = User::where('email', $user_data)->first();
        if(!empty($user)) {
            $filter->addRepUser($user);
            $filter->save();
        }
    }

    public function associateField($field_data, $filter, $field_type, $field_mapping) {
        $field = $field_type::where($field_mapping, $field_data)->first();
        if(!empty($field)){
            $field->addSearchUserFilter($filter);
            $field->save();
        }
    }
}
