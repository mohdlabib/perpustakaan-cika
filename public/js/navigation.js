const Navigation = {
  showPetugasSection(page) {
    // Hapus semua active
    document.querySelectorAll('.sidebar-item').forEach(item => item.classList.remove('active'));
    // Aktifkan tombol yang diklik
    const btn = document.querySelector(`.sidebar-item[onclick*="${page}"]`);
    if (btn) btn.classList.add('active');

    // Render halaman ke #petugasContent
    switch (page) {
      case 'buku':
        renderBukuPage();
        break;
    case 'siswa_petugas': renderSiswaPetugasPage(); break;
      case 'peminjaman':
        renderPeminjamanPage();
        break;
      case 'pengembalian':
        renderPengembalianPage();
        break;
      case 'kunjungan':
        renderKunjunganPage();
        break;
    //   case 'laporan':
    //     renderLaporanPage();
    //     break;
    }
  }
};
window.Navigation = Navigation;