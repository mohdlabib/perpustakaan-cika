async function loadSiswaBooksGrid() {
    const grid = document.getElementById('siswaContent');
    if (!grid) return;

    grid.innerHTML = `
      <div class="container mx-auto p-4 md:p-8">
        <div class="text-center mb-8">
            <h1 class="text-3xl md:text-4xl font-bold text-gray-800">Katalog Buku Perpustakaan</h1>
            <p class="text-gray-600 mt-2">Jelajahi koleksi buku kami</p>
        </div>

        <!-- Tombol Isi Kunjungan -->
        <div class="mb-6 text-center">
            <button onclick="showFormKunjungan()" class="bg-[#A1C7DF] hover:bg-[#5A9CC5] text-black font-semibold py-3 px-8 rounded-lg transition duration-300 inline-flex items-center">
                <i class="fas fa-clipboard-check mr-2"></i>
                Isi Form Kunjungan
            </button>
        </div>

        <!-- Search Bar -->
        <div class="mb-6 max-w-2xl mx-auto">
            <div class="relative">
                <input type="text" id="searchBukuSiswa" onkeyup="filterSiswaBooks()" placeholder="Cari buku berdasarkan judul, pengarang, atau penerbit..." class="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent">
                <i class="fas fa-search absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"></i>
            </div>
        </div>

        <!-- Grid Buku -->
        <div id="bukuGridSiswa" class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            <div class="col-span-full text-center py-8 text-gray-500">Memuat data buku...</div>
        </div>
      </div>

      <!-- Modal Form Kunjungan -->
      <div id="formKunjunganModal" class="hidden fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
        <div class="bg-white rounded-xl shadow-2xl w-full max-w-2xl">
            <div class="p-6">
                <div class="flex items-center justify-between mb-6">
                    <h3 class="text-2xl font-bold text-gray-800">Form Kunjungan</h3>
                    <button onclick="closeFormKunjungan()" class="text-gray-400 hover:text-gray-600">
                        <i class="fas fa-times text-xl"></i>
                    </button>
                </div>

                <form id="formKunjunganSiswa" class="space-y-4">
                    <div>
                        <label for="nama" class="block text-sm font-medium text-gray-700 mb-2">Nama Lengkap</label>
                        <input type="text" id="nama" placeholder="Masukkan Nama Lengkap" required class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500">
                    </div>
                    <div>
                        <label for="nis" class="block text-sm font-medium text-gray-700 mb-2">NIS</label>
                        <input type="text" id="nis" placeholder="Masukkan NIS (Nomor Induk Siswa)" required class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500">
                    </div>
                    <div>
                        <label for="kelas" class="block text-sm font-medium text-gray-700 mb-2">Kelas</label>
                        <select id="kelas" required class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500">
                            <option value="">Pilih Kelas</option>
                            <option value="X">X</option>
                            <option value="XI">XI</option>
                            <option value="XII">XII</option>
                        </select>
                    </div>
                    <div>
                        <label for="waktu" class="block text-sm font-medium text-gray-700 mb-2">Waktu Kunjungan</label>
                        <input type="datetime-local" id="waktu" required class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500">
                    </div>
                    <div class="flex justify-end space-x-3 pt-4">
                        <button type="button" onclick="closeFormKunjungan()" class="px-4 py-2 text-gray-600 border border-gray-300 rounded-lg hover:bg-gray-50">
                            Batal
                        </button>
                        <button type="submit" class="px-4 py-2 bg-[#A1C7DF] hover:bg-[#5A9CC5] text-black font-semibold rounded-lg transition duration-300">
                            Submit Data
                        </button>
                    </div>
                </form>
            </div>
        </div>
      </div>
    `;

    // Load buku dari database
    await loadBukuForSiswa();

    // Setup form kunjungan
    setupFormKunjungan();
}

