<?php

namespace App\Validation\Validators;

use App\Validation\ItemValidator;
use App\Models\Users\Roles\RoleGroup;
use App\Repositories\RoleGroupRepository;
use App\Validation\Validators\Exceptions\RoleNotFoundException;

class RoleGroupValidator extends ItemValidator
{
    /**
     * Set the validation error message.
     *
     * @return string
     */
    public static function messageRolegroupIsLead()
    {
        return "Role Group is not a lead";
    }

    public function validateRolegroupIsLead($attribute, $roles, $params, $validator)
    {
        $lead_groups = RoleGroup::$lead_roles_groups;

        $role_groups_are_leads = RoleGroupRepository::isRoleInRoleGroup($lead_groups, $roles);

        return $role_groups_are_leads;
    }

    public function validateRolegroupIsRep($attribute, $roles, $params, $validator)
    {
        $rep_groups = RoleGroup::$lead_rep_groups;

        $role_groups_are_reps = RoleGroupRepository::isInRoleGroup($rep_groups, $roles);

        return $role_groups_are_reps;
    }

//    public function sanitizeRolegroupIsLead($values)
//    {
//        return $this->stripRoles($values);
//    }
//
//    public function sanitizeRolegroupIsRep($values)
//    {
//        return $this->stripRoles($values);
//    }
//
//    protected function stripRoles($values)
//    {
//        if(!array($values))
//            $values = [$values];
//
//        $roles = [];
//        for($i = 0; $i < count($values); $i++) {
//            if(!isset($values[$i]['name'])) {
//                throw new RoleNotFoundException("Role must have name value");
//            }
//            if(!isset($values[$i]['rolegroup_id'])) {
//                throw new RoleNotFoundException("Role must have name role group id");
//            }
//            $roles[] = array('name' => filter_var($values[$i]['name'], FILTER_SANITIZE_STRING, FILTER_FLAG_STRIP_LOW),
//                'rolegroup_id' => $values[$i]['rolegroup_id']);
//        }
//
//        return $roles;
//    }
}
