<?php

namespace App\Configuration;

use Illuminate\Support\Facades\Auth;

trait ProvidesScriptVariables
{
    /**
     * Get the default JavaScript variables for Spark.
     *
     * @return array
     */
    public static function scriptVariables()
    {
        return [
            'csrfToken' => csrf_token(),
            'env' => config('app.env'),
            'userId' => Auth::id()
        ];
    }
}
