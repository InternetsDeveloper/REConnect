<?php

namespace App\Contracts\Repositories;

interface RoleGroupRepository
{
    /**
     * Get the current user's of the application.
     *
     * @return \Illuminate\Contracts\Auth\Authenticatable|null
     */
    public function current();

    public static function isRoleInRoleGroup($role_groups, $roles);
}
