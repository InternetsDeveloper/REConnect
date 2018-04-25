<?php

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register the API routes for your application as
| the routes are automatically authenticated using the API guard and
| loaded automatically by this application's RouteServiceProvider.
|
*/

//Route::group([
//    'middleware' => 'auth:api'
//], function () {
//    //
//});
//
//Route::group(['prefix' => 'api'], function () {
//  Route::get('/tasks', 'API\TaskController@all');
//  Route::post('/task', 'API\TaskController@store');
//  Route::delete('/task/{task}', 'API\TaskController@destroy');
//
//  Route::get('/activity', 'API\ActivityController@all');
//});

//Route::group(['prefix' => 'api', 'middleware' => 'auth:api'], function () {
//
//    Route::get('/filters/{id}', 'SearchUserFilter\SearchUserFilterController@getFilter');
//    Route::get('/filters', 'SearchUserFilter\SearchUserFilterController@getAll');
//    Route::post('/filters', 'SearchUserFilter\SearchUserFilterController@saveFilter');
//});

/** @var Router $api */
$api = app('Dingo\Api\Routing\Router');


$api->version('v1', function ($api) {
    //USER ROUTES
    $api->get('users', 'App\Http\Controllers\Users\UsersController@index');
    $api->get('users/{id}', 'App\Http\Controllers\Users\UsersController@show');
    $api->delete('users/{data}', 'App\Http\Controllers\Users\UsersController@delete');
    $api->post('users', 'App\Http\Controllers\Users\UsersController@importUsers');
    $api->post('usersDoImport', 'App\Http\Controllers\Users\UsersController@importUsersDoIt');

    //NOTE ROUTES
    $api->post('note', 'App\Http\Controllers\Note\NoteController@create');
//    $api->delete('users/{data}', 'App\Http\Controllers\Users\UsersController@deleteMany');
//    $api->post('auth/login', 'App\Api\V1\Controllers\AuthController@login');
//    $api->post('auth/signup', 'App\Api\V1\Controllers\AuthController@signup');
});

//Route::get('filters/{id}', 'Users\SearchUserFilterController@getFilter');
//Route::get('filters', 'Users\SearchUserFilterController@getAll');
//Route::post('filters', 'Users\SearchUserFilterController@saveFilter');

//Route::group(['prefix' => 'api'], function () {
//
//    Route::get('filters/{id}', 'SearchUserFilter\SearchUserFilterController@getFilter');
//    Route::get('filters', 'SearchUserFilter\SearchUserFilterController@getAll');
//    Route::post('filters', 'SearchUserFilter\SearchUserFilterController@saveFilter');
//});