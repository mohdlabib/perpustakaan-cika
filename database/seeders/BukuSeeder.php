<?php

namespace Database\Seeders;

use App\Models\Buku;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class BukuSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $bukus = [
            [
                'judul' => 'Laskar Pelangi',
                'pengarang' => 'Andrea Hirata',
                'penerbit' => 'Bentang Pustaka',
                'tahun' => 2005,
                'jenis' => 'Fiksi',
                'rak' => 'A-01',
                'stok' => 3,
                'sinopsis' => 'Novel tentang perjuangan anak-anak Belitung untuk mendapatkan pendidikan.',
                'gambar' => null,
            ],
            [
                'judul' => 'Bumi Manusia',
                'pengarang' => 'Pramoedya Ananta Toer',
                'penerbit' => 'Hasta Mitra',
                'tahun' => 1980,
                'jenis' => 'Fiksi',
                'rak' => 'A-02',
                'stok' => 1,
                'sinopsis' => 'Novel sejarah tentang kehidupan di masa kolonial Belanda.',
                'gambar' => null,
            ],
            [
                'judul' => 'Matematika Dasar',
                'pengarang' => 'Tim Erlangga',
                'penerbit' => 'Erlangga',
                'tahun' => 2020,
                'jenis' => 'Referensi',
                'rak' => 'B-01',
                'stok' => 8,
                'sinopsis' => 'Buku panduan matematika untuk tingkat SMA.',
                'gambar' => null,
            ],
        ];

        foreach ($bukus as $buku) {
            Buku::create($buku);
        }
    }
}

