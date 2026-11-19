<?php

namespace App\Http\Controllers;

use App\Http\Requests\AdminUpdateTicketRequest;
use App\Http\Requests\AssignTicketRequest;
use App\Http\Requests\ChangeTicketStatusRequest;
use App\Http\Requests\PatchTicketRequest;
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

    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreTicketRequest $request)
    {
        $validated = $request->validated();

        $validated['made_by'] = $request->user()->id;

        $ticket = Ticket::create($validated);

        return (new TicketResource($ticket))
            ->response();
    }

    /**
     * Display the specified resource.
     */
    public function show(Ticket $ticket)
    {
        return (new TicketResource($ticket))->response();
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateTicketRequest $request, Ticket $ticket)
    {
        $ticket->update($request->validated());
        
    }

    public function patchTicket(PatchTicketRequest $request, Ticket $ticket)
    {
        $ticket->update($request->only(['status', 'assigned_to']));

    }

    public function changeStatus(Request $request, Ticket $ticket)
    {
        $request->validate([
            'status' => ['required', Rule::in(['open', 'pending', 'closed'])],
        ]);

        $ticket->status = $request->input('status');
        $ticket->save();

        return response()->json($ticket);
    }

    /**
     * Assign a ticket to a user.
     */
    public function assignTicket(AssignTicketRequest $request, Ticket $ticket)
    {

        $ticket->assigned_to = $request->input('assigned_to');
        $ticket->save();

        return response()->json($ticket);
    }

}
