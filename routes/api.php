<?php

use App\Http\Controllers\AuthController;
use App\Http\Controllers\TicketController;
use App\Http\Controllers\PasswordResetController;
use App\Http\Controllers\RegisteredUserController;
use App\Http\Controllers\CategoryController;
use App\Http\Controllers\UserController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});

Route::post('user/login', [AuthController::class, 'login']);

// Route::get('/user', function (Request $request) {
//     return $request->user();
// })->middleware('auth:sanctum');

Route::get('/tickets', [TicketController::class, 'index']);
Route::get('/tickets/{ticket}', [TicketController::class, 'show']);


Route::get('/categories', [CategoryController::class, 'index']);

Route::get('/users', [UserController::class, 'index']);

Route::post('/forgot-password', [PasswordResetController::class, 'sendResetLink']);
Route::post('/reset-password', [PasswordResetController::class, 'reset']);
Route::post('/register', [RegisteredUserController::class, 'store']);

// Protected routes (requires a valid Sanctum session cookie)
Route::middleware('auth:sanctum')->group(function () {
    Route::post('/logout', [AuthController::class, 'logout']);
    Route::post('/tickets', [TicketController::class, 'store']);
    
    Route::get('/user', function (Request $request) {
        return $request->user();
    });
});