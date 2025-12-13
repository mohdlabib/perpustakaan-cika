<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\View\View;

class PageController extends Controller
{
    /**
     * Menampilkan halaman utama aplikasi (Single Page Application).
     *
     * @return \Illuminate\View\View
     */
    public function index(): View
    {
        return view('index');
    }
}