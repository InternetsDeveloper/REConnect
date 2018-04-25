<?php

namespace App\Models\Users;

use App\Models\Marketing\Campaign;
use App\Models\Model as REConnectedModel;
use Laravel\Passport\HasApiTokens;
use App\Models\CompensationPlans\CompensationPlan;
use App\Models\PhoneNumber;
use App\Models\Language;
use App\Models\Tasks\Task;
use App\Models\Transactions\Transaction;
use App\Models\Users\Roles\RoleGroup;
use App\Models\Users\SearchUserFilter;
use Illuminate\Support\Facades\Validator;
use App\Traits\HasBrokerages;
use Dompdf\Exception;
use Illuminate\Auth\Authenticatable;
use Illuminate\Auth\Passwords\CanResetPassword;
use Illuminate\Foundation\Auth\Access\Authorizable;
use Illuminate\Contracts\Auth\Authenticatable as AuthenticatableContract;
use Illuminate\Contracts\Auth\Access\Authorizable as AuthorizableContract;
use Illuminate\Contracts\Auth\CanResetPassword as CanResetPasswordContract;
use Illuminate\Notifications\Notifiable;
use App\Traits\HasRoles;
use App\Traits\HasAddresses;
use App\Traits\HasPhoneNumbers;
use App\Traits\HasMarkets;
use App\Traits\HasCompensationPlan;
use App\Traits\HasCampaigns;
use App\Traits\HasCompany;
use App\Traits\HasAreaOfSpeciality;
use App\Traits\HasTasks;
use App\Traits\HasDepartments;
use App\Traits\HasNotes;
//use App\Traits\HasCards;
use Carbon\Carbon;


class User extends REConnectedModel implements AuthenticatableContract, AuthorizableContract, CanResetPasswordContract
{
    use Authenticatable;
    use Authorizable;
    use CanResetPassword;
    use Notifiable;
    use HasApiTokens;
    use HasRoles;
    use HasAddresses;
    use HasPhoneNumbers;
    use HasMarkets;
    use HasTasks;
    use HasCompensationPlan;
    use HasCampaigns;
    use HasCompany;
    use HasAreaOfSpeciality;
    use HasDepartments;
    use HasBrokerages;
    use HasNotes;

    protected $table = 'users';

    public static $non_staff_role_groups = ['buyer','seller','tenant', 'landlord'];

