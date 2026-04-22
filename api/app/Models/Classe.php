<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Classe extends Model
{
    protected $fillable = [
        'branch_id',
        'trainer_id',
        'name',
        'schedule',
        'capacity',
    ];

    protected $casts = [
        'schedule' => 'date',
    ];

    public function branch(): BelongsTo
    {
        return $this->belongsTo(Branch::class);
    }

    public function trainer()
    {
        return $this->belongsTo(Trainer::class);
    }
}
