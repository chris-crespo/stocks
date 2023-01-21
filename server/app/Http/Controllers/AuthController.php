<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use App\Models\User;
use PHPOpenSourceSaver\JWTAuth\Exceptions\JWTException;

class AuthController extends Controller
{
    public function __construct() {
        $this->middleware('auth:api', ['except' => ['login', 'refresh', 'register']]);
    }

    public function login(Request $request) {
        $request->validate([
            'email' => 'required|string|email|exists:users',
            'password' => 'required|string'
        ]);
        $credentials = $request->only('email', 'password');

        $token = Auth::attempt($credentials);
        if (!$token) {
            return response()->json([
                'status' => 'error',
                'message' => 'Invalid password.',
                'errors' => [
                    'password' => ['Invalid password.']
                ]
            ], 401);
        }

        $user = Auth::user();
        return response()->json([
            'status' => 'success',
            'message' => 'Logged successfully.',
            'data' => [
                'token' => $token,
                'user' => $user,
            ],
        ]);
    }

    public function register(Request $request) {
        $validation = $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|string|email|max:255|unique:users',
            'password' => 'required|string|min:6'
        ]);

        $user = User::create([
            'name' => $request->name,
            'email' => $request->email,
            'password' => Hash::make($request->password)
        ]);

        $token = Auth::login($user);
        return response()->json([
            'status' => 'success',
            'message' => 'User created successfully.',
            'data' => [
                'token' => $token,
                'user' => $user,
            ]
        ]);
    }

    public function logout() {
        Auth::logout();
        return response()->json([
            'status' => 'success',
            'message' => 'Successfully logged out.'
        ]);
    }

    public function me() {
        return response()->json([
            'status' => 'success',
            'data' => [ 'user' => Auth::user() ]
        ]);
    }

    public function refresh() {
        try {
            return response()->json([
                'status' => 'success',
                'data' => [ 'token' => Auth::refresh() ]
            ]);
        } catch (JWTException $e) {
            return response()->json([
                'status' => 'error',
                'message' => $e->getMessage()
            ], 400);
        }
    }
}
