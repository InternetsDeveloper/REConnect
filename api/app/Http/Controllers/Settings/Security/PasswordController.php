<?php

namespace Laravel\Spark\Http\Controllers\Settings\Security;

use App\REConnected;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Laravel\Spark\Http\Controllers\Controller;

class PasswordController extends Controller
{
    /**
     * Create a new controller instance.
     *
     * @return void
     */
    public function __construct()
    {
        $this->middleware('auth');
    }

    /**
     * Update the user's password.
     *
     * @param  Request  $request
     * @return Response
     */
    public function update(Request $request)
    {
        $this->validate($request, [
            'current_password' => 'required',
            'password' => 'required|confirmed|min:'.REConnected::minimumPasswordLength(),
        ]);

        if (! Hash::check($request->current_password, $request->user()->password)) {
            return response()->json([
                'current_password' => ['The given password does not match our records.']
            ], 422);
        }

        die('PasswordController::update');

        $request->user()->forceFill([
            'password' => bcrypt($request->password)
        ])->save();
    }
}
