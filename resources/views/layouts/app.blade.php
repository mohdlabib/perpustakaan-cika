<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta name="csrf-token" content="{{ csrf_token() }}">

  <title>@yield('title', 'Sistem Perpustakaan Digital')</title>

  <!-- Tailwind & Fonts -->
  <script src="https://cdn.tailwindcss.com"></script>
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap" rel="stylesheet">
  <link href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css" rel="stylesheet">
  
  <!-- CSS Lokal -->
  <link rel="stylesheet" href="{{ asset('css/style.css') }}">
</head>
<body class="app-body">

  {{-- Di sinilah konten dari file Blade anak (seperti index.blade.php) akan disisipkan. --}}
  @yield('content')

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
