// Initialize App
document.addEventListener('DOMContentLoaded', function() {
    // Restore session dari localStorage
    Auth.restoreSession();
    setupMainLoginForm();
});

// Modal Functions
function showModal(modalId) {
    document.getElementById(modalId).classList.remove('hidden');
}

function closeModal(modalId) {
    document.getElementById(modalId).classList.add('hidden');
}

// Sidebar Toggle for Mobile
function toggleSidebar() {
  const sidebar = document.getElementById('sidebar');
  const mainContent = document.getElementById('mainContentArea');

  sidebar.classList.toggle('-translate-x-full');

  // Cek jika sidebar sekarang terlihat (tidak memiliki kelas -translate-x-full)
  if (!sidebar.classList.contains('-translate-x-full')) {
    // Sidebar terbuka, tambahkan margin ke konten utama di layar medium ke atas
    mainContent.classList.add('md:ml-64');
  } else {
    // Sidebar tertutup, hapus margin
    mainContent.classList.remove('md:ml-64');
  }
}

function setupMainLoginForm() {
    const form = document.getElementById('mainLoginForm');
    if (form) {
        form.addEventListener('submit', function(e) {
            e.preventDefault(); // Mencegah form dari reload halaman
            Auth.handleLogin();
        });
    }
}