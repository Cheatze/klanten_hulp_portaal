<?php

namespace App\Http\Controllers;

use App\Http\Requests\UpdateUserRequest;
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

    public function update(UpdateUserRequest $request, User $user)
    {

        $user->update($request->validated());

        return new UserResource($user);
    }

    public function destroy(User $user)
    {
        if (
            $user->tickets()->exists() ||
            $user->assignedTickets()->exists() ||
            $user->responses()->exists()
        ) {
            return response()->json(
                ['message' => 'Cannot delete user with associated tickets or responses'],
                400
            );
        }

        // if($user->tickets()->exists()){
        //     return response()->json(['message' => 'Cannot delete user with associated tickets'], 400);
        // } else if($user->responses()->exists()){
        //     return response()->json(['message' => 'Cannot delete user with associated responses'], 400);
        // } else{
        //     $user->delete();
        // }
        // return response()->json(['message' => 'User deleted successfully']);
    }
}
