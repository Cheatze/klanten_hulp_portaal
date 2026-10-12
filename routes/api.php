<?php

use App\Http\Controllers\TicketController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;



Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');

Route::get('/tickets', [TicketController::class, 'index']);
Route::get('/tickets/{ticket}', [TicketController::class, 'show']);

Route::get('/categories', [\App\Http\Controllers\CategoryController::class, 'index']);

Route::get('/users', [\App\Http\Controllers\UserController::class, 'index']);