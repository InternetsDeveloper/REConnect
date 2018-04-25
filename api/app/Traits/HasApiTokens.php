<?php

namespace App\Traits;

trait HasApiTokens
{
    protected $currentToken;

    /**
     * Get all of the API tokens for the user.
     */
    public function tokens()
    {
        return $this->hasMany(Token::class);
    }

    /**
     * Determine if the current API token is granted a given ability.
     *
     * @param  string  $ability
     * @return bool
     */
    public function tokenCan($ability)
    {
        return $this->currentToken ? $this->currentToken->can($ability) : false;
    }

    public function token()
    {
        return $this->currentToken;
    }

    public function setToken(Token $token)
    {
        $this->currentToken = $token;

        return $this;
    }
}
