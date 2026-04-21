<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Branch extends Model
{
    protected $fillable = [
        'name',
        'location',
        'phone',
        'status',
    ];

    public function trainers(): HasMany
    {
        return $this->hasMany(Trainer::class)->chaperone();
    }
}
