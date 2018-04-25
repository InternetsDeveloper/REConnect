<?php

namespace App\Traits;

trait Userstamps
{
    /**
     * Whether we're currently maintaing userstamps.
     *
     * @param bool
     */
    protected $userstamping = true;

    /**
     * Boot the userstamps trait for a model.
     *
     * @return void
     */
    public static function bootUserstamps()
    {
        static::registerListeners();
    }

    /**
     * Register events we need to listen for.
     *
     * @return void
     */
    public static function registerListeners()
    {
        static::creating('App\Listeners\Userstamps\Creating@handle');
        static::updating('App\Listeners\Userstamps\Updating@handle');

        if (static::usingSoftDeletes()) {
            static::deleting('App\Listeners\Userstamps\Deleting@handle');
            static::restoring('App\Listeners\Userstamps\Restoring@handle');
        }
    }

    /**
     * Has the model loaded the SoftDeletes trait.
     *
     * @return bool
     */
    public static function usingSoftDeletes()
    {
        static $usingSoftDeletes;

        if (is_null($usingSoftDeletes)) {
            return $usingSoftDeletes = in_array('Illuminate\Database\Eloquent\SoftDeletes', class_uses(get_called_class()));
        }

        return $usingSoftDeletes;
    }

    /**
     * Get the user that created the model.
     */
    public function creator()
    {
        return $this->belongsTo($this->getUserClass(), 'created_by');
    }

    /**
     * Get the user that edited the model.
     */
    public function editor()
    {
        return $this -> belongsTo($this->getUserClass(), 'updated_by');
    }

    /**
     * Get the user that deleted the model.
     */
    public function destroyer()
    {
        return $this -> belongsTo($this->getUserClass(), 'deleted_by');
    }

    /**
     * Check if we're maintaing Userstamps on the model.
     *
     * @return bool
     */
    public function isUserstamping()
    {
        return $this->userstamping;
    }

    /**
     * Stop maintaining Userstamps on the model.
     *
     * @return void
     */
    public function stopUserstamping()
    {
        $this->userstamping = false;
    }

    /**
     * Start maintaining Userstamps on the model.
     *
     * @return void
     */
    public function startUserstamping()
    {
        $this->userstamping = true;
    }

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