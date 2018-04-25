<?php

namespace App\Http\Controllers\Users;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Users\SearchUserFilter;
use App\Models\Users\User;
use App\Models\Users\AreaOfSpeciality;
use App\Models\Users\UserCompany;
use App\Models\Users\Department;
use App\Models\Users\Source;
use App\Models\Language;
use App\Models\Marketing\Campaign;
use App\Models\Market;
use App\Models\Users\Brokerage;
use App\Models\CompensationPlans\CompensationPlan;
use App\Models\Users\ProspectStatus;
use App\Models\Users\LeadStatus;
use App\Models\Users\Roles\RoleGroup;
use App\Models\Transactions\Transaction;

class SearchUserFilterController extends Controller {

    /**
     * Create a new controller instance.
     *
     * @return void
     */
    public function __construct() {

    }

    public function getFilter($id)
    {
        $filter = SearchUserFilter::with(
            'usersCreatedBy',
            'assignedToUsers',
            'repUsers',
            'areaOfSpecialities',
            'companies',
            'departments',
            'sources',
            'languages',
            'campaigns',
            'markets',
            'brokerages',
            'compensationPlans',
            'prospectStatuses',
            'leadStatuses',
            'roleGroups',
            'transactions'
        )->where('id', '=', $id)->get();

        return response()->json($filter);
    }


    public function getAll()
    {
        $filters = SearchUserFilter::with(
            'usersCreatedBy',
            'assignedToUsers',
            'repUsers',
            'areaOfSpecialities',
            'companies',
            'departments',
            'sources',
            'languages',
            'campaigns',
            'markets',
            'brokerages',
            'compensationPlans',
            'prospectStatuses',
            'leadStatuses',
            'roleGroups',
            'transactions'
        )->get();

        return response()->json($filters);
    }

    public function saveFilter(Request $request)
    {
        $body = json_decode($request->getContent());

        // get selected genders
        $genders = [
            'male' => 0,
            'female' => 0,
            'not_indicated' => 0
        ];

        foreach($body->genders as $gender) {
            if(!empty($gender->value)) {
                if ($gender->value == 'male') {
                    $genders['male'] = 1;
                }
                if ($gender->value == 'female') {
                    $genders['female'] = 1;
                }
                if ($gender->value == 'not_indicated') {
                    $genders['not_indicated'] = 1;
                }
            }
        }

        // get lead status
        if($body->is_lead == 'Yes')
            $is_lead = 1;
        else {
            $is_lead = 0;
        }

        //get email status
        if($body->email_status =='Subscribed')
            $email_subscribed = 1;
        else
            $email_subscribed = 0;

        //create filter
        $filter = SearchUserFilter::create(
            [
                'name' => $body->name,
                'user_id' => auth()->id(),
                'gender_male' => $genders['male'],
                'gender_female' => $genders['female'],
                'gender_not_indicated' => $genders['not_indicated'],
                'min_age' => $body->min_age,
                'max_age' => $body->max_age,
                'min_insurance_expiration_date' => $body->min_insurance_expiration_date,
                'max_insurance_expiration_date' => $body->max_insurance_expiration_date,
                'min_license_expiration_date' => $body->min_license_expiration_date,
                'max_license_expiration_date' => $body->max_license_expiration_date,
                'min_start_date' => $body->min_start_date,
                'max_start_date' => $body->max_start_date,
                'email_subscribed' => $email_subscribed,
//                'campaign_status' => $body->campaign_status, TODO implement campaign_status
                'min_close_date' => $body->min_close_date,
                'max_close_date' => $body->max_close_date,
                'min_assigned_date' => $body->min_assigned_date,
                'max_assigned_date' => $body->max_assigned_date,
                'is_lead' => $is_lead
            ]
        );


        $mapping = [
            'area_of_specialities' => AreaOfSpeciality::class,
            'companies' => UserCompany::class,
            'departments' => Department::class,
            'sources' => Source::class,
            'languages' => Language::class,
            'campaigns' => Campaign::class,
            'markets' => Market::class,
            'brokerages' => Brokerage::class,
            'compensation_plans' => CompensationPlan::class,
            'prospect_statuses' => ProspectStatus::class,
            'lead_statuses' => LeadStatus::class,
            'role_groups' => RoleGroup::class,
            'transactions' => Transaction::class
        ];

        foreach($mapping as $key => $field_type) {
            $fields = $body->$key;
            foreach($fields as $field_ob){
                \Log::alert(var_dump($field_ob->value));
                $field = $field_type::find($field_ob->value);
                if(!empty($field)){
                    $field->addSearchUserFilter($filter);
                    $field->save();
                }else{
                    throw new \Exception("The {$field_type} field is empty for id: {$field_ob->value}!");
                }
            }
        }
//
        //Created By User

        if(!empty($body->users_created_by)) {
            foreach ($body->users_created_by as $field_ob) {
                $user = User::find($field_ob->value);
                if (!empty($user)) {
                    $filter->addUserCreatedBy($user);
                    $filter->save();
                }
                else {
                    throw new \Exception("The {$field_ob} field is empty for id: {$field_ob->value}!");
                }
            }
        }


        if(!empty($body->assigned_to_users->value)) {
            foreach ($body->assigned_to_users as $field_ob) {
                $user = User::find($field_ob->value);
                if (!empty($user)) {
                    $filter->addAssignedToUser($user);
                    $filter->save();
                }
                else {
                    throw new \Exception("The {$field_ob} field is empty for id: {$field_ob->value}!");
                }
            }
        }

        if(!empty($body->rep_users->value)) {
            foreach ($body->rep_users as $field_ob) {
                $user = User::find($field_ob->value);
                if (!empty($user)) {
                    $filter->addRepUser($user);
                    $filter->save();
                }
                else {
                    throw new \Exception("The {$field_ob} field is empty for id: {$field_ob->value}!");
                }
            }
        }

        return $this->getFilter($filter->id);
    }
}


