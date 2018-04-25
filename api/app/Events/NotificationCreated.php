<?php

namespace App\Events;

class NotificationCreated
{
    /**
     * The notification instance.
     *
     * @var \App\Notification
     */
    public $notification;

    /**
     * Create a new notification instance.
     *
     * @param  \App\Notification  $notification
     * @return void
     */
    public function __construct($notification)
    {
        $this->notification = $notification;
    }
}
