<?php

namespace App\Http\Controllers;

use App\Models\Peminjaman;
use App\Models\Buku;
use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Response;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\DB;

class PeminjamanController extends Controller
{
    /**
     * Display a listing of the resource.
     * Hanya menampilkan peminjaman yang belum dikembalikan
     */
    public function index(): JsonResponse
    {
        $peminjamans = Peminjaman::with(['siswa', 'buku'])
            ->whereDoesntHave('pengembalian')
            ->get();
        return response()->json($peminjamans);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request): JsonResponse
    {
        $validator = Validator::make($request->all(), [
            'siswa_id' => 'required|exists:siswas,id',
            'buku_id' => 'required|exists:bukus,id',
            'tanggal_peminjaman' => 'required|date',
            'tanggal_kembali_rencana' => 'required|date|after:tanggal_peminjaman',
            'jumlah' => 'required|integer|min:1',
        ]);

        if ($validator->fails()) {
            return response()->json(['message' => $validator->errors()->first()], 422);
        }

        // Cek stok buku
        $buku = Buku::find($request->buku_id);
        if (!$buku) {
            return response()->json(['message' => 'Buku tidak ditemukan'], Response::HTTP_NOT_FOUND);
        }

        if ($buku->stok < $request->jumlah) {
            return response()->json(['message' => 'Stok buku tidak mencukupi'], 422);
        }

        // Gunakan transaction untuk memastikan konsistensi data
        DB::beginTransaction();
        try {
            // Buat peminjaman
            $peminjaman = Peminjaman::create($request->all());

            // Kurangi stok buku
            $buku->stok -= $request->jumlah;
            $buku->save();

            DB::commit();
            return response()->json($peminjaman->load(['siswa', 'buku']), Response::HTTP_CREATED);
        } catch (\Exception $e) {
            DB::rollBack();
            return response()->json(['message' => 'Gagal membuat peminjaman'], 500);
        }
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id): JsonResponse
    {
        $peminjaman = Peminjaman::with(['siswa', 'buku'])->find($id);

        if (!$peminjaman) {
            return response()->json(['message' => 'Peminjaman tidak ditemukan'], Response::HTTP_NOT_FOUND);
        }

        return response()->json($peminjaman);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id): JsonResponse
    {
        $peminjaman = Peminjaman::find($id);

        if (!$peminjaman) {
            return response()->json(['message' => 'Peminjaman tidak ditemukan'], Response::HTTP_NOT_FOUND);
        }

        $validator = Validator::make($request->all(), [
            'siswa_id' => 'sometimes|exists:siswas,id',
            'buku_id' => 'sometimes|exists:bukus,id',
            'tanggal_peminjaman' => 'sometimes|date',
            'tanggal_kembali_rencana' => 'sometimes|date',
            'jumlah' => 'sometimes|integer|min:1',
        ]);

        if ($validator->fails()) {
            return response()->json(['message' => $validator->errors()->first()], 422);
        }

        $peminjaman->update($request->all());
        return response()->json($peminjaman->load(['siswa', 'buku']));
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id): Response
    {
        $peminjaman = Peminjaman::find($id);

        if (!$peminjaman) {
            return response()->noContent();
        }

        // Gunakan transaction untuk memastikan konsistensi data
        DB::beginTransaction();
        try {
            // Kembalikan stok buku jika peminjaman dihapus
            $buku = Buku::find($peminjaman->buku_id);
            if ($buku) {
                $buku->stok += $peminjaman->jumlah;
                $buku->save();
            }

            $peminjaman->delete();
            DB::commit();
            return response()->noContent();
        } catch (\Exception $e) {
            DB::rollBack();
            return response()->noContent();
        }
    }
}
