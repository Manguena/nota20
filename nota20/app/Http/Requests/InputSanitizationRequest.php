<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Support\Str;

class InputSanitizationRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     *
     * @return bool
     */
    public function authorize()
    {
        return false;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array
     */
    public function rules()
    {
        return [
            //
        ];
    }


/**
 * Prepare the data for validation.
 *
 * @return void
 */
protected function prepareForValidation()
{
   /* $this->merge([
        'slug' => Str::slug($this->slug),
    ]);***/

    dd($this->slug);
}
}
