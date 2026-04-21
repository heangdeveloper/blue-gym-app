<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Trainer extends Model
{
    protected $fillable = [
        'branch_id',
        'name',
        'specialty',
        'phone',
        'status',
    ];

    public function branch(): BelongsTo
    {
        return $this->belongsTo(Branch::class);
    }
}
