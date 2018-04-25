<?php




// API routes

//Route::group(['prefix' => 'api'], function () {
//    Route::get('users',['uses' =>'Users\UsersController@getUsers']);
////    Route::get('users', function ()    {
////        // Matches The "/admin/users" URL
////    });
//
//
////    Route::get('users/get/{id}/lead',['uses' =>'Users\UsersController@getLead']);
////    Route::get('users/get/{id}/leadUsers',['uses' =>'Users\UsersController@getLeadUsers']);
//});



// Notifications
//$router->get('/notifications/recent', 'NotificationController@recent');
//$router->put('/notifications/read', 'NotificationController@markAsRead');

// Security Settings...
//$router->put('/settings/password', 'Settings\Security\PasswordController@update');
//$router->post('/settings/two-factor-auth', 'Settings\Security\TwoFactorAuthController@enable');
//$router->delete('/settings/two-factor-auth', 'Settings\Security\TwoFactorAuthController@disable');

// API Settings
//$router->get('/settings/api/tokens', 'Settings\API\TokenController@all');
//$router->post('/settings/api/token', 'Settings\API\TokenController@store');
//$router->put('/settings/api/token/{token_id}', 'Settings\API\TokenController@update');
//$router->get('/settings/api/token/abilities', 'Settings\API\TokenAbilitiesController@all');
//$router->delete('/settings/api/token/{token_id}', 'Settings\API\TokenController@destroy');

// Impersonation
//$router->get('/users/impersonate/{id}', 'Users\ImpersonationController@impersonate');
//$router->get('/users/stop-impersonating', 'Users\ImpersonationController@stopImpersonating');

// Authentication
//$router->get('/', 'Auth\LoginController@showLoginForm')->name('login');
//$router->get('/login', 'Auth\LoginController@showLoginForm')->name('login');
//$router->post('/api/login', 'Auth\LoginController@login');
//$router->post('/login/refresh', 'Auth\LoginController@refresh');
//$router->post('/logout', ['uses' => 'Auth\LoginController@logout']);

// Two-Factor Authentication Routes
//$router->get('/login/token', 'Auth\LoginController@showTokenForm');
//$router->post('/login/token', 'Auth\LoginController@verifyToken');

// Two-Factor Emergency Token Login Routes
//$router->get('/login-via-emergency-token', 'Auth\EmergencyLoginController@showLoginForm');
//$router->post('/login-via-emergency-token', 'Auth\EmergencyLoginController@login');

//$router->post('/password/request', 'Auth\PasswordController@sendResetLinkEmail');
//$router->post('/password/reset', 'Auth\PasswordController@reset');
//
//Route::get('/mocks/contact-list', 'DashboardController@contactList');
//Route::get('/mocks/home', 'DashboardController@homeList');
//
//Route::get('/', 'DashboardController@show');
//
//Route::get('/api/get/user', 'Users\UsersController@getAuthedUser');
//
//Route::get('/api/users/get/{id}',['uses' =>'Users\UsersController@getUser']);
//Route::get('/api/users/get/{id}/lead',['uses' =>'Users\UsersController@getLead']);
//Route::get('/api/users/get/{id}/leadUsers',['uses' =>'Users\UsersController@getLeadUsers']);
//
//Route::get('/api/users/get/all/full/{pageStart}/{pageEnd}', ['uses' =>'Users\UsersController@getAllUsersFull']);
//Route::get('/api/users/get/all/search', ['uses' =>'Users\UsersController@searchAllUsers']);
//Route::get('/api/users/get/leads', ['uses' =>'Users\UsersController@getAllLeadUsers']);
//Route::get('/api/users/get/leads/search', ['uses' =>'Users\UsersController@searchAllLeadUsers']);
//Route::get('/api/users/get/leadreps', ['uses' =>'Users\UsersController@getAllBDRepUsers']);
//Route::get('/api/users/get/leadreps/search', ['uses' =>'Users\UsersController@searchAllBDRepUsers']);
//Route::get('/api/users/get/leadreps/search', ['uses' =>'Users\UsersController@searchAllBDRepUsers']);
//Route::get('/api/users/get/withleads/search', ['uses' =>'Users\UsersController@searchAllUsersWithLeads']);
//Route::get('/api/users/count', ['uses' => 'Users\UsersController@getUsersCount']);
//Route::delete('/api/user/delete/{id}', ['uses' => 'Users\UsersController@deleteUser']);
//Route::post('/api/users/delete', ['uses' => 'Users\UsersController@deleteUsers']);
//
//Route::get('/api/markets/get/all', 'Market\MarketController@getAllMarkets');
//
//Route::get('/api/tasks/get/all', ['uses' => 'Tasks\TasksController@getAll']);
//
//Route::get('/api/roles/get/all', 'Roles\RolesController@getRoles');
//
//Route::get('/api/modules/get/all', 'Module\ModuleController@getModules');
//
//Route::get('/api/permissions/matrix', 'Permissions\PermissionsController@getPermissionMatrix');
//Route::get('/api/permissions', 'Permissions\PermissionsController@getPermissions');
//Route::get('/api/permissions/set/{idRole}/{idPermission}/{grant}', 'Permissions\PermissionsController@setPermission');
//
//Route::get('/api/areaofspeciality/all', 'AreaOfSpeciality\AreaOfSpecialityController@getAll');
//Route::get('/api/campaign/all', 'Campaign\CampaignController@getAll');
//Route::get('/api/department/all', 'Department\DepartmentController@getAll');
//Route::get('/api/compensationplan/all', 'CompensationPlan\CompensationPlanController@getAll');
//Route::get('/api/leadstatus/all', 'LeadStatus\LeadStatusController@getAll');
//Route::get('/api/market/all', 'Market\MarketController@getAll');
//Route::get('/api/market/get/user/{id}', 'Market\MarketController@getUserMarkets');
//Route::get('/api/rolegroup/get/all', 'RoleGroup\RoleGroupController@getAll');
//Route::get('/api/rolegroup/all', 'RoleGroup\RoleGroupController@getAll');
//Route::get('/api/role/all', 'Role\RoleController@getAll');
//Route::get('/api/transactionstatus/all', 'TransactionStatus\TransactionStatusController@getAll');
//Route::get('/api/prospectstatus/all', 'ProspectStatus\ProspectStatusController@getAll');
//Route::get('/api/company/all', 'Company\CompanyController@getAll');
//Route::get('/api/language/all', 'Language\LanguageController@getAll');
//Route::get('/api/transaction/all', 'Transaction\TransactionController@getAll');
//
//Route::get('/api/brokerage/all', 'Brokerage\BrokerageController@getAll');
//Route::get('/api/brokerage/search', 'Brokerage\BrokerageController@searchBrokerages');
//
//Route::get('/api/source/all', 'Source\SourceController@getAll');

//Route::get('/api/filters/{id}', 'SearchUserFilter\SearchUserFilterController@getFilter');
//Route::get('/api/filters', 'SearchUserFilter\SearchUserFilterController@getAll');
//Route::post('/api/filters', 'SearchUserFilter\SearchUserFilterController@saveFilter');
