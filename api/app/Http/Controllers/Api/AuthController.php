<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\User;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\ValidationException;

class AuthController extends Controller
{
    public function me(Request $request)
    {
        $user = $request->user();

        if (! $user) {
            return response()->json([
                'user' => null,
                'message' => 'Unauthenticated',
            ], 401);
        }

        return response()->json([
            'user' => [
                'id' => $user->id,
                'name' => $user->name,
                'username' => $user->username,
            ],
        ]);
    }

    public function login(Request $request)
    {
        $request->validate([
            "username" => "required|string",
            "password" => "required|string",
        ]);

        $user = User::where("username", $request->username)->first();

        if (! $user || ! Hash::check($request->password, $user->password)) {
            throw ValidationException::withMessages([
                'username' => ['The provided credentials are incorrect.'],
            ]);
        }

        $token = $user->createToken("web-client")->plainTextToken;

        return response()->json([
            'token' => $token,
            'user' => $user,
        ]);
    }

    public function logout(Request $request)
    {
        $user = $request->user();

        if (! $user || ! $user->currentAccessToken()) {
            return response()->json([
                'message' => 'Not authenticated.',
            ], 401);
        }

        $user->currentAccessToken()->delete();

        return response()->json([
            'message' => 'Logged out successfully.',
        ]);
    }
}
