<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Ticket extends Model
{
    /** @use HasFactory<\Database\Factories\TicketFactory> */
    use HasFactory;

    protected $fillable = [
        'title',
        'description',
        'status',
        'made_by',
        'assigned_to',
        'category_id',
    ];

    // public function user()
    // {
    //     return $this->belongsTo(User::class);
    // }

    public function madeBy()
    {
        return $this->belongsTo(User::class, 'made_by');
    }

    public function assignedTo()
    {
        return $this->belongsTo(User::class, 'assigned_to');
    }

    public function category()
    {
        return $this->belongsTo(Category::class);
    }

    public function responses()
    {
        return $this->hasMany(Response::class);
    }

    public function notes()
    {
        return $this->hasMany(Note::class);
    }
}
