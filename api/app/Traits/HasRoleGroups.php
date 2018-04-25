<?php

namespace App\Traits;

trait HasRoleGroups
{
    /**
     * Check if model has a role group.
     *
     * @return bool
     */
    public function hasRoleGroup()
    {
        return (bool)$this->rolegroups()->count();
    }

    /**
     * Add a role group to this model.
     *
     * @param Role Group $role_group
     * @return mixed
     */
    public function addRoleGroup(RoleGroup $rolegroup)
    {
        return $this->rolegroups()->attach($rolegroup->id) && $this->touch();
    }

    /**
     * Removes association for this model for given role group.
     *
     * @param RoleGroup $rolegroup
     * @return bool
     */
    public function deleteRoleGroup(RoleGroup $rolegroup)
    {
        return $this->rolegroups()->detach($rolegroup->id);
    }

    /**
     * Removes all association for this model for role group.
     *
     * @return bool
     */
    public function flushRoleGroups()
    {
        return $this->rolegroups()->detach();
    }

    /**
     * Get the roles for the role group.
     */
    public function roles()
    {
        return $this->hasMany(Role::class);
    }

    public function rolegroupable()
    {
        return $this->morphTo();
    }
}
