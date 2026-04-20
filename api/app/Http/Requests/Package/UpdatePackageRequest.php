<?php

namespace App\Http\Requests\Package;

use Illuminate\Contracts\Validation\ValidationRule;
use Illuminate\Foundation\Http\FormRequest;

class UpdatePackageRequest extends FormRequest
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
            'duration' => 'sometimes|integer|min:1',
            'price' => 'sometimes|numeric|min:0',
            'description' => 'nullable|string',
            'status' => 'sometimes|in:active,inactive',
        ];
    }
}
