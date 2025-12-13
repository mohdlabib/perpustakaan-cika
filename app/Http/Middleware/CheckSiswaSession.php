<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class CheckSiswaSession
{
    /**
     * Handle an incoming request.
     *
     * @param  \Closure(\Illuminate\Http\Request): (\Symfony\Component\HttpFoundation\Response)  $next
     */
    public function handle(Request $request, Closure $next): Response
    {
        if ($request->session()->has('siswa_id')) {
            // Jika session siswa ada, lanjutkan request.
            return $next($request);
        }

        // Jika tidak ada session, kirim respons 401 Unauthorized.
        return response()->json(['message' => 'Sesi tidak valid atau telah berakhir. Silakan login kembali.'], 401);
    }
}