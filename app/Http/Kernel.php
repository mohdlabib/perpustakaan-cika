<?php

namespace App\Http;

use Illuminate\Foundation\Http\Kernel as HttpKernel;

class Kernel extends HttpKernel
{
    /**
     * The application's route middleware aliases.
     *
     * Aliases may be used to conveniently assign middleware to routes and groups.
     *
     * @var array<string, class-string|string>
     */
    protected $middlewareAliases = [
        // ... middleware lain dari Laravel
        'petugas' => \App\Http\Middleware\EnsurePetugas::class,
        'siswa.session' => \App\Http\Middleware\CheckSiswaSession::class,
    ];
}