<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta name="csrf-token" content="{{ csrf_token() }}">

  <title>Sistem Perpustakaan Digital</title>

  <!-- Tailwind & Fonts -->
  <script src="https://cdn.tailwindcss.com"></script>
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap" rel="stylesheet">
  <link href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css" rel="stylesheet">
  
  <!-- CSS Lokal -->
  <link rel="stylesheet" href="{{ asset('css/style.css') }}">
</head>
<body class="app-body">

  <!-- Login Screen -->
  <div id="loginScreen" class="min-h-screen flex items-center justify-center p-4" style="background:#D0EAFB;">
    <div class="bg-white rounded-2xl shadow-2xl p-8 w-full max-w-md fade-in mx-4">
      <div class="text-center mb-8">
        <div class="bg-[#A1C7DF] w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4">
          <i class="fas fa-book-open text-3xl text-black-600"></i>
        </div>
        <h1 class="text-3xl font-bold text-gray-800 mb-2">Sistem Perpustakaan</h1>
      </div>
      <form id="mainLoginForm" class="space-y-6">
        <div>
            <label for="loginUsername" class="block text-sm font-medium text-gray-700 mb-2"></label>
            <input type="text" id="loginUsername" placeholder="Masukkan Username" class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500">
        </div>
        <div>
            <label for="loginPassword" class="block text-sm font-medium text-gray-700 mb-2"></label>
            <input type="password" id="loginPassword" placeholder="Masukkan Password" class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500">
        </div>
        <div>
          <button type="submit" class="w-full bg-[#A1C7DF] hover:bg-[#8FB9D4] text-black font-semibold py-3 px-6 rounded-xl transition duration-300">
            Login
          </button>
        </div>
      </form>
    </div>
  </div>

  <!-- Petugas Dashboard -->
  <div id="petugasDashboard" class="hidden min-h-screen">
    <header class="bg-white shadow-sm border-b border-gray-200 fixed top-0 w-full z-40">
      <div class="flex items-center justify-between px-6 h-20">
        <div class="flex items-center space-x-4">
          <!-- Tombol Hamburger untuk Mobile -->
          <button onclick="toggleSidebar()" class="text-gray-600">
            <i class="fas fa-bars text-xl"></i>
          </button>
          <div>
            <h1 class="text-xl font-bold text-gray-800">Petugas</h1>
            <p class="text-xs text-gray-600">Sistem Perpustakaan</p>
          </div>
        </div>
        <button onclick="Auth.logout()" class="bg-red-500 hover:bg-red-600 text-white text-sm px-4 py-2 rounded-lg transition duration-200">
          <i class="fas fa-sign-out-alt mr-2"></i>Keluar
        </button>
      </div>
    </header>

    <!-- Wrapper untuk konten di bawah header -->
    <div class="pt-20 w-full">
      <div class="flex">
        <!-- Sidebar -->
        <aside id="sidebar" class="fixed inset-y-0 left-0 bg-gray-50 shadow-lg w-64 min-h-screen transform -translate-x-full transition-transform duration-300 ease-in-out z-30 pt-20">
          <nav class="p-4 space-y-2">
            <button onclick="Navigation.showPetugasSection('buku')" class="sidebar-item active w-full text-left px-4 py-3 rounded-lg flex items-center space-x-3">
              <i class="fas fa-book"></i><span>Data Buku</span>
            </button>
            <button onclick="Navigation.showPetugasSection('siswa_petugas')" class="sidebar-item w-full text-left px-4 py-3 rounded-lg flex items-center space-x-3">
              <i class="fas fa-user-graduate"></i><span>Data Siswa</span>
            </button>
            <button onclick="Navigation.showPetugasSection('peminjaman')" class="sidebar-item w-full text-left px-4 py-3 rounded-lg flex items-center space-x-3">
              <i class="fas fa-hand-holding"></i><span>Peminjaman</span>
            </button>
            <button onclick="Navigation.showPetugasSection('pengembalian')" class="sidebar-item w-full text-left px-4 py-3 rounded-lg flex items-center space-x-3">
              <i class="fas fa-undo"></i><span>Pengembalian</span>
            </button>
            <button onclick="Navigation.showPetugasSection('kunjungan')" class="sidebar-item w-full text-left px-4 py-3 rounded-lg flex items-center space-x-3">
              <i class="fas fa-users"></i><span>Data Kunjungan</span>
            </button>
            <!-- <button onclick="Navigation.showPetugasSection('laporan')" class="sidebar-item w-full text-left px-4 py-3 rounded-lg flex items-center space-x-3">
              <i class="fas fa-chart-bar"></i><span>Laporan</span>
            </button> -->
          </nav>
        </aside>

        <!-- Main Content -->
        <main id="mainContentArea" class="flex-1 p-4 md:p-6 transition-all duration-300 ease-in-out w-full">
          <div id="petugasContent"></div>
        </main>
      </div>
    </div>
  </div>

  <!-- Siswa Dashboard -->
  <div id="siswaDashboard" class="hidden min-h-screen">
    <header class="bg-white shadow-sm border-b border-gray-200 fixed top-0 w-full z-40">
      <div class="flex items-center justify-between px-6 h-20">
        <div class="flex items-center space-x-4">
          <div class="bg-green-100 w-10 h-10 rounded-lg flex items-center justify-center">
            <i class="fas fa-graduation-cap text-green-600"></i>
          </div>
          <div>
            <h1 class="text-xl font-bold text-gray-800">Kunjungan</h1>
            <p class="text-xs text-gray-600">Sistem Perpustakaan</p>
          </div>
        </div>
        <div class="flex items-center space-x-4">
          <button onclick="Auth.logout()" class="bg-red-500 hover:bg-red-600 text-white text-sm px-4 py-2 rounded-lg transition duration-200 flex items-center whitespace-nowrap">
          <i class="fas fa-sign-out-alt mr-2"></i>Keluar
        </button>
        </div>
      </div>
    </header>
    <div id="siswaContent" class="pt-20"></div> <!-- Menambahkan padding-top untuk memberi ruang bagi header fixed -->
  </div>

  <!-- Modals -->
  <div id="modalsContainer"></div>

  {{-- Semua file JavaScript dimuat di akhir untuk performa yang lebih baik. --}}
  <!-- JavaScript Global & Helper -->
  <script src="{{ asset('js/data.js') }}"></script>
  <script src="{{ asset('js/auth.js') }}"></script>
  <script src="{{ asset('js/navigation.js') }}"></script>
  <script src="{{ asset('js/app.js') }}"></script>

  <!-- JavaScript untuk setiap Halaman (Pages) -->
  <script src="{{ asset('js/pages/siswa.js') }}"></script>
  <script src="{{ asset('js/pages/buku.js') }}"></script>
  <script src="{{ asset('js/pages/data_siswa.js') }}"></script>
  <script src="{{ asset('js/pages/peminjaman.js') }}"></script>
  <script src="{{ asset('js/pages/pengembalian.js') }}"></script>
  <script src="{{ asset('js/pages/kunjungan.js') }}"></script>
</body>
</html>
