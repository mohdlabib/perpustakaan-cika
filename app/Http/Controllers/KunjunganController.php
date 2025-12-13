<?php

namespace App\Http\Controllers;

use App\Models\Kunjungan;
use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Response;
use Illuminate\Support\Facades\Validator;

class KunjunganController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(): JsonResponse
    {
        $kunjungans = Kunjungan::all();
        return response()->json($kunjungans);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request): JsonResponse
    {
        $validator = Validator::make($request->all(), [
            'nama' => 'required|string',
            'nis' => 'nullable|string',
            'kelas' => 'nullable|string',
            'tanggal_kunjungan' => 'required|date',
            'jam_masuk' => 'nullable',
            'jam_keluar' => 'nullable',
        ]);

        if ($validator->fails()) {
            return response()->json(['message' => $validator->errors()->first()], 422);
        }

        // Normalisasi format jam jika ada
        $data = $request->all();
        if (isset($data['jam_masuk']) && $data['jam_masuk']) {
            // Jika format H:i, tambahkan :00
            if (preg_match('/^\d{2}:\d{2}$/', $data['jam_masuk'])) {
                $data['jam_masuk'] = $data['jam_masuk'] . ':00';
            }
        }
        if (isset($data['jam_keluar']) && $data['jam_keluar']) {
            // Jika format H:i, tambahkan :00
            if (preg_match('/^\d{2}:\d{2}$/', $data['jam_keluar'])) {
                $data['jam_keluar'] = $data['jam_keluar'] . ':00';
            }
        }

        $kunjungan = Kunjungan::create($data);
        return response()->json($kunjungan, Response::HTTP_CREATED);
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id): JsonResponse
    {
        $kunjungan = Kunjungan::find($id);

        if (!$kunjungan) {
            return response()->json(['message' => 'Kunjungan tidak ditemukan'], Response::HTTP_NOT_FOUND);
        }

        return response()->json($kunjungan);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id): JsonResponse
    {
        $kunjungan = Kunjungan::find($id);

        if (!$kunjungan) {
            return response()->json(['message' => 'Kunjungan tidak ditemukan'], Response::HTTP_NOT_FOUND);
        }

        $validator = Validator::make($request->all(), [
            'nama' => 'sometimes|string',
            'nis' => 'nullable|string',
            'kelas' => 'nullable|string',
            'tanggal_kunjungan' => 'sometimes|date',
            'jam_masuk' => 'nullable',
            'jam_keluar' => 'nullable',
        ]);

        if ($validator->fails()) {
            return response()->json(['message' => $validator->errors()->first()], 422);
        }

        // Normalisasi format jam jika ada
        $data = $request->all();
        if (isset($data['jam_masuk']) && $data['jam_masuk']) {
            // Jika format H:i, tambahkan :00
            if (preg_match('/^\d{2}:\d{2}$/', $data['jam_masuk'])) {
                $data['jam_masuk'] = $data['jam_masuk'] . ':00';
            }
        }
        if (isset($data['jam_keluar']) && $data['jam_keluar']) {
            // Jika format H:i, tambahkan :00
            if (preg_match('/^\d{2}:\d{2}$/', $data['jam_keluar'])) {
                $data['jam_keluar'] = $data['jam_keluar'] . ':00';
            }
        }

        $kunjungan->update($data);
        return response()->json($kunjungan);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id): Response
    {
        $kunjungan = Kunjungan::find($id);

        if (!$kunjungan) {
            return response()->noContent();
        }

        $kunjungan->delete();
        return response()->noContent();
    }
}
