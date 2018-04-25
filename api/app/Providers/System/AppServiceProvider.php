<?php

namespace App\Providers\System;

use Illuminate\Support\ServiceProvider;
use Illuminate\Database\Eloquent\Relations\Relation as Relation;

class AppServiceProvider extends ServiceProvider
{
    /**
     * Bootstrap any application services.
     *
     * @return void
     */
    public function boot()
    {
        Relation::morphMap([
            'users' => 'App\Models\Users\User'
        ]);
    }

    /**
     * Register any application services.
     *
     * @return void
     */
    public function register()
    {
      if ($this->app->environment() !== 'production') {
          $this->app->register(\Barryvdh\Debugbar\ServiceProvider::class); // Laravel Debugbar https://github.com/barryvdh/laravel-debugbar
          $this->app->register(\Barryvdh\LaravelIdeHelper\IdeHelperServiceProvider::class); // Laravel IDE helper https://github.com/barryvdh/laravel-ide-helper
      }
    }
}
