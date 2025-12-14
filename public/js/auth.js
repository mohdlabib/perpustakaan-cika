const Auth = {
  currentRole: null,
  token: null,

  // Get stored token from localStorage
  getToken() {
    return localStorage.getItem('authToken');
  },

  // Get auth headers for API calls
  getAuthHeaders() {
    const token = this.getToken();
    if (token) {
      return {
        'Authorization': `Bearer ${token}`
      };
    }
    return {};
  },

  // Login as petugas (calls real API)
  async loginPetugas(password) {
    try {
      const response = await fetch('/api/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify({
          email: 'admin@perpus.com',
          password: password
        })
      });

      const data = await response.json();

      if (!response.ok) {
        return { success: false, message: data.message || 'Login gagal' };
      }

      // Store token and role
      localStorage.setItem('authToken', data.data.token);
      localStorage.setItem('userRole', 'petugas');
      this.token = data.data.token;
      this.currentRole = 'petugas';

      return { success: true };
    } catch (error) {
      console.error('Login error:', error);
      return { success: false, message: 'Terjadi kesalahan saat login' };
    }
  },

  // Login flow based on role
  async login(role) {
    this.currentRole = role;

    document.getElementById("loginScreen").classList.add("hidden");
    if (role === "petugas") {
      document.getElementById("petugasDashboard").classList.remove("hidden");
      Navigation.showPetugasSection('buku');
    } else if (role === "siswa") {
      document.getElementById("siswaDashboard").classList.remove("hidden");
      loadSiswaBooksGrid();
    }
  },

  async handleLogin() {
    const usernameInput = document.getElementById('loginUsername').value;
    const passwordInput = document.getElementById('loginPassword').value;

    // Skenario 1: Login sebagai siswa (input kosong)
    if (usernameInput === '' && passwordInput === '') {
      localStorage.setItem('userRole', 'siswa');
      this.login('siswa');
      return;
    }

    // Skenario 2: Login sebagai petugas via API
    if (usernameInput === 'admin') {
      const result = await this.loginPetugas(passwordInput);
      if (result.success) {
        this.login('petugas');
      } else {
        alert(result.message || 'Username atau Password salah!');
      }
      return;
    }

    // Skenario 3: Gagal login (username tidak dikenal)
    alert('Username atau Password salah!');
  },

  async logout() {
    // Call logout API if we have a token
    const token = this.getToken();
    if (token) {
      try {
        await fetch('/api/logout', {
          method: 'POST',
          headers: {
            'Accept': 'application/json',
            'Authorization': `Bearer ${token}`
          }
        });
      } catch (error) {
        console.error('Logout API error:', error);
      }
    }

    // Clear local state
    this.currentRole = null;
    this.token = null;
    localStorage.removeItem('userRole');
    localStorage.removeItem('authToken');

    document.getElementById("loginScreen").classList.remove("hidden");
    document.getElementById("petugasDashboard").classList.add("hidden");
    document.getElementById("siswaDashboard").classList.add("hidden");
    document.getElementById('mainLoginForm').reset();
  },

  // Restore session saat halaman dimuat
  restoreSession() {
    const savedRole = localStorage.getItem('userRole');
    const savedToken = localStorage.getItem('authToken');
    
    if (savedRole) {
      this.currentRole = savedRole;
      this.token = savedToken;
      this.login(savedRole);
    }
  }
};

// Restore session saat halaman dimuat
document.addEventListener('DOMContentLoaded', function() {
  Auth.restoreSession();
});

window.Auth = Auth;