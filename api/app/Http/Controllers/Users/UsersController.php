<?php

namespace App\Http\Controllers\Users;

use Illuminate\Auth\AuthManager;
use App\Models\System\REConnected;
use Carbon\Carbon;
use Illuminate\Support\Facades\Log;
use App\Http\Controllers\Controller;
use App\Models\Users\User;
use App\Models\Users\Roles\RoleGroup;
use App\Models\Users\Roles\Role;
use App\Models\Note;
use App\Repositories\UserRepository;
use Illuminate\Http\Request;
use Psy\Util\Json;
use Illuminate\Http\Response;
use Dingo\Api\Routing\Helpers;

class UsersController extends Controller
{

    use Helpers;

    /**
     * Create a new controller instance.
     *
     */
    public function __construct()
    {

    }

    public function getAuthedUser()
    {

        return response()->json(auth()->id());
    }

    public function index()
    {
//        \DB::enableQueryLog();

        $users = User::get(['id', 'name', 'email', 'age', 'gender', 'email_subscribed', 'insurance_expiration', 'license_expiration',
                            'start_date', 'photo_url', 'company_id', 'area_of_speciality_id', 'compensation_plan_id', 'source_id', 'lead_status_id',
                            'prospect_status_id', 'lead_id', 'created_by', 'rep_id', 'assigned_lead_date', 'assigned_rep_date']);

        $users->load(['markets' => function($query) {
            $query->select('market_id', 'display_name');
        }]);

        $users->load(['roles' => function($query) {
            $query->with(['rolegroup' => function($sub) {
                $sub->select('rolegroups.id', 'rolegroups.display_name');
            }]);
            $query->select('roles.id', 'roles.display_name', 'roles.rolegroup_id');
        }]);

        $users->load(['company' => function($query) {
            $query->select('id', 'display_name');
        }]);

        $users->load(['areaOfSpeciality' => function($query) {
            $query->select('id', 'display_name');
        }]);

        $users->load(['compensationPlan' => function($query) {
            $query->select('id', 'display_name');
        }]);

        $users->load(['source' => function($query) {
            $query->select('id', 'display_name');
        }]);

        $users->load(['languages' => function($query) {
            $query->select('id', 'display_name');
        }]);

        $users->load(['departments' => function($query) {
            $query->select('department_id', 'display_name');
        }]);

        $users->load(['campaigns' => function($query) {
            $query->select('campaign_id', 'name');
        }]);

        $users->load(['createdBy' => function($query) {
            $query->select('id', 'name', 'email');
        }]);

        $users->load(['lead' => function($query) {
            $query->select('id', 'name', 'email');
        }]);

        $users->load(['leadStatus' => function($query) {
            $query->select('id', 'display_name', 'description');
        }]);

        $users->load(['prospectStatus' => function($query) {
            $query->select('id', 'display_name', 'description');
        }]);

        $users->load(['rep' => function($query) {
            $query->select('id', 'name', 'email');
        }]);

        $users->load('repUsers');

        $users->load('addresses');

//        dd(\DB::getQueryLog());
      
        return new \Dingo\Api\Http\Response($users, 200);
    }

    public function delete(Request $request)
    {
        $ids = json_decode($request->data);
        $users = User::whereIn('id', $ids)->delete();

        return new \Dingo\Api\Http\Response($users, 200);
    }

    public function show($id)
    {
        return new \Dingo\Api\Http\Response(User::findOrFail($id), 200);
    }

    public function getUsers(User $user)
    {
        $users = User::where('id', '=', $user->id)->get();
        print_r($users);
        return response()->json($users);
    }

    public function searchAllUsers(Request $request)
    {
        $users = User::with('roles')
            ->where('name', 'like', "%{$request->query('name')}%")
            ->where('created_by', '=', auth()->id())
            ->where('id', '!=', auth()->id())
            ->get();

        return response()->json($users);
    }

    public function getAllUsersFull($offset, $limit)
    {
        $users = User::with('markets', 'lead', 'roles.rolegroup')
            ->where('created_by', '=', auth()->id())
            ->where('id', '!=', auth()->id())
            ->offset($offset)
            ->limit($limit)
            ->get();

        return response()->json($users);
    }

    public function getAllLeadUsers()
    {
        $users = User::whereIn('id', function ($query) {
            $query->select('lead_id')->distinct()->from('users');
        })
            ->where('created_by', '=', auth()->id())
            ->get();

        return response()->json($users);
    }

    public function searchAllLeadUsers(Request $request)
    {
        $searchParam = $request->query('name');
        $users = User::whereIn('id', function ($query) {
            $query->select('lead_id')->distinct()->from('users');
        })
            ->where('name', 'like', "%{$searchParam}%")
            ->where('created_by', '=', auth()->id())
            ->get();

        return response()->json($users);
    }

    public function getAllBDRepUsers()
    {
        $users = User::whereIn('id', function ($query) {
            $query->select('rep_id')->distinct()->from('users');
        })
            ->where('created_by', '=', auth()->id())
            ->get();

        return response()->json($users);
    }

    public function searchAllBDRepUsers(Request $request)
    {
        $searchParam = $request->query('name');
        $users = User::whereIn('id', function ($query) {
            $query->select('rep_id')->distinct()->from('users');
        })
            ->where('name', 'like', "%{$searchParam}%")
            ->where('created_by', '=', auth()->id())
            ->get();

        return response()->json($users);
    }

    public function getAllUsersWithLeads()
    {
        $users = User::whereNotNull('lead_id')
            ->where('created_by', '=', auth()->id())
            ->get();
        return response()->json($users);
    }

    public function searchAllUsersWithLeads(Request $request)
    {
        $users = User::where([
            ['name', 'like', "%{$request->query('name')}%"],
            ['lead_id', '>=', '0']
        ])
            ->where('created_by', '=', auth()->id())
            ->get();
        return response()->json($users);
    }

    public function getUsersCount(User $user)
    {
        $usersCount = $user->where('created_by', '=', auth()->id())->count();

        return response()->json($usersCount);
    }

    public function deleteUser($id)
    {
        $user = User::find($id)->where('created_by', '=', auth()->id());
        $user->delete();
        return response('Deleted user', 200);
    }

    public function deleteUsers(Request $request)
    {

        $users = User::whereIn('id', $request->data)
            ->where('created_by', '=', auth()->id())
            ->where('id', '!=', auth()->id())
            ->delete();
        if (!$users) {
            return response('Could not Delete Users', 500);
        } else {
            return response('Users Deleted', 200);
        }
    }

    public function setPermission($idRole, $idPermission, $grant)
    {

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
            if (!$role->hasPermissionTo($permission)) {
                $res = $role->givePermissionTo($permission);
            } else {
                return response()->toJson([
                    'message' => 'Permission was already granted',
                ], 500);
            }
        } else {
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

        return response()->json($permission->display_name . $action . $role->display_name, 200);
    }

    public function addNote($id)
    {
        $user = User::find($id)->where('created_by', '=', auth()->id());
        $user->save();

        $note = User::find($id)->where('created_by', '=', auth()->id());
        $note->add();


        return response('Note added for ' . $id, 200);
    }
}
