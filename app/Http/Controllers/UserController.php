<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use App\Http\Resources\UserResource;

class UserController extends Controller
{
    public function index()
    {
        // $users = User::all();
        // return response()->json($users);
        return UserResource::collection(User::all());
    }

    public function show(User $user){
        return response()->json($user);
    }
}
