<?php

namespace App\Validation;

use Illuminate\Validation\Validator as IlluminateValidator;
use App\Validation\Validators\Exceptions\ValidationException;

class REConnectedValidator extends IlluminateValidator {

    /**
     * Run the validator's rules against its data.
     *
     * @return boolen
     *
     * @throws \Illuminate\Validation\ValidationException
     */
    public function validate($thow_exception = true)
    {
        if ($this->fails() && $thow_exception) {
            throw new ValidationException($this);
        }
        else if($this->fails() && !$thow_exception) {
            return false;
        }

        return true;
    }

    public function getCurrentRule()
    {
        return $this->currentRule;
    }
}