# Script untuk testing API Perpustakaan JEKI
# Jalankan dengan: powershell -ExecutionPolicy Bypass -File test_api.ps1

$baseUrl = "http://localhost:8000/api"

Write-Host "=== Testing API Perpustakaan JEKI ===" -ForegroundColor Green
Write-Host ""

# Test 1: Get All Books (tanpa auth - seharusnya error)
Write-Host "Test 1: Get All Books (tanpa auth)" -ForegroundColor Yellow
try {
    $response = Invoke-RestMethod -Uri "$baseUrl/buku" -Method Get
    Write-Host "Response: $($response | ConvertTo-Json)" -ForegroundColor Red
} catch {
    Write-Host "Error (Expected): $($_.Exception.Message)" -ForegroundColor Green
}
Write-Host ""

# Test 2: Get All Kunjungan (publik)
Write-Host "Test 2: Get All Kunjungan (publik)" -ForegroundColor Yellow
try {
    $response = Invoke-RestMethod -Uri "$baseUrl/kunjungan" -Method Get
    Write-Host "Success! Found $($response.Count) kunjungan" -ForegroundColor Green
    Write-Host "Response: $($response | ConvertTo-Json -Depth 2)" -ForegroundColor Cyan
} catch {
    Write-Host "Error: $($_.Exception.Message)" -ForegroundColor Red
}
Write-Host ""

# Test 3: Create Kunjungan (publik)
Write-Host "Test 3: Create Kunjungan (publik)" -ForegroundColor Yellow
$kunjunganData = @{
    nama = "Test Pengunjung"
    nis = "999"
    kelas = "X-Test"
    tanggal_kunjungan = "2025-10-16"
    jam_masuk = "10:00:00"
    jam_keluar = "14:00:00"
} | ConvertTo-Json

try {
    $response = Invoke-RestMethod -Uri "$baseUrl/kunjungan" -Method Post `
        -ContentType "application/json" `
        -Body $kunjunganData
    Write-Host "Success! Created kunjungan with ID: $($response.id)" -ForegroundColor Green
    Write-Host "Response: $($response | ConvertTo-Json)" -ForegroundColor Cyan
} catch {
    Write-Host "Error: $($_.Exception.Message)" -ForegroundColor Red
}
Write-Host ""

# Test 4: Get All Siswa (publik)
Write-Host "Test 4: Get All Siswa (publik)" -ForegroundColor Yellow
try {
    $response = Invoke-RestMethod -Uri "$baseUrl/siswa" -Method Get
    Write-Host "Success! Found $($response.Count) siswa" -ForegroundColor Green
    Write-Host "Response: $($response | ConvertTo-Json -Depth 2)" -ForegroundColor Cyan
} catch {
    Write-Host "Error: $($_.Exception.Message)" -ForegroundColor Red
}
Write-Host ""

# Test 5: Login Siswa
Write-Host "Test 5: Login Siswa" -ForegroundColor Yellow
$loginData = @{
    nis = "001"
} | ConvertTo-Json

try {
    $response = Invoke-RestMethod -Uri "$baseUrl/siswa/login" -Method Post `
        -ContentType "application/json" `
        -Body $loginData
    Write-Host "Success! Login siswa berhasil" -ForegroundColor Green
    Write-Host "Response: $($response | ConvertTo-Json)" -ForegroundColor Cyan
} catch {
    Write-Host "Error: $($_.Exception.Message)" -ForegroundColor Red
}
Write-Host ""

Write-Host "=== Testing Selesai ===" -ForegroundColor Green