async function loadBukuForSiswa() {
    const grid = document.getElementById('bukuGridSiswa');
    if (!grid) return;

    try {
        const response = await fetch('/api/buku');
        if (!response.ok) throw new Error('Gagal memuat data buku');

        const books = await response.json();
        grid.innerHTML = '';

        if (!books || books.length === 0) {
            grid.innerHTML = '<div class="col-span-full text-center py-8 text-gray-500">Tidak ada buku tersedia</div>';
            return;
        }

        books.forEach(book => {
            const imageContent = book.gambar
                ? `<img src="${book.gambar}" alt="${book.judul}" class="w-full h-48 object-cover">`
                : `<div class="w-full h-48 bg-[#A1C7DF] flex items-center justify-center">
                    <i class="fas fa-book-open text-white text-4xl"></i>
                   </div>`;

            const status = book.stok > 0 ? 'Tersedia' : 'Tidak Tersedia';
            const statusColor = book.stok > 0 ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800';

            const card = document.createElement('div');
            card.className = 'bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition duration-300 book-card';
            card.innerHTML = `
                ${imageContent}
                <div class="p-4">
                    <h3 class="font-bold text-lg text-gray-800 mb-2 line-clamp-2">${book.judul}</h3>
                    <p class="text-sm text-gray-600 mb-1"><i class="fas fa-user mr-1"></i>${book.pengarang || '-'}</p>
                    <p class="text-sm text-gray-600 mb-1"><i class="fas fa-building mr-1"></i>${book.penerbit || '-'}</p>
                    <p class="text-sm text-gray-600 mb-2"><i class="fas fa-calendar mr-1"></i>${book.tahun || '-'}</p>
                    <div class="flex items-center justify-between mt-3">
                        <span class="px-2 py-1 text-xs font-semibold rounded-full ${statusColor}">
                            ${status}
                        </span>
                        <span class="text-sm text-gray-600">Stok: ${book.stok}</span>
                    </div>
                </div>
            `;
            grid.appendChild(card);
        });
    } catch (error) {
        console.error('Error loading buku:', error);
        grid.innerHTML = '<div class="col-span-full text-center py-8 text-red-500">Gagal memuat data buku</div>';
    }
}

function filterSiswaBooks() {
    const searchTerm = document.getElementById('searchBukuSiswa').value.toLowerCase();
    const cards = document.querySelectorAll('.book-card');

    cards.forEach(card => {
        const text = card.textContent.toLowerCase();
        card.style.display = text.includes(searchTerm) ? '' : 'none';
    });
}

function showFormKunjungan() {
    const modal = document.getElementById('formKunjunganModal');
    if (modal) {
        modal.classList.remove('hidden');

        // Set default waktu sekarang
        const waktuInput = document.getElementById('waktu');
        if (waktuInput) {
            const now = new Date();
            const pad = n => n.toString().padStart(2, '0');
            const local = `${now.getFullYear()}-${pad(now.getMonth()+1)}-${pad(now.getDate())}T${pad(now.getHours())}:${pad(now.getMinutes())}`;
            waktuInput.value = local;
        }
    }
}

function closeFormKunjungan() {
    const modal = document.getElementById('formKunjunganModal');
    if (modal) {
        modal.classList.add('hidden');
    }
}

function setupFormKunjungan() {
    const form = document.getElementById('formKunjunganSiswa');
    if (form) {
        form.onsubmit = async function(e) {
            e.preventDefault();

            const waktuValue = document.getElementById('waktu').value;
            const [tanggal, waktu] = waktuValue.split('T');

            const newVisit = {
                nama: document.getElementById('nama').value,
                nis: document.getElementById('nis').value,
                kelas: document.getElementById('kelas').value,
                tanggal_kunjungan: tanggal,
                jam_masuk: waktu || null
            };

            try {
                const response = await fetch('/api/kunjungan', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'Accept': 'application/json'
                    },
                    body: JSON.stringify(newVisit)
                });

                const data = await response.json();

                if (!response.ok) {
                    alert(data.message || 'Gagal menyimpan data kunjungan');
                    return;
                }

                alert('Terima kasih, data kunjungan Anda sudah tercatat!');
                form.reset();
                closeFormKunjungan();
            } catch (error) {
                console.error('Error saving kunjungan:', error);
                alert('Terjadi kesalahan saat menyimpan data kunjungan');
            }
        };
    }
}