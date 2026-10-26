<?php

use Illuminate\Support\Facades\Route;
use Illuminate\Foundation\Auth\EmailVerificationRequest;
use Illuminate\Http\Request;

Route::get('/email/verify/{id}/{hash}', function (EmailVerificationRequest $request) {
    $request->fulfill();

    //return redirect('http://localhost:5173/dashboard?verified=1');
    return redirect('http://localhost:8000/tickets?verified=1');
})->middleware(['signed'])->name('verification.verify');

Route::get('/{any}', function () {
    return view('welcome');
})->where('any', '.*');

