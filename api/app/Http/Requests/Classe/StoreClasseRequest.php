<?php

namespace App\Http\Requests\Classe;

use Illuminate\Contracts\Validation\ValidationRule;
use Illuminate\Foundation\Http\FormRequest;

class StoreClasseRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'branch_id' => 'required|exists:branches,id',
            'trainer_id' => 'required|exists:trainers,id',
            'name' => 'required|string|max:255',
            'schedule' => 'required|date',
            'capacity' => 'required|integer|min:1',
        ];
    }
}
