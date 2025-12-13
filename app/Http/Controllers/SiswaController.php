<?php

namespace App\Http\Controllers;

use App\Models\Siswa; // Pastikan Anda sudah membuat model Siswa
use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\Validator;

class SiswaController extends Controller
{
    /**
     * Menangani proses login untuk siswa berdasarkan NIS.
     */
    public function login(Request $request): JsonResponse
    {
        $validator = Validator::make($request->all(), [
            'nis' => 'required|string|exists:siswas,nis',
        ], [
            'nis.required' => 'NIS wajib diisi.',
            'nis.exists' => 'NIS tidak ditemukan atau tidak terdaftar.',
        ]);

        if ($validator->fails()) {
            return response()->json(['message' => $validator->errors()->first()], 422);
        }

        $siswa = Siswa::where('nis', $request->nis)->first();

        // Simpan ID siswa ke dalam session (untuk web)
        try {
            $request->session()->put('siswa_id', $siswa->id);
        } catch (\Exception $e) {
            // Session mungkin tidak tersedia di API
        }

        return response()->json([
            'message' => 'Login siswa berhasil.',
            'siswa' => $siswa,
        ]);
    }

    /**
     * Display a listing of the resource.
     */
    public function index(): JsonResponse
    {
        $siswas = Siswa::all();
        return response()->json($siswas);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request): JsonResponse
    {
        $validator = Validator::make($request->all(), [
            'nama' => 'required|string',
            'nis' => 'required|string|unique:siswas,nis',
            'kelas' => 'required|string',
            'jurusan' => 'nullable|string',
        ]);

        if ($validator->fails()) {
            return response()->json(['message' => $validator->errors()->first()], 422);
        }

        $siswa = Siswa::create($request->all());
        return response()->json($siswa, 201);
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id): JsonResponse
    {
        $siswa = Siswa::find($id);

        if (!$siswa) {
            return response()->json(['message' => 'Siswa tidak ditemukan'], 404);
        }

        return response()->json($siswa);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id): JsonResponse
    {
        $siswa = Siswa::find($id);

        if (!$siswa) {
            return response()->json(['message' => 'Siswa tidak ditemukan'], 404);
        }

        $validator = Validator::make($request->all(), [
            'nama' => 'sometimes|string',
            'nis' => 'sometimes|string|unique:siswas,nis,' . $id,
            'kelas' => 'sometimes|string',
            'jurusan' => 'nullable|string',
        ]);

        if ($validator->fails()) {
            return response()->json(['message' => $validator->errors()->first()], 422);
        }

        $siswa->update($request->all());
        return response()->json($siswa);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        $siswa = Siswa::find($id);

        if (!$siswa) {
            return response()->noContent();
        }

        $siswa->delete();
        return response()->noContent();
    }
}