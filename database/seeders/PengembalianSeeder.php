<?php

namespace Database\Seeders;

use App\Models\Pengembalian;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class PengembalianSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $pengembalians = [
            [
                'peminjaman_id' => 1,
                'tanggal_pengembalian' => '2025-10-17',
                'denda' => 0,
                'keterangan' => 'Dikembalikan tepat waktu',
            ],
        ];

        foreach ($pengembalians as $pengembalian) {
            Pengembalian::create($pengembalian);
        }
    }
}

