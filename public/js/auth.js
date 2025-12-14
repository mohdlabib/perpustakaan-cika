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
    console.log('Attempting login with password:', password ? '***' : '(empty)');
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

      console.log('Login response status:', response.status);
      const data = await response.json();
      console.log('Login response data:', data);

      if (!response.ok) {
        return { success: false, message: data.message || 'Login gagal' };
      }

      // Store token and role
      const token = data.data.token;
      console.log('Token received:', token ? 'Yes (length: ' + token.length + ')' : 'No');

      localStorage.setItem('authToken', token);
      localStorage.setItem('userRole', 'petugas');
      this.token = token;
      this.currentRole = 'petugas';

      console.log('Login successful, token stored in localStorage');
      console.log('Verify stored token:', localStorage.getItem('authToken') ? 'Yes' : 'No');

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

    // For petugas role, require a valid token
    if (savedRole === 'petugas') {
      if (!savedToken) {
        // No token found, clear session and require re-login
        console.log('Petugas session without token, requiring re-login');
        localStorage.removeItem('userRole');
        return;
      }
      this.currentRole = savedRole;
      this.token = savedToken;
      this.login(savedRole);
    } else if (savedRole === 'siswa') {
      // Siswa doesn't need token
      this.currentRole = savedRole;
      this.login(savedRole);
    }
  }
};

window.Auth = Auth;