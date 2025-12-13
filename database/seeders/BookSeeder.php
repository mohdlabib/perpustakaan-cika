<?php

namespace Database\Seeders;

use App\Models\Buku;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class BookSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        Buku::create(['judul' => 'Laskar Pelangi', 'pengarang' => 'Andrea Hirata', 'tahun' => 2005, 'stok' => 10]);
        Buku::create(['judul' => 'Bumi Manusia', 'pengarang' => 'Pramoedya Ananta Toer', 'tahun' => 1980, 'stok' => 7]);
        Buku::create(['judul' => 'Cantik Itu Luka', 'pengarang' => 'Eka Kurniawan', 'tahun' => 2002, 'stok' => 5]);
        Buku::create(['judul' => 'Negeri 5 Menara', 'pengarang' => 'Ahmad Fuadi', 'tahun' => 2009, 'stok' => 12]);
        Buku::create(['judul' => 'Perahu Kertas', 'pengarang' => 'Dee Lestari', 'tahun' => 2009, 'stok' => 8]);
    }
}