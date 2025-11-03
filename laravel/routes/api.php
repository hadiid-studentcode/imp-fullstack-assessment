<?php

use App\Http\Controllers\Api\AuthController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');


Route::get('/hello-world', function () {
    return response()->json(['message' => 'Hello World!']);
});


Route::controller(AuthController::class)->group(function () {
    Route::post('/sign-up', 'register');
    Route::post('/sign-in', 'authenticate');
});
