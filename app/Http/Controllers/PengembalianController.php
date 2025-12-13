<?php

namespace App\Http\Controllers;

use App\Models\Pengembalian;
use App\Models\Peminjaman;
use App\Models\Buku;
use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Response;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\DB;

class PengembalianController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(): JsonResponse
    {
        $pengembalians = Pengembalian::with(['peminjaman.siswa', 'peminjaman.buku'])->get();
        return response()->json($pengembalians);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request): JsonResponse
    {
        $validator = Validator::make($request->all(), [
            'peminjaman_id' => 'required|exists:peminjamen,id',
            'tanggal_pengembalian' => 'required|date',
            'denda' => 'nullable|integer|min:0',
            'keterangan' => 'nullable|string',
        ]);

        if ($validator->fails()) {
            return response()->json(['message' => $validator->errors()->first()], 422);
        }

        // Cek apakah peminjaman sudah dikembalikan
        $existingPengembalian = Pengembalian::where('peminjaman_id', $request->peminjaman_id)->first();
        if ($existingPengembalian) {
            return response()->json(['message' => 'Peminjaman ini sudah dikembalikan'], 422);
        }

        // Ambil data peminjaman
        $peminjaman = Peminjaman::find($request->peminjaman_id);
        if (!$peminjaman) {
            return response()->json(['message' => 'Peminjaman tidak ditemukan'], Response::HTTP_NOT_FOUND);
        }

        // Gunakan transaction untuk memastikan konsistensi data
        DB::beginTransaction();
        try {
            // Buat pengembalian
            $pengembalian = Pengembalian::create($request->all());

            // Kembalikan stok buku
            $buku = Buku::find($peminjaman->buku_id);
            if ($buku) {
                $buku->stok += $peminjaman->jumlah;
                $buku->save();
            }

            DB::commit();
            return response()->json($pengembalian->load(['peminjaman.siswa', 'peminjaman.buku']), Response::HTTP_CREATED);
        } catch (\Exception $e) {
            DB::rollBack();
            return response()->json(['message' => 'Gagal membuat pengembalian'], 500);
        }
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id): JsonResponse
    {
        $pengembalian = Pengembalian::with(['peminjaman.siswa', 'peminjaman.buku'])->find($id);

        if (!$pengembalian) {
            return response()->json(['message' => 'Pengembalian tidak ditemukan'], Response::HTTP_NOT_FOUND);
        }

        return response()->json($pengembalian);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id): JsonResponse
    {
        $pengembalian = Pengembalian::find($id);

        if (!$pengembalian) {
            return response()->json(['message' => 'Pengembalian tidak ditemukan'], Response::HTTP_NOT_FOUND);
        }

        $validator = Validator::make($request->all(), [
            'peminjaman_id' => 'sometimes|exists:peminjamen,id',
            'tanggal_pengembalian' => 'sometimes|date',
            'denda' => 'nullable|integer|min:0',
            'keterangan' => 'nullable|string',
        ]);

        if ($validator->fails()) {
            return response()->json(['message' => $validator->errors()->first()], 422);
        }

        $pengembalian->update($request->all());
        return response()->json($pengembalian->load(['peminjaman.siswa', 'peminjaman.buku']));
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id): Response
    {
        $pengembalian = Pengembalian::find($id);

        if (!$pengembalian) {
            return response()->noContent();
        }

        // Gunakan transaction untuk memastikan konsistensi data
        DB::beginTransaction();
        try {
            // Kurangi stok buku kembali jika pengembalian dihapus
            $peminjaman = Peminjaman::find($pengembalian->peminjaman_id);
            if ($peminjaman) {
                $buku = Buku::find($peminjaman->buku_id);
                if ($buku) {
                    $buku->stok -= $peminjaman->jumlah;
                    $buku->save();
                }
            }

            $pengembalian->delete();
            DB::commit();
            return response()->noContent();
        } catch (\Exception $e) {
            DB::rollBack();
            return response()->noContent();
        }
    }
}
