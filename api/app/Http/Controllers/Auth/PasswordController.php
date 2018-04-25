<?php

namespace App\Http\Controllers\Auth;

use App\Models\System\REConnected;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Illuminate\Foundation\Auth\ResetsPasswords;
use Illuminate\Foundation\Auth\SendsPasswordResetEmails;

class PasswordController extends Controller
{
    use SendsPasswordResetEmails, ResetsPasswords {
        SendsPasswordResetEmails::broker insteadof ResetsPasswords;
    }

    /**
     * Create a new password controller instance.
     *
     * @return void
     */
    public function __construct()
    {
        $this->middleware('guest');

        $this->middleware('throttle:3,1')->only('sendResetLinkEmail', 'reset');

        $this->redirectTo = REConnected::afterLoginRedirect();
    }
}
