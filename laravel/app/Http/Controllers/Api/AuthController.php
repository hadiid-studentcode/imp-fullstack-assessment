<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\Auth\AuthRequest;
use App\Http\Requests\Auth\RegisterRequest;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Auth;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\Log;

class AuthController extends Controller
{
    protected $users;

    public function __construct(User $users)
    {
        $this->users = $users;
    }
    public function register(RegisterRequest $request): JsonResponse
    {

        $credentials = $request->validated();

        DB::beginTransaction();

        try {
            $user =  $this->users->create([
                'name' => $credentials['name'],
                'email' => $credentials['email'],
                'password' => Hash::make($credentials['password']),
            ]);

            DB::commit();

            $token = $user->createToken('auth_token')->plainTextToken;

            return response()->json([
                'message' => 'User created successfully.',
                'user' => $user,
                'token' => $token
            ], 201);
        } catch (\Throwable $th) {
            DB::rollBack();

            Log::error('Registration failed: ' . $th->getMessage(), [
                'trace' => $th->getTraceAsString()
            ]);

            return response()->json([
                'message' => 'Registration failed. Please try again later.'
            ], 500);
        }
    }

    public function authenticate(AuthRequest $request): JsonResponse
    {
        $credentials = $request->validated();

        try {

            if (!Auth::attempt($credentials)) {
                return response()->json([
                    'message' => 'Invalid credentials.'
                ], 401);
            }

            $user = Auth::user();
            $token = $user->createToken('auth_token')->plainTextToken;

            return response()->json([
                'message' => 'User authenticated successfully.',
                'token' => $token,
                'user' => $user,
            ], 200);
        } catch (\Throwable $th) {

            Log::error('Authentication error: ' . $th->getMessage(), [
                'trace' => $th->getTraceAsString()
            ]);

            return response()->json([
                'message' => 'An unexpected server error occurred.'
            ], 500);
        }
    }
    public function logout(Request $request): JsonResponse
    {
        try {
            $request->user()->tokens()->delete();

            return response()->json([
                'message' => 'User logged out successfully.'
            ], 200);
        } catch (\Throwable $th) {
            Log::error('Logout error: ' . $th->getMessage(), [
                'trace' => $th->getTraceAsString()
            ]);

            return response()->json([
                'message' => 'An unexpected server error occurred.'
            ], 500);
        }
    }
}
