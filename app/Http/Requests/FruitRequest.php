<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class FruitRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     *
     * @return bool
     */
    public function authorize()
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array
     */
    public function rules()
    {
        switch ($this->method()) {
            case 'POST':
                return [
                    'name'    => 'required|string',
                    'size' => 'required|integer|between:0,2',
                ];
            case 'PUT':
            case 'PATCH':
                return [
                    'name'    => 'string',
                    'size' => 'integer|between:0,2',
                ];
            default:
                return [];
        }
    }
}
