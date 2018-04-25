<?php

namespace App\Validation\Validators;

use App\Contracts\Repositories\UserRepository;

class UserValidator
{
    /**
     * Create a new user validator instance.
     *
     * @param  UserRepository  $users
     * @return void
     */
    public function __construct(UserRepository $users)
    {
        $this->users = $users;
    }

    /**
     * Validate the given data.
     *
     * @param  string  $attribute
     * @param  mixed  $value
     * @param  array  $parameters
     * @return bool
     */
    public function validate($attribute, $value, $parameters)
    {
        return in_array($value, array_keys($this->countries->all()));
    }

    /**
     *
     * @param  array $attributes
     * @return array $attributes
     */
    function validateUser( array $attributes ) {
        $rules = User::getValidationRules();

        return \Validator::make($attributes, $rules);
    }
}
