<?php
/*
 * MIT License

Copyright (c) 2016 laravel-validators

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
 */

namespace App\Providers\Validation;

use Closure;
use Illuminate\Support\ServiceProvider;
use App\Validation\REConnectedValidator;

abstract class REConnectedValidationServiceProvider extends ServiceProvider
{
    /**
     * The validation rules provided by your application.
     *
     * @var array
     */
    protected $rules = [];

    /**
     * Register the Closure based rules for the application.
     *
     * @return void
     */
    abstract protected function rules();

    /**
     * Register a Closure based rule with the application.
     *
     * @param  string  $name
     * @param  \Closure  $rule
     */
    public function rule($name, Closure $rule)
    {
        $this->rules[$name] = $rule;
    }

    /**
     * Bootstrap any application services.
     *
     * @return void
     */
    public function boot()
    {
        $this->app->validator->resolver(function($translator, $data, $rules, $messages = array(), $customAttributes = array()) {
            return new REConnectedValidator($translator, $data, $rules, $messages, $customAttributes );
        });

        $this->rules();

        array_walk($this->rules, function ($validator, $rule) {
            $this->registerRule($rule, $validator);
        });
    }

    /**
     * Register the service provider.
     *
     * @return void
     */
    public function register()
    {

    }

    /**
     * Register a validator with the application.
     *
     * @param  string  $rule
     * @param  mixed  $validator
     * @return void
     */
    protected function registerRule($rule, $validator)
    {
        $method = ucfirst(camel_case($rule));
        $message = $this->getValidatorMessage($validator, $method);
        if (method_exists($validator, 'sanitize'.$method)) {
            $validator = $this->wrapSanitizedValidator($validator, 'sanitize'.$method);
        }

        $this->app->make('validator')->extend($rule, $validator, $message);
    }

    /**
     * Extract the error message from the validator.
     *
     * @param  string  $validator
     * @return string|null
     */
    private function getValidatorMessage($validator, $method)
    {
        $message_method = 'message'.$method;

        $validator = $this->app->make($validator);

        return $validator->$message_method();
    }

    /**
     * Wrap the validator in a closure which passes the
     * value through the sanitize method, which then
     * executes the validator with the new value.
     *
     * @param  $validator
     * @return \Closure
     */
    private function wrapSanitizedValidator($validator, $method)
    {
        return function($attribute, $value, $parameters, $factory) use ($validator, $method) {

            $validator = $this->app->make($validator);

            if (!method_exists($validator, $method)) {
                throw new \Exception(get_class($validator).' validator missing method: '.$method);
            }

            return $validator->validate($attribute, $validator->$method($value), $parameters, $factory);
        };
    }
}
