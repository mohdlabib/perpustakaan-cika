<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StoreBukuRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        // Set ke true agar request bisa diproses
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'judul' => 'required|string|max:255',
            'pengarang' => 'required|string|max:255',
            'penerbit' => 'nullable|string|max:255',
            'tahun' => 'required|integer|digits:4',
            'jenis' => 'nullable|string|max:100',
            'rak' => 'nullable|string|max:50',
            'stok' => 'required|integer|min:0',
            'sinopsis' => 'nullable|string',
            'gambar' => 'nullable|string',
        ];
    }
}

