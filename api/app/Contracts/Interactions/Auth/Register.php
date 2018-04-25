<?php

namespace App\Contracts\Interactions\Auth;

use App\Contracts\Http\Requests\Auth\RegisterRequest;

interface Register
{
    /**
     * Register a new user with the application.
     *
     * @param  \App\Http\Requests\Auth\RegisterRequest  $request
     * @return \Illuminate\Contracts\Auth\Authenticatable
     */
    public function handle(RegisterRequest $request);
}
