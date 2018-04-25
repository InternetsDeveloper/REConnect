<?php

namespace App\Providers\System;

use App\REConnected;
use App\TokenGuard;
use Illuminate\Support\Facades\Auth;
use Intervention\Image\ImageManager;
use Illuminate\Support\Facades\Route;
use Illuminate\Support\ServiceProvider;
use Illuminate\Support\Facades\Validator;
use Laravel\Spark\Validation\StateValidator;
use Laravel\Spark\Validation\VatIdValidator;
use Laravel\Spark\Validation\CountryValidator;
use Laravel\Spark\Console\Commands\InstallCommand;
use Laravel\Spark\Console\Commands\UpdateCommand;
use Laravel\Spark\Console\Commands\VersionCommand;
use Laravel\Spark\Console\Commands\UpdateViewsCommand;
use Laravel\Spark\Console\Commands\StorePerformanceIndicatorsCommand;

class REConnectedServiceProvider extends AppServiceProvider
{
    /**
     * Finish configuring Spark for the application.
     *
     * @return void
     */
    public function booted()
    {

    }

    /**
     * Boot the service provider.
     *
     * @return void
     */
    public function boot()
    {
        $this->app->bind('App\Models\Scopes\LoggedInUserScope', function ($app) {
            return new \App\Models\Scopes\LoggedInUserScope();
        });

//        Auth::viaRequest('reconnected', function ($request) {
//            return app(TokenGuard::class)->user($request);
//        });
    }

    /**
     * Register the service provider.
     *
     * @return void
     */
    public function register()
    {
        $this->registerServices();
    }

    /**
     * Register the Spark services.
     *
     * @return void
     */
    protected function registerServices()
    {

//        $this->registerAuthyService();
//
//        $this->registerInterventionService();
//
//        $this->registerApiTokenRepository();

        $services = [
//            'Contracts\Repositories\AnnouncementRepository' => 'Repositories\AnnouncementRepository',
//            'Contracts\Repositories\NotificationRepository' => 'Repositories\NotificationRepository',
//            'Contracts\Repositories\UserRepository' => 'Repositories\UserRepository',
//            'Contracts\InitialFrontendState' => 'InitialFrontendState',
//            'Contracts\Interactions\Auth\CreateUser' => 'Interactions\Auth\CreateUser',
//            'Contracts\Interactions\Auth\Register' => 'Interactions\Auth\Register',
//            'Contracts\Interactions\Settings\Profile\UpdateContactInformation' => 'Interactions\Settings\Profile\UpdateContactInformation',
//            'Contracts\Interactions\Settings\Security\EnableTwoFactorAuth' => 'Interactions\Settings\Security\EnableTwoFactorAuthUsingAuthy',
//            'Contracts\Interactions\Settings\Security\VerifyTwoFactorAuthToken' => 'Interactions\Settings\Security\VerifyTwoFactorAuthTokenUsingAuthy',
//            'Contracts\Interactions\Settings\Security\DisableTwoFactorAuth' => 'Interactions\Settings\Security\DisableTwoFactorAuthUsingAuthy'
        ];

        foreach ($services as $key => $value) {
            $this->app->singleton('App\\'.$key, 'App\\'.$value);
        }
    }

    /**
     * Register the Authy service.
     *
     * @return void
     */
    protected function registerAuthyService()
    {
        $this->app->when('App\Providers\Services\Security\Authy')
            ->needs('$key')
            ->give(function () {
                return config('services.authy.secret');
            });
    }

    /**
     * Register the Intervention image manager binding.
     *
     * @return void
     */
    protected function registerInterventionService()
    {
        $this->app->bind(ImageManager::class, function () {
            return new ImageManager(['driver' => 'gd']);
        });
    }

    /**
     * Register the Api Token repository.
     *
     * @return void
     */
    private function registerApiTokenRepository()
    {
        $concrete = class_exists('Laravel\Passport\Passport')
            ? 'App\Repositories\PassportTokenRepository'
            : 'App\Repositories\TokenRepository';

        $this->app->singleton('App\Contracts\Repositories\TokenRepository', $concrete);
    }
}
