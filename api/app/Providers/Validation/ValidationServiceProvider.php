<?php

namespace App\Providers\Validation;

use App\Validation\Validators\RoleGroupValidator;

class ValidationServiceProvider extends REConnectedValidationServiceProvider
{
    /**
     * The validation rules provided by your application.
     *
     * @var array
     */
    protected $rules = [
        'rolegroup_is_lead' => RoleGroupValidator::class,
    ];

    /**
     * Register the Closure based validators for the application.
     *
     * @return void
     */
    public function rules()
    {
//        $this->rule('rolegroup_is_lead', function ($attribute, $value, $parameters, $validator) {
//            die('ValidationServiceProvider::rules');
//        });
    }
}