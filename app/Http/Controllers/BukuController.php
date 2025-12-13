<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreBukuRequest;
use App\Http\Requests\UpdateBukuRequest;
use App\Models\Buku;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Response;

class BukuController extends Controller
{
    /**
     * Menampilkan daftar semua buku.
     */
    public function index(): JsonResponse
    {
        $bukus = Buku::all();
        return response()->json($bukus);
    }

    /**
     * Menyimpan buku baru ke dalam database.
     */
    public function store(StoreBukuRequest $request): JsonResponse
    {
        $validatedData = $request->validated();
        $buku = Buku::create($validatedData);

        return response()->json($buku, Response::HTTP_CREATED);
    }

    /**
     * Menampilkan detail satu buku.
     */
    public function show(string $id): JsonResponse
    {
        $buku = Buku::find($id);

        if (!$buku) {
            return response()->json(['message' => 'Buku tidak ditemukan'], Response::HTTP_NOT_FOUND);
        }

        return response()->json($buku);
    }

    /**
     * Memperbarui data buku yang sudah ada.
     */
    public function update(UpdateBukuRequest $request, string $id): JsonResponse
    {
        $buku = Buku::find($id);

        if (!$buku) {
            return response()->json(['message' => 'Buku tidak ditemukan'], Response::HTTP_NOT_FOUND);
        }

        $validatedData = $request->validated();
        $buku->update($validatedData);

        return response()->json($buku);
    }

    /**
     * Menghapus buku dari database.
     */
    public function destroy(string $id): Response
    {
        $buku = Buku::find($id);

        if (!$buku) {
            return response()->noContent();
        }

        $buku->delete();
        return response()->noContent();
    }
}