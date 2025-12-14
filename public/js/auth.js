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
    console.log('[Auth] getAuthHeaders called, token exists:', !!token);
    if (token) {
      return {
        'Authorization': `Bearer ${token}`
      };
    }
    return {};
  },

  // Login via API - menggunakan email dan password
  async loginViaAPI(email, password) {
    console.log('[Auth] loginViaAPI called with email:', email);
    try {
      const response = await fetch('/api/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify({
          email: email,
          password: password
        })
      });

      console.log('[Auth] API response status:', response.status);
      const data = await response.json();
      console.log('[Auth] API response:', data);

      if (!response.ok) {
        return { success: false, message: data.message || 'Login gagal' };
      }

      // Store token and role
      const token = data.data.token;
      console.log('[Auth] Token received, length:', token ? token.length : 0);

      localStorage.setItem('authToken', token);
      localStorage.setItem('userRole', 'petugas');
      this.token = token;
      this.currentRole = 'petugas';

      console.log('[Auth] Token saved to localStorage');
      return { success: true };
    } catch (error) {
      console.error('[Auth] Login error:', error);
      return { success: false, message: 'Terjadi kesalahan saat login: ' + error.message };
    }
  },

  // Tampilkan dashboard sesuai role
  showDashboard(role) {
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

  // Handle login form submission
  async handleLogin() {
    const usernameInput = document.getElementById('loginUsername').value.trim();
    const passwordInput = document.getElementById('loginPassword').value;

    console.log('[Auth] handleLogin called, username:', usernameInput);

    // Skenario 1: Login sebagai siswa (input kosong)
    if (usernameInput === '' && passwordInput === '') {
      console.log('[Auth] Empty credentials - logging in as siswa');
      localStorage.setItem('userRole', 'siswa');
      localStorage.removeItem('authToken'); // Siswa tidak perlu token
      this.showDashboard('siswa');
      return;
    }

    // Skenario 2: Login sebagai petugas via API
    // Konversi username 'admin' ke email 'admin@perpus.com'
    let email = usernameInput;
    if (usernameInput === 'admin') {
      email = 'admin@perpus.com';
    } else if (!usernameInput.includes('@')) {
      // Jika bukan email, anggap gagal
      alert('Masukkan email yang valid atau gunakan username "admin"');
      return;
    }

    console.log('[Auth] Attempting API login with email:', email);
    const result = await this.loginViaAPI(email, passwordInput);

    if (result.success) {
      console.log('[Auth] Login successful, showing petugas dashboard');
      this.showDashboard('petugas');
    } else {
      console.log('[Auth] Login failed:', result.message);
      alert(result.message || 'Username atau Password salah!');
    }
  },

  // Logout
  async logout() {
    console.log('[Auth] Logout called');
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
        console.log('[Auth] Logout API called');
      } catch (error) {
        console.error('[Auth] Logout API error:', error);
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

    console.log('[Auth] Session cleared');
  },

  // Restore session saat halaman dimuat
  restoreSession() {
    const savedRole = localStorage.getItem('userRole');
    const savedToken = localStorage.getItem('authToken');

    console.log('[Auth] restoreSession - role:', savedRole, 'hasToken:', !!savedToken);

    // For petugas role, require a valid token
    if (savedRole === 'petugas') {
      if (!savedToken) {
        console.log('[Auth] Petugas without token, requiring re-login');
        localStorage.removeItem('userRole');
        return;
      }
      this.currentRole = savedRole;
      this.token = savedToken;
      this.showDashboard(savedRole);
    } else if (savedRole === 'siswa') {
      this.currentRole = savedRole;
      this.showDashboard(savedRole);
    }
  }
};

window.Auth = Auth;