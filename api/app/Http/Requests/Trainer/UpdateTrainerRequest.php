<?php

namespace App\Http\Requests\Trainer;

use Illuminate\Contracts\Validation\ValidationRule;
use Illuminate\Foundation\Http\FormRequest;

class UpdateTrainerRequest extends FormRequest
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
            'name' => 'sometimes|string|max:255',
            'specialty' => 'nullable|string',
            'phone' => 'sometimes|numeric|min:0',
            'status' => 'sometimes|in:active,inactive',
        ];
    }
}
