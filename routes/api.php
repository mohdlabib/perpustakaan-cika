<?php

use App\Http\Controllers\Api\AuthController;
use App\Http\Controllers\BukuController;
use App\Http\Controllers\DataSiswaController;
use App\Http\Controllers\KunjunganController;
use App\Http\Controllers\PeminjamanController;
use App\Http\Controllers\PengembalianController;
use App\Http\Controllers\SiswaController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/

// ============================================================================
// PUBLIC ROUTES (Tidak memerlukan autentikasi)
// ============================================================================

// Auth endpoints
Route::post('/register', [AuthController::class, 'register']);
Route::post('/login', [AuthController::class, 'login']);

// Endpoint untuk login siswa (menggunakan NIS, tanpa password)
Route::post('/siswa/login', [SiswaController::class, 'login']);

// Public endpoints untuk melihat daftar buku (tanpa modify)
Route::get('/buku', [BukuController::class, 'index']);
Route::get('/buku/{id}', [BukuController::class, 'show']);

// ============================================================================
// PROTECTED ROUTES (Memerlukan autentikasi dengan Sanctum)
// ============================================================================

Route::middleware('auth:sanctum')->group(function () {
    
    // ----- Auth Management -----
    Route::get('/user', function (Request $request) {
        return $request->user();
    });
    Route::get('/profile', [AuthController::class, 'profile']);
    Route::post('/logout', [AuthController::class, 'logout']);
    Route::post('/logout-all', [AuthController::class, 'logoutAll']);
    
    // ----- Buku Management (Create, Update, Delete) -----
    Route::post('/buku', [BukuController::class, 'store']);
    Route::put('/buku/{id}', [BukuController::class, 'update']);
    Route::patch('/buku/{id}', [BukuController::class, 'update']);
    Route::delete('/buku/{id}', [BukuController::class, 'destroy']);
    
    // ----- Siswa Management -----
    Route::apiResource('siswa', SiswaController::class);
    
    // ----- Kunjungan Management -----
    Route::apiResource('kunjungan', KunjunganController::class);
    
    // ----- Peminjaman Management -----
    Route::apiResource('peminjaman', PeminjamanController::class);
    
    // ----- Pengembalian Management -----
    Route::apiResource('pengembalian', PengembalianController::class);
    
    // ----- Data Siswa (untuk petugas) -----
    Route::apiResource('data-siswa', DataSiswaController::class);
});