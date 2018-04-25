<?php

namespace App\Repositories;

use Illuminate\Support\Facades\Auth;
use App\Contracts\Repositories\RoleGroupRepository as RoleGroupRepositoryContract;
use App\Models\Users\Roles\RoleGroup;

class RoleGroupRepository implements RoleGroupRepositoryContract
{
    /**
     * {@inheritdoc}
     */
    public function current()
    {
        die('RoleGroupRepository::current');
        if (Auth::check()) {
            return $this->find();
        }
    }

    public static function isRoleInRoleGroup($role_groups, $roles)
    {
        $rolegroup_ids = collect($roles)->pluck('rolegroup_id')->all();
        return !empty(RoleGroup::find($rolegroup_ids));
    }
}

