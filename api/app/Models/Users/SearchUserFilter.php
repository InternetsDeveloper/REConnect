<?php

namespace App\Models\Users;

use App\Models\Model as REConnectedModel;
use App\Traits\HasCompany;
use App\Traits\HasAreaOfSpeciality;

use App\Models\Language;
use App\Models\Market;
use App\Models\CompensationPlans\CompensationPlan;
use App\Models\Marketing\Campaign;
use App\Models\Transactions\Transaction;
use App\Models\Users\Roles\RoleGroup;

class SearchUserFilter extends REConnectedModel
{
    use HasCompany;
    use HasAreaOfSpeciality;

    /**
     * @inheritdoc
     */
    protected $table = 'search_user_filters';

    /**
     * @inheritdoc
     */
    protected $fillable = [
        'name',
        'user_id',
        'min_age',
        'max_age',
        'gender_male',
        'gender_female',
        'gender_not_indicated',
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
        'min_close_date',
        'max_close_date',
        'is_lead',
        'min_assigned_date',
        'max_assigned_date'
    ];

    /**
    /**
     * @inheritdoc
     */
    protected $hidden = [];

    /**
     * @inheritdoc
     */
    protected $dates = ['created_at', 'updated_at', 'deleted_at'];

    //User who owns this
    public function user()
    {
        return $this->belongsTo(User::class);
    }

    //User who created the contact that is being searched for with the filter
    public function usersCreatedBy()
    {
        return $this->belongsToMany(User::class, 'search_user_filter_created_by_users')->withTimestamps();
    }

    public function addUserCreatedBy(User $user)
    {
        return $this->usersCreatedBy()->save($user);
    }

    public function assignedToUsers()
    {
        return $this->belongsToMany(User::class, 'search_user_filter_assigned_to_users')->withTimestamps();
    }

    public function addAssignedToUser(User $user)
    {
        return $this->assignedToUsers()->save($user);
    }

    public function repUsers()
    {
        return $this->belongsToMany(User::class, 'search_user_filter_rep_users')->withTimestamps();
    }

    public function addRepUser(User $user)
    {
        return $this->repUsers()->save($user);
    }

    public function areaOfSpecialities()
    {
        return $this->morphedByMany(AreaOfSpeciality::class, 'search_user_filterable');
    }

    public function companies()
    {
        return $this->morphedByMany(UserCompany::class, 'search_user_filterable');
    }

    public function departments()
    {
        return $this->morphedByMany(Department::class, 'search_user_filterable');
    }

    public function sources()
    {
        return $this->morphedByMany(Source::class, 'search_user_filterable');
    }

    public function languages()
    {
        return $this->morphedByMany(Language::class, 'search_user_filterable');
    }

    public function campaigns()
    {
        return $this->morphedByMany(Campaign::class, 'search_user_filterable');
    }

    public function markets()
    {
        return $this->morphedByMany(Market::class, 'search_user_filterable');
    }

    public function brokerages()
    {
        return $this->morphedByMany(Brokerage::class, 'search_user_filterable');
    }

    public function compensationPlans()
    {
        return $this->morphedByMany(CompensationPlan::class, 'search_user_filterable');
    }

    public function prospectStatuses()
    {
        return $this->morphedByMany(ProspectStatus::class, 'search_user_filterable');
    }

    public function leadStatuses()
    {
        return $this->morphedByMany(LeadStatus::class, 'search_user_filterable');
    }

    public function roleGroups()
    {
        return $this->morphedByMany(RoleGroup::class, 'search_user_filterable');
    }

    public function transactions()
    {
        return $this->morphedByMany(Transaction::class, 'search_user_filterable');
    }

    /**
     * The "booting" method of the model.
     *
     * @return void
     */
    protected static function boot()
    {
        parent::boot();

//        static::addGlobalScope(\App::make('App\Models\Scopes\LoggedInUserScope'));
    }
}
