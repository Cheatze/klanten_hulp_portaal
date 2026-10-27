<?php

namespace App\Http\Controllers;

use App\Models\Ticket;
use App\Http\Requests\StoreTicketRequest;
use App\Http\Requests\UpdateTicketRequest;
use App\Http\Resources\TicketResource;
use Illuminate\Http\Request;
use Illuminate\Validation\Rule;

class TicketController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $user = $request->user();
        $targetId = $user->id;

        // If user is admin, fetch everything
    if ($user->is_admin) {
        $tickets = Ticket::all();
        return TicketResource::collection($tickets);
    }

    // Otherwise, fetch where made_by or assigned_to matches the id
    $tickets = Ticket::where('made_by', $targetId)
        ->orWhere('assigned_to', $targetId)
        ->get();

    return TicketResource::collection($tickets);

        // $tickets = Ticket::all();
        // return TicketResource::collection($tickets);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create(Request $request)
    {
        
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreTicketRequest $request)
    {
        $validated = $request->validate([
            'title' => ['required', 'string', 'max:255'],
            'description' => ['required', 'string'],
            'status' => [
                'required',
                Rule::in(['open', 'pending', 'closed']),
            ],
            'category_id' => [
                'required',
                'integer',
                'exists:categories,id',
            ],
        ]);

        $validated['made_by'] = $request->user()->id;

        $ticket = Ticket::create($validated);

        return response()->json($ticket, 201);
    }

    /**
     * Display the specified resource.
     */
    public function show(Ticket $ticket)
    {
        return response()->json($ticket);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Ticket $ticket)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateTicketRequest $request, Ticket $ticket)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Ticket $ticket)
    {
        //
    }
}
