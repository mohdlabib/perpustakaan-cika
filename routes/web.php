<?php

use App\Http\Controllers\PageController;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "web" middleware group. Make something great!
|
*/

// Arahkan route utama ('/') ke method 'index' di PageController
Route::get('/', [PageController::class, 'index']);

// Route lain yang dibuat oleh Laravel Breeze untuk autentikasi
// Biarkan route ini apa adanya.
require __DIR__.'/auth.php';