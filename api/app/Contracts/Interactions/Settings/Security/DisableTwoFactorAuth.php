<?php

namespace App\Contracts\Interactions\Settings\Security;

interface DisableTwoFactorAuth
{
    /**
     * Disable two-factor authentication for the given user.
     *
     * @param  \Illuminate\Contracts\Auth\Authenticatable  $user
     * @return \Illuminate\Contracts\Auth\Authenticatable
     */
    public function handle($user);
}
