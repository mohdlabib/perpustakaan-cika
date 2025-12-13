<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Peminjaman extends Model
{
    use HasFactory;

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'siswa_id',
        'buku_id',
        'tanggal_peminjaman',
        'tanggal_kembali_rencana',
        'jumlah',
    ];

    /**
     * The attributes that should be cast.
     *
     * @var array<string, string>
     */
    protected $casts = [
        'tanggal_peminjaman' => 'date',
        'tanggal_kembali_rencana' => 'date',
    ];

    /**
     * Get the siswa that owns this peminjaman.
     */
    public function siswa()
    {
        return $this->belongsTo(Siswa::class, 'siswa_id');
    }

    /**
     * Get the buku that owns this peminjaman.
     */
    public function buku()
    {
        return $this->belongsTo(Buku::class, 'buku_id');
    }

    /**
     * Get the pengembalian for this peminjaman.
     */
    public function pengembalian()
    {
        return $this->hasOne(Pengembalian::class, 'peminjaman_id');
    }

    /**
     * Format tanggal untuk serialisasi JSON
     */
    protected function serializeDate(\DateTimeInterface $date): string
    {
        return $date->format('d-m-Y');
    }
}
