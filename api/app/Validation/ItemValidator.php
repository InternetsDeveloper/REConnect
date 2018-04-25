<?php

namespace App\Validation;

abstract class ItemValidator
{
    /**
     * Validate the given value.
     *
     * @param  string  $attribute
     * @param  mixed  $value
     * @param  array  $parameters
     * @param  \Illuminate\Contracts\Validation\Validator  $validator
     * @return  bool
     */
    public function validate($attribute, $values, $parameters, $validator)
    {
        $method = 'validate'.ucfirst(camel_case($validator->getCurrentRule()));

        if(!method_exists($this, $method))
            throw new Exception('Validator missing method: '.get_class($this).'::'.$method);

        if(!is_array($values))
            $values = [$values];

        return $this->$method($attribute, $values, $parameters, $validator);
    }

    public function message($attribute, $values, $parameters, $validator)
    {
        $method = 'message'.ucfirst(camel_case($validator->getCurrentRule()));

        if(!method_exists($this, $method))
            throw new Exception('Validator missing method: '.get_class($this).'::'.$method);

        return $this->$method();
    }

//    public static function message()
//    {
////        messageRolegroupIsLead
//
//        $method = camel_case($validator->getCurrentRule());
//
//        if(!method_exists($this, $method))
//            throw new Exception('Validator missing method: '.$method);
//
//        if(!array($values))
//            $values = [$values];
//
//        $this->$method($attribute, $values, $parameters, $validator);
//    }
}
