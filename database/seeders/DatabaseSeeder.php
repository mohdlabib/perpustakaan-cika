<?php

namespace Database\Seeders;

// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // Baris ini akan memanggil dan menjalankan seeder lain yang terdaftar di dalam array.
        $this->call([
            PetugasSeeder::class,
            SiswaSeeder::class,
            BukuSeeder::class,
            KunjunganSeeder::class,
            PeminjamanSeeder::class,
            PengembalianSeeder::class,
        ]);
    }
}