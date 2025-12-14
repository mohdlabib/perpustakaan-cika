<?php

namespace Database\Seeders;

use App\Models\Siswa;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class SiswaSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $siswas = [
            [
                'nama' => 'Andi Pratama',
                'nis' => '1001',
                'kelas' => 'XI',
                'jurusan' => 'RPL',
            ],
            [
                'nama' => 'Budi Santoso',
                'nis' => '1002',
                'kelas' => 'X',
                'jurusan' => 'TKJ',
            ],
            [
                'nama' => 'Citra Lestari',
                'nis' => '1003',
                'kelas' => 'XII',
                'jurusan' => 'RPL',
            ],
            [
                'nama' => 'Dewi Anggraini',
                'nis' => '1004',
                'kelas' => 'XI',
                'jurusan' => 'TKJ',
            ],
            [
                'nama' => 'Eka Wijaya',
                'nis' => '1005',
                'kelas' => 'XII',
                'jurusan' => 'RPL',
            ],
            [
                'nama' => 'Fajar Nugroho',
                'nis' => '1006',
                'kelas' => 'X',
                'jurusan' => 'TKJ',
            ],
        ];

        foreach ($siswas as $siswa) {
            Siswa::firstOrCreate(
                ['nis' => $siswa['nis']],
                $siswa
            );
        }
    }
}

