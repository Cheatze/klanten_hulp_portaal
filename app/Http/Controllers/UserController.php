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

        $user->delete();

        return response()->json(['message' => 'User deleted successfully']);
    }
}
