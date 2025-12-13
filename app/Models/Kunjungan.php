<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Kunjungan extends Model
{
    use HasFactory;

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'nama',
        'nis',
        'kelas',
        'tanggal_kunjungan',
        'jam_masuk',
        'jam_keluar',
    ];

    /**
     * The attributes that should be cast.
     *
     * @var array<string, string>
     */
    protected $casts = [
        'tanggal_kunjungan' => 'date',
    ];

    /**
     * Format tanggal_kunjungan untuk serialisasi JSON
     */
    protected function serializeDate(\DateTimeInterface $date): string
    {
        return $date->format('d-m-Y');
    }
}
