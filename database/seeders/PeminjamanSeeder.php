<?php

namespace Database\Seeders;

use App\Models\Peminjaman;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class PeminjamanSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $peminjamans = [
            [
                'siswa_id' => 1,
                'buku_id' => 1,
                'tanggal_peminjaman' => '2025-10-10',
                'tanggal_kembali_rencana' => '2025-10-17',
                'jumlah' => 1,
            ],
            [
                'siswa_id' => 2,
                'buku_id' => 2,
                'tanggal_peminjaman' => '2025-10-12',
                'tanggal_kembali_rencana' => '2025-10-19',
                'jumlah' => 2,
            ],
            [
                'siswa_id' => 3,
                'buku_id' => 3,
                'tanggal_peminjaman' => '2025-10-14',
                'tanggal_kembali_rencana' => '2025-10-21',
                'jumlah' => 1,
            ],
        ];

        foreach ($peminjamans as $peminjaman) {
            Peminjaman::create($peminjaman);
        }
    }
}

