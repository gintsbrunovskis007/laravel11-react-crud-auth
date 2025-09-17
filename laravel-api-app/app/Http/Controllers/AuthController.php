<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\User;
use Illuminate\Support\Facades\Hash;

class AuthController extends Controller
{
    // in the () means accepts the request
    public function register(Request $request)
    {
        $fields = $request->validate([
            'name' => 'required|max:255',
            'email' => 'required|email|unique:users',
            'password' => 'required|confirmed'
        ]);

        $user = User::create($fields);

        $token = $user->createToken($request->name);

        return [
            'user' => $user,
            'token' => $token->plainTextToken
        ];
    }

    public function login(Request $request)
    {
        $request->validate([
            'email' => 'required|email|exists:users',
            'password' => 'required'
        ]);

        // if we weere building a WEB app we would use this but were building a api.
        // so wee need to grab the user using querys
        // Auth::attempt(['email' => $email, 'password' => $password])

        $user = User::where('email', $request->email)->first();

        if (!$user || !Hash::check($request->password, $user->password)) {
            return [
                // 'message' => "The provided credentials in incorrect."
                'errors' => [
                    'email' => [
                        "The provided credentials in incorrect."
                    ]
                ]

            ];
        }


        $token = $user->createToken($user->name);

        return [
            'user' => $user,
            'token' => $token->plainTextToken
        ];
    }

    public function logout(Request $request)
    {

        $request->user()->tokens()->delete();

        return [
            'message' => "You are logged out!"
        ];

        // this wont work ^




    }
}
