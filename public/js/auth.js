const Auth = {
  currentRole: null,

  login(role) {
    this.currentRole = role;
    localStorage.setItem('userRole', role);

    document.getElementById("loginScreen").classList.add("hidden");
    if (role === "petugas") {
      document.getElementById("petugasDashboard").classList.remove("hidden");
      Navigation.showPetugasSection('buku'); // Arahkan ke halaman default petugas
    } else if (role === "siswa") {
      document.getElementById("siswaDashboard").classList.remove("hidden");
      loadSiswaBooksGrid(); // <-- arahkan ke halaman siswa.js
    }
  },

  handleLogin() {
    const usernameInput = document.getElementById('loginUsername').value;
    const passwordInput = document.getElementById('loginPassword').value;

    // Skenario 1: Login sebagai siswa (input kosong)
    if (usernameInput === '' && passwordInput === '') {
      this.login('siswa');
    }
    // Skenario 2: Login sebagai petugas (kredensial benar)
    else if (usernameInput === 'admin' && passwordInput === '123456') {
      this.login('petugas');
    } else {
      // Skenario 3: Gagal login (input salah)
      alert('Username atau Password salah!');
    }
  },

  logout() {
    this.currentRole = null;
    localStorage.removeItem('userRole');

    document.getElementById("loginScreen").classList.remove("hidden");
    document.getElementById("petugasDashboard").classList.add("hidden");
    document.getElementById("siswaDashboard").classList.add("hidden");
    // Bersihkan form login utama saat logout
    document.getElementById('mainLoginForm').reset();
  },

  // Restore session saat halaman dimuat
  restoreSession() {
    const savedRole = localStorage.getItem('userRole');
    if (savedRole) {
      this.login(savedRole);
    }
  }
};

// Restore session saat halaman dimuat
document.addEventListener('DOMContentLoaded', function() {
  Auth.restoreSession();
});

window.Auth = Auth;