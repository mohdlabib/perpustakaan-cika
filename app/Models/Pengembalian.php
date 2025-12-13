<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Pengembalian extends Model
{
    use HasFactory;

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'peminjaman_id',
        'tanggal_pengembalian',
        'denda',
        'keterangan',
    ];

    /**
     * The attributes that should be cast.
     *
     * @var array<string, string>
     */
    protected $casts = [
        'tanggal_pengembalian' => 'date',
    ];

    /**
     * Get the peminjaman that owns this pengembalian.
     */
    public function peminjaman()
    {
        return $this->belongsTo(Peminjaman::class, 'peminjaman_id');
    }

    /**
     * Format tanggal untuk serialisasi JSON
     */
    protected function serializeDate(\DateTimeInterface $date): string
    {
        return $date->format('d-m-Y');
    }
}
