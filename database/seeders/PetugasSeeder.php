<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class PetugasSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        User::firstOrCreate(
            // Kunci unik untuk mencari data
            ['email' => 'admin@perpus.com'],
            // Data yang akan dibuat jika belum ada
            [
                'name' => 'Admin Petugas',
                'username' => 'admin',
                'password' => Hash::make('123456'),
                'role' => 'petugas',
            ]
        );
    }
}