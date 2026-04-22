<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class WalkinResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,

            'branch' => [
                'id' => $this->branch?->id,
                'name' => $this->branch?->name,
            ],

            'package' => [
                'id' => $this->package?->id,
                'name' => $this->package?->name,
            ],

            'product' => [
                'id' => $this->product?->id,
                'name' => $this->product?->name,
            ],

            'entry_time' => $this->entry_time,
            'exit_time' => $this->exit_time,
            'qty' => $this->qty,
            'price' => $this->price,
            'subtotal' => $this->subtotal,

            'created_at' => $this->created_at,
        ];
    }
}
