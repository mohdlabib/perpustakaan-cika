<?php

namespace Database\Seeders;

use App\Models\Kunjungan;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class KunjunganSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $kunjungans = [
            [
                'nama' => 'Andi Pratama',
                'nis' => '1001',
                'kelas' => 'XI',
                'tanggal_kunjungan' => '2023-10-26',
                'jam_masuk' => '10:00:00',
                'jam_keluar' => null,
            ],
            [
                'nama' => 'Budi Santoso',
                'nis' => '1002',
                'kelas' => 'X',
                'tanggal_kunjungan' => '2023-10-26',
                'jam_masuk' => '10:15:00',
                'jam_keluar' => null,
            ],
            [
                'nama' => 'Citra Lestari',
                'nis' => '1003',
                'kelas' => 'XII',
                'tanggal_kunjungan' => '2023-10-27',
                'jam_masuk' => '11:00:00',
                'jam_keluar' => null,
            ],
        ];

        foreach ($kunjungans as $kunjungan) {
            Kunjungan::firstOrCreate(
                ['nis' => $kunjungan['nis'], 'tanggal_kunjungan' => $kunjungan['tanggal_kunjungan'], 'jam_masuk' => $kunjungan['jam_masuk']],
                $kunjungan
            );
        }
    }
}

