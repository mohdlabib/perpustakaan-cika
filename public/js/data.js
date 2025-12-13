/**
 * ============================================================================
 * FILE INI SUDAH TIDAK DIGUNAKAN LAGI!
 * ============================================================================
 *
 * Semua data sekarang disimpan di database MySQL dan diakses melalui API.
 *
 * Data yang sebelumnya ada di sini:
 * - Buku (books) -> Sekarang di tabel 'bukus' via /api/buku
 * - Siswa (siswa) -> Sekarang di tabel 'siswas' via /api/siswa
 * - Peminjaman (peminjaman) -> Sekarang di tabel 'peminjamen' via /api/peminjaman
 * - Pengembalian (pengembalian) -> Sekarang di tabel 'pengembalians' via /api/pengembalian
 * - Kunjungan (kunjungan) -> Sekarang di tabel 'kunjungans' via /api/kunjungan
 *
 * File ini dipertahankan hanya untuk kompatibilitas sementara.
 * Anda dapat menghapus file ini dan referensinya di layout setelah memastikan
 * semua fitur berjalan dengan baik menggunakan database.
 * ============================================================================
 */

// Helper Functions yang masih digunakan
const DataHelpers = {
    processImageFile(fileInput) {
        return new Promise((resolve) => {
            const file = fileInput.files[0];
            if (!file) {
                resolve(null);
                return;
            }

            if (file.size > 5 * 1024 * 1024) {
                alert('Ukuran file terlalu besar! Maksimal 5MB.');
                resolve(null);
                return;
            }

            const reader = new FileReader();
            reader.onload = function(e) {
                resolve(e.target.result);
            };
            reader.readAsDataURL(file);
        });
    }
};