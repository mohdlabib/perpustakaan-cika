<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class EnsurePetugas
{
    /**
     * Handle an incoming request.
     *
     * @param  \Closure(\Illuminate\Http\Request): (\Symfony\Component\HttpFoundation\Response)  $next
     */
    public function handle(Request $request, Closure $next): Response
    {
        // Middleware 'auth:sanctum' akan berjalan terlebih dahulu,
        // jadi kita bisa berasumsi user sudah terautentikasi di sini.
        // Kita hanya perlu memeriksa rolenya.

        if ($request->user() && $request->user()->role === 'petugas') {
            // Jika role adalah 'petugas', lanjutkan request.
            return $next($request);
        }

        // Jika bukan 'petugas', kirim respons 403 Forbidden.
        return response()->json(['message' => 'Akses ditolak. Hanya untuk petugas.'], 403);
    }
}