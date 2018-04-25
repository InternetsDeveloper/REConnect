<?php

namespace App\Models\Users\Roles;

use App\Models\Model as REConnectedModel;
use App\Traits\HasRoles;
use App\Traits\IsSearchUserFilterField;
use Illuminate\Notifications\Notifiable;
use Sarav\Traits\CacheHandler;

class RoleGroup extends REConnectedModel
{
    use IsSearchUserFilterField;
    use HasRoles;
    use Notifiable;
    use CacheHandler;

    protected $individualCache = false;
    protected $cacheAll = true;
    protected $cacheName = 'rolegroups';

    public static $lead_roles_groups = ['buyer','seller','tenant', 'landlord'];

    protected $table = 'rolegroups';

    /**
     * @inheritdoc
     */
    protected $fillable = [
        'system_name',
        'display_name',
        'description'
    ];

    /**
     * @inheritdoc
     */
    protected $hidden = [];

    /**
     * @inheritdoc
     */
    protected $dates = ['created_at', 'updated_at', 'deleted_at'];

    public function isInRoleGroup(array $validRoleGroups)
    {
        $hasValidRoleGroup = false;

        foreach($this->roles as $role){
            if(in_array(RoleGroup::find($role->rolegroup_id)->system_name, $validRoleGroups)){
                $hasValidRoleGroup = true;
                break;
            }
        }

        return $hasValidRoleGroup;
    }

    /**
     * Get the roles for the role group.
     */
    public function roles()
    {
        return $this->hasMany(Role::class, 'rolegroup_id');
    }

    public function rolegroupable()
    {
        return $this->morphTo();
    }
}