    public static $staff_role_groups = ['bd_staff','bd_manager','adsupr'];
    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'name',
        'email',
        'age',
        'gender',
        'photo_url',
        'compensation_plan_id',
        'email_subscribed',
        'insurance_expiration',
        'license_expiration',
        'start_date'
    ];

    /**
     * The attributes excluded from the model's JSON form.
     *
     * @var array
     */
    protected $hidden = [
        'password',
        'remember_token',
        'authy_id'
    ];

    protected $dates = ['created_at', 'updated_at', 'deleted_at'];

    /**
     * The attributes that should be cast to native types.
     *
     * @var array
     */
    protected $casts = [
        'uses_two_factor_auth' => 'boolean',
    ];

    /**
     * Associate phone numbers to users
     *
     * @return \Illuminate\Database\Eloquent\Relations\MorphMany
     */
    public function phonenumbers()
    {
        return $this->morphMany(PhoneNumber::class, 'phonenumberable');
    }

    /**
     * Associate departments to users
     *
     * @return \Illuminate\Database\Eloquent\Relations\MorphToMany
     */
    public function departments()
    {
        return $this->morphToMany(Department::class, 'departmentable');
    }

    /**
     * Get all of the campaigns that are assigned this user.
     *
     * @return \Illuminate\Database\Eloquent\Relations\MorphToMany
     */
    public function campaigns()
    {
        return $this->morphToMany(Campaign::class, 'campaignable');
    }

    /**
     * Associate departments to users
     *
     * @return \Illuminate\Database\Eloquent\Relations\MorphToMany
     */
    public function tasks()
    {
        return $this->morphToMany(Task::class, 'taskable');
    }

    /**
     * Associate compensation plans to users
     *
     * @return \Illuminate\Database\Eloquent\Relations\BelongsTo
     */
    public function compensationPlan()
    {
        return $this->belongsTo(CompensationPlan::class);
    }

    /**
     * Associate prospect status to users
     *
     * @return \Illuminate\Database\Eloquent\Relations\BelongsTo
     */
    public function prospectStatus()
    {
        return $this->belongsTo(ProspectStatus::class);
    }

    public function assignProspectStatus(ProspectStatus $prospectStatus)
    {
        $hasValidRoleGroup = $this->isInRoleGroup($this, Self::$non_staff_role_groups);
        if(!$hasValidRoleGroup){
            $rolesStr = implode(', ', Self::$non_staff_role_groups);
            throw new Exception("Role Group for must be of {$rolesStr} to have prospect status");
        }

        return $this->prospectStatus()->associate($prospectStatus);
    }

    public function source()
    {
        return $this->belongsTo(Source::class);
    }

    public function addSource(Source $source)
    {
        $validator = Validator::make(
            ['roles' => $this->roles->toArray()],
            ['roles' => 'rolegroup_is_lead'],
            ['roles' => 'Does not have a lead Role Group']);

        if(!$validator->validate(false))
            throw new Exception($validator->messages());

        return $this->source()->associate($source);
    }

    /**
     * Associate user to have a lead (self referential)
     *
     * @return \Illuminate\Database\Eloquent\Relations\BelongsTo
     */
    public function lead()
    {
        return $this->belongsTo(User::class, 'lead_id', 'id');
    }

    /**
     * Gets users that are leads for this user
     *
     * @return \Illuminate\Database\Eloquent\Relations\HasMany
     */
    public function leads()
    {
        return $this->hasMany(User::class, 'lead_id', 'id');
    }

    /**
     * Set the lead on a user
     *
     * @param \App\User $assign_to
     * @return \Illuminate\Database\Eloquent\Model
     * @throws \Exception
     */
    public function assignLead(User $assign_to)
    {
        if($this->lead_id > 0){
            throw new \Exception('Lead already assigned');
        }

        $hasValidRoleGroup = self::isInRoleGroup($this, Self::$non_staff_role_groups);
        if(!$hasValidRoleGroup){
            $rolesStr = implode(', ', Self::$non_staff_role_groups);
            throw new Exception("Role Group for lead must be of {$rolesStr}");
        }

        $this->assigned_lead_date = Carbon::now()->format('Y-m-d H:i:s');
        $this->save();
        
        return $this->lead()->associate($assign_to);
    }

    /**
     * Associate lead statuses to users
     *
     * @return \Illuminate\Database\Eloquent\Relations\BelongsTo
     */
    public function leadStatus()
    {
        return $this->belongsTo(LeadStatus::class);
    }

    /**
     * Set the lead status on a user
     *
     * @param \App\Models\Users\LeadStatus $leadStatus
     * @return mixed
     */
    public function assignLeadStatus(LeadStatus $leadStatus)
    {
        //TODO VALIDATE ROLE GROUP

        return $this->leadStatus()->associate($leadStatus);
    }

    /**
     * Associate user to have a rep (self referential)
     *
     * @return \Illuminate\Database\Eloquent\Relations\BelongsTo
     */
    public function rep()
    {
        return $this->belongsTo(User::class, 'rep_id');
    }

    /**
     * Get all associated user that this rep has
     *
     * @return \Illuminate\Database\Eloquent\Relations\HasMany
     */
    public function repUsers()
    {
        return $this->hasMany(User::class, 'rep_id', 'id');
    }

    /**
     *
     * @return \Illuminate\Database\Eloquent\Relations\BelongsTo
     */
    public function createdBy()
    {
        return $this->belongsTo(User::class, 'created_by');
    }

    /**
     * Set the rep on a user
     *
     * @param \App\User $assign_to
     * @return \Illuminate\Database\Eloquent\Model
     * @throws \Exception
     */
    public function assignRep(User $assign_to)
    {
        if($this->rep_id > 0){
            throw new \Exception('Rep already assigned');
        }

        $hasValidRoleGroup = self::isInRoleGroup($this, Self::$non_staff_role_groups);
        if(!$hasValidRoleGroup){
            $rolesStr = implode(', ', Self::$non_staff_role_groups);
            throw new Exception("Role Group for rep must be of {$rolesStr}");
        }

        $this->assigned_rep_date = Carbon::now()->format('Y-m-d H:i:s');
        $this->save();

        return $this->rep()->associate($assign_to);
    }

    /**
     * Associate SearchUserFilters to users
     *
     * @return \Illuminate\Database\Eloquent\Relations\HasMany
     */
    public function searchUserFilters()
    {
        return $this->hasMany(SearchUserFilter::class);
    }

    public function addSearchUserFilter(SearchUserFilter $filter)
    {
        return $this->searchUserFilters()->save($filter);
    }

    public function userCompanies()
    {
        return $this->belongsToMany(UserCompany::class);
    }

    public function transactions()
    {
        return $this->hasMany(Transaction::class);
    }

    public function addTransaction($transaction_data)
    {
        $this->transactions()->create($transaction_data);

        return $this->save();
    }

    public function languages()
    {
        return $this->belongsToMany(Language::class, 'user_language')->withTimestamps();
    }

    public function addLanguage($language) {
        $this->languages()->save($language);
    }

    /**
     * Get the profile photo URL attribute.
     *
     * @param  string|null  $value
     * @return string|null
     */
    public function getPhotoUrlAttribute($value)
    {
        return empty($value) ? '' : url($value);
    }

    /**
     * Make the team user visible for the current user.
     *
     * @return $this
     */
    public function shouldHaveSelfVisibility()
    {
        return $this->makeVisible(['uses_two_factor_auth']);
    }


    public static function isInRoleGroup($user, array $validRoleGroups)
    {
        $hasValidRoleGroup = false;

        foreach($user->roles as $role){
            if(in_array(RoleGroup::find($role->rolegroup_id)->system_name, $validRoleGroups)){
                $hasValidRoleGroup = true;
                break;
            }
        }

        return $hasValidRoleGroup;
    }

    /**
     * Convert the model instance to an array.
     *
     * @return array
     */
    public function toArray()
    {
        $array = parent::toArray();

//        if (! in_array('tax_rate', $this->hidden)) {
//            $array['tax_rate'] = $this->taxPercentage();
//        }

        return $array;
    }
}

