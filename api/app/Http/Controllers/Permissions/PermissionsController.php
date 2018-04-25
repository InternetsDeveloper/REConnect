<?php

namespace App\Http\Controllers\Permissions;

use App\Http\Controllers\Controller;
use App\Models\Permissions\Permission;

class PermissionsController extends Controller {

    /**
     * Create a new controller instance.
     *
     * @return void
     */
    public function __construct() {

    }

    public function getPermissionMatrix()
    {
        $roles = Role::all('id', 'display_name');
        $permissions = Permission::all('id', 'name', 'display_name', 'module_id');
        foreach ($permissions as $permission) {
            foreach ($roles as $role) {

                $role_permissions[$permission['module_id']][$role['id']][$permission['id']] = array(
                    'idModule' => $permission['module_id'],
                    'idRole' => $role['id'],
                    'idPermission' => $permission['id'],
                    'name' => $permission['display_name'],
                    'granted' => false);
//                    'granted' => $role->hasPermissionTo($permission['name']));
            }
        }

        return response()->json($role_permissions);
    }

    public function setPermission($idRole, $idPermission, $grant) {

        if ($grant != 'true' && $grant != 'false') {
            return response()->toJson([
                'message' => 'Invalid grant status',
            ], 404);
        }

        $role = Role::find($idRole);
        if (empty($role)) {
            return response()->toJson([
                'message' => 'Role not found',
            ], 404);
        }

        $permission = Permission::find($idPermission);
        if (empty($permission)) {
            return response()->toJson([
                'message' => 'Permission not found',
            ], 404);
        }

        if ($grant == 'true') {
            if(!$role->hasPermissionTo($permission)) {
                $res = $role->givePermissionTo($permission);
            }
            else {
                return response()->toJson([
                    'message' => 'Permission was already granted',
                ], 500);
            }
        }
        else {
            $res = $role->revokePermissionTo($permission);
        }

        if (empty($res)) {
            return response()->toJson([
                'message' => 'System error updating permission',
            ], 500);
        }

        if ($grant == 'true')
            $action = ' granted to ';
        else
            $action = ' revoked from ';

        return response()->json($permission->display_name .$action . $role->display_name, 200);
    }
}
