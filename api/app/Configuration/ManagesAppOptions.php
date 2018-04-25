<?php

namespace App\Configuration;

trait ManagesAppOptions
{
    /**
     * Minimum length a user given password can be.
     *
     * @var string
     */
    public static $minimumPasswordLength = 8;

    /**
     * Where to redirect users after authentication.
     *
     * @var string
     */
    public static $afterLoginRedirectTo = '/dashboard';

    /**
     * Where to redirect users starting impersonation.
     *
     * @var string
     */
    public static $afterImpersonateStartRedirectTo = '/dashboard';

    /**
     * Where to redirect users ending impersonation.
     *
     * @var string
     */
    public static $afterImpersonateEndRedirectTo = '/dashboard';

    /**
     * Length of time tokens expire
     *
     * @var integer
     */
    public static $tokensExpireIn = '15m';

    /**
     * Length of time refresh tokens expire
     *
     * @var integer
     */
    public static $refreshTokensExpireIn = '15d';

    /**
     * Get or set the minimum length a user given password can be.
     *
     * @param  string|null  $length
     * @return string
     */
    public static function minimumPasswordLength($length = null)
    {
        if (is_null($length)) {
            return static::$minimumPasswordLength;
        } else {
            static::$minimumPasswordLength = $length;

            return new static;
        }
    }

    /**
     * Where to redirect users after authentication.
     *
     * @return string
     */
    public static function afterLoginRedirect()
    {
        return static::$afterLoginRedirectTo;
    }

    /**
     * Where to redirect users after starting impersonation
     *
     * @return string
     */
    public static function afterImpersonateStartRedirect()
    {
        return static::$afterImpersonateStartRedirectTo;
    }

    /**
     * Where to redirect users after ending impersonation
     *
     * @return string
     */
    public static function afterImpersonateEndRedirect()
    {
        return static::$afterImpersonateEndRedirectTo;
    }

    /**
     * Get length of time tokens expire
     *
     * @return void
     */
    public static function tokensExpire($return_unit = false)
    {
        $expiration = env('TOKEN_EXPIRATION', static::$tokensExpireIn);

        if($return_unit)
            return static::getTimeNumber($expiration, $return_unit);
        else
            return static::getCarbonDate($expiration);
    }

    /**
     * Get length of time refresh tokens expire
     *
     * @return void
     */
    public static function refreshTokensExpire($return_unit = false)
    {
        $expiration = env('REFRESH_TOKEN_EXPIRATION', static::$refreshTokensExpireIn);

        if($return_unit)
            return static::getTimeNumber($expiration, $return_unit);
        else
            return static::getCarbonDate($expiration);
    }

    protected static function getCarbonDate($expiration)
    {
        $unit = strtolower(substr($expiration, -1));
        $length = substr($expiration, 0, -1);
        if($unit == 'd')
            return \Carbon::now()->addDays($length);
        else if($unit = 'h')
            return \Carbon::now()->addHours($length);
        else if($unit = 'm')
            return \Carbon::now()->addMinutes($length);
        else
            return \Carbon::now()->addDays(7);
    }

    protected static function getTimeNumber($expiration, $return_unit = 'seconds')
    {
        $unit = strtolower(substr($expiration, -1));
        $length = substr($expiration, 0, -1);
        if($unit == 'd')
            $seconds = strtotime($length . 'days', 0);
        else if($unit = 'h')
            $seconds = strtotime($length . 'hours', 0);
        else if($unit = 'm')
            $seconds = strtotime($length . 'minutes', 0);
        else
            $seconds = strtotime('7 days', 0);

        if($return_unit == 'seconds')
            return $seconds;
        else
            return round(floor(($seconds / 60)));
    }

    /**
     * Set the path to redirect to after authentication.
     *
     * @return void
     */
    public static function afterLoginRedirectTo($path)
    {
        static::$afterLoginRedirectTo = $path;
    }

    /**
     * Set the path to redirect to after impersonation.
     *
     * @return void
     */
    public static function afterImpersonateStartRedirectTo($path)
    {
        static::$afterImpersonateStartRedirectTo = $path;
    }

    /**
     * Set the path to redirect to after impersonation.
     *
     * @return void
     */
    public static function afterImpersonateEndRedirectTo($path)
    {
        static::$afterImpersonateEndRedirectTo = $path;
    }

    /**
     * Set length of time tokens expire
     *
     * @return void
     */
    public static function tokensExpireIn($expiration)
    {
        static::$tokensExpireIn = $expiration;
    }

    /**
     * Set length of time refresh tokens expire
     *
     * @return void
     */
    public static function refreshTokensExpireIn($expiration)
    {
        static::$refreshTokensExpireIn = $expiration;
    }
}
