<?php

namespace App\Traits;

trait REConnectedUserstamps
{
    /**
     * Get the class being used to provide a User.
     *
     * @return string
     */
    protected function getUserClass()
    {
        if (get_class(auth()) === 'App\User') {
            return auth()->getProvider()->getModel();
        }
        return auth()->guard()->getProvider()->getModel();
    }
}