<?php

use Illuminate\Database\Seeder;

class PermissionsSeeder extends CsvSeeder {

     public function __construct() {
         $this->table = 'permissions';
         $this->filename = base_path() . 'databse/seeds/csvs/permissions.csv';
         $this->csv_delimiter = '|';
     }

     public function run() {

         // Recommended when importing larger CSVs
         DB::disableQueryLog();

         // Uncomment the below to wipe the table clean before populating
         DB::table($this->table)->delete();

         $this->seedFromCSV($this->filename, $this->csv_delimiter);
     }

     public function createPermission($data) {

     }

     public function seedFromCSV($filename, $delimnator = ',') {
         $handle = $this->openCSV($filename);

         //CSV doesn't exist or couldn't be read from.
         if ($handle === FALSE) {
             return [];
         }

         $header = NULL;
         $row_count = 0;
         $data = [];
         $mapping = $this->mapping ?: [];
         $offset = $this->offset_rows;


        $db_modules = Module::all('id', 'name')->whereIn('name', $module_names);
        $db_permissions = Permission::all('id', 'name')->whereIn('name', $permission_names);
        $db_roles = Role::all('id', 'name')->whereIn('name', $role_names);

        // create modules array indexed by name
        foreach ($db_modules as $module) {
            $modules[$module['attributes']['name']] = $module['attributes']['id'];
        }

     }
 }

//class PermissionsSeeder extends Seeder {
//
//    public function run() {
//        // get permissions config
//
//        $permissions_config = config('permissions.permissions');
//        // establish variables for all permissions, roles and modules in the config
//        // indexed by name
//
//        for ($i = 0; $i < count($permissions_config); $i++) {
//            $module_names[$permissions_config[$i]['module_name']] = $permissions_config[$i]['module_name'];
//            $permission_names[$permissions_config[$i]['name']] = $permissions_config[$i]['name'];
//            if(!empty($permissions_config[$i]['roles'])) {
//                for ($z = 0; $z < count($permissions_config[$i]['roles']); $z++) {
//                    $role_names[$permissions_config[$i]['roles'][$z]] = $permissions_config[$i]['roles'][$z];
//                }
//            }
//        }
//        // return all pre-existing roles, permissions & modules in the db
//        // based on config scalers
//
//        $db_modules = Module::all('id', 'name')->whereIn('name', $module_names);
//        $db_permissions = Permission::all('id', 'name')->whereIn('name', $permission_names);
//        $db_roles = Role::all('id', 'name')->whereIn('name', $role_names);
//
//        // create modules array indexed by name
//        foreach ($db_modules as $module) {
//            $modules[$module['attributes']['name']] = $module['attributes']['id'];
//        }
//
//        // PSUDEO-CODE
//        // loop through permissions config array
//        // check if permission exists
//        // if it does continue
//        // else check if the modules defined in the config exists in the db
//        // if it does not throw exception
//        // check if the roles defined in the config exist in the db
//        // if it does not throw an exception
//        // create permissions
//        // for the current permissions get relevant roles
//        // iterate through relevant roles
//        // validate that returned db role
//        // assign permissions to role
//
//        foreach($permissions_config as $permission) {
//            if ($db_permissions->contains($permission['module_name'])) {
//                continue;
//            } elseif (!isset($modules[$permission['module_name']])) {
//                throw new Exception('The module ' . $permission['module_name'] .  ' does not exist.');
//            } else {
//                foreach ($permission['roles'] as $role) {
//                    if (!$db_roles->contains('name' ,$role)) {
//                        throw new Exception ('The role ' . $role . ' does not exist.');
//                    }
//                }
//
//                if (!$permission = App\Permission::create($permission)) {
//                    return FALSE;
//                }
//
//                foreach ($permission['roles'] as $role) {
//
//                    $assignable_role_collection = $db_roles->where('name',$role);
//                    if(empty($assignable_role_collection) or count($assignable_role_collection) > 1) {
//                        throw new Exception('There is something wrong with the roles assigned to this permission, check the permission config for ' . $role . ' .');
//                    }
//                    $assignable_role = $assignable_role_collection->first();
//                    $assignable_role->givePermissionTo($permission['name']);
//                }
//            }
//        }
//    }
//}