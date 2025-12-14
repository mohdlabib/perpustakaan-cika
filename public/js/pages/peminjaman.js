function renderPeminjamanPage() {
    const content = `
        <div class="bg-white rounded-xl shadow-sm p-6 mb-6 fade-in">
            <div class="flex items-center justify-between mb-6">
                <h2 class="text-xl font-bold text-gray-800">Kelola Peminjaman</h2>
                <button onclick="showAddPeminjamanModal()" class="bg-[#A1C7DF] hover:bg-[#5A9CC5] text-black text-sm px-4 py-2 rounded-lg transition duration-200 flex items-center whitespace-nowrap">
                    <i class="fas fa-plus mr-2"></i>Tambah
                </button>
            </div>

            <div class="mb-6">
                <div class="relative">
                    <input type="text" id="searchPeminjaman" onkeyup="searchPeminjaman()" placeholder="Cari peminjaman..." class="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent">
                    <i class="fas fa-search absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"></i>
                </div>
            </div>

            <div class="overflow-x-auto hide-scrollbar">
                <table class="w-full min-w-max">
                    <thead class="bg-gray-50">
                        <tr>
                            <th class="px-4 py-3 text-left text-sm font-semibold text-gray-600">Kode</th>
                            <th class="px-4 py-3 text-left text-sm font-semibold text-gray-600">Nama Peminjam</th>
                            <th class="px-4 py-3 text-left text-sm font-semibold text-gray-600">Judul Buku</th>
                            <th class="px-4 py-3 text-left text-sm font-semibold text-gray-600">Tanggal Pinjam</th>
                            <th class="px-4 py-3 text-left text-sm font-semibold text-gray-600">Tenggat</th>
                            <th class="px-4 py-3 text-left text-sm font-semibold text-gray-600">Aksi</th>
                        </tr>
                    </thead>
                    <tbody id="peminjamanTableBody" class="divide-y divide-gray-200"></tbody>
                </table>
            </div>
        </div>

        <!-- Add Peminjaman Modal -->
        <div id="addPeminjamanModal" class="hidden fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div class="bg-white rounded-xl shadow-2xl w-full max-w-2xl">
                <div class="p-6">
                    <div class="flex items-center justify-between mb-6">
                        <h3 class="text-xl font-bold text-gray-800">Tambah Peminjaman</h3>
                        <button onclick="closeModal('addPeminjamanModal')" class="text-gray-400 hover:text-gray-600">
                            <i class="fas fa-times text-xl"></i>
                        </button>
                    </div>
                    
                    <form id="addPeminjamanForm" class="space-y-4">
                        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <label class="block text-sm font-medium text-gray-700 mb-2">Nomor Buku</label>
                                <input type="text" id="peminjamanBookId" list="book-list" onchange="showBookDetails()" required placeholder="Ketik untuk mencari buku..." class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500">
                                <datalist id="book-list">
                                </datalist>
                            </div>
                            <div>
                                <label class="block text-sm font-medium text-gray-700 mb-2">Nama Peminjam</label>
                                <input type="text" id="peminjamanBorrower" list="borrower-list" required placeholder="Ketik untuk mencari siswa..." class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500">
                                <datalist id="borrower-list">
                                </datalist>
                            </div>
                            <div>
                                <label class="block text-sm font-medium text-gray-700 mb-2">Tanggal Peminjaman</label>
                                <input type="date" id="peminjamanDate" onchange="calculateDueDate()" required class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500">
                            </div>
                            <div
<div>
                                <label class="block text-sm font-medium text-gray-700 mb-2">Tenggat Pengembalian</label>
                                <input type="date" id="peminjamanDueDate" readonly class="w-full px-3 py-2 border border-gray-300 rounded-lg bg-gray-50">
                            </div>
                        </div>
                        <div id="bookDetails" class="hidden bg-blue-50 p-4 rounded-lg">
                            <h4 class="font-semibold text-blue-800 mb-2">Detail Buku:</h4>
                            <div id="bookDetailsContent"></div>
                        </div>
                        <div class="flex justify-end space-x-3 pt-4">
                            <button type="button" onclick="closeModal('addPeminjamanModal')" class="px-4 py-2 text-gray-600 border border-gray-300 rounded-lg hover:bg-gray-50">Batal</button>
                            <button type="submit" class="px-4 py-2 bg-[#A1C7DF] text-black rounded-lg hover:bg-[#5A9CC5]">Simpan Peminjaman</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>

        <!-- Edit Peminjaman Modal -->
        <div id="editPeminjamanModal" class="hidden fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div class="bg-white rounded-xl shadow-2xl w-full max-w-2xl">
                <div class="p-6">
                    <div class="flex items-center justify-between mb-6">
                        <h3 class="text-xl font-bold text-gray-800">Edit Peminjaman</h3>
                        <button onclick="closeModal('editPeminjamanModal')" class="text-gray-400 hover:text-gray-600">
                            <i class="fas fa-times text-xl"></i>
                        </button>
                    </div>
                    
                    <form id="editPeminjamanForm" class="space-y-4">
                        <input type="hidden" id="editPeminjamanCode">
                        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <label class="block text-sm font-medium text-gray-700 mb-2">Nomor Buku</label>
                                <input type="text" id="editPeminjamanBookId" list="edit-book-list" required placeholder="Ketik untuk mencari buku..." class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500">
                                <datalist id="edit-book-list">
                                </datalist>
                            </div>
                            <div>
                                <label class="block text-sm font-medium text-gray-700 mb-2">Nama Peminjam</label>
                                <input type="text" id="editPeminjamanBorrower" list="edit-borrower-list" required placeholder="Ketik untuk mencari siswa..." class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500">
                                <datalist id="edit-borrower-list">
                                </datalist>
                            </div>
                            <div>
                                <label class="block text-sm font-medium text-gray-700 mb-2">Tanggal Peminjaman</label>
                                <input type="date" id="editPeminjamanDate" onchange="calculateEditDueDate()" required class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500">
                            </div>
                            <div>
                                <label class="block text-sm font-medium text-gray-700 mb-2">Tenggat Pengembalian</label>
                                <input type="date" id="editPeminjamanDueDate" readonly class="w-full px-3 py-2 border border-gray-300 rounded-lg bg-gray-50">
                            </div>
                        </div>
                        <div class="flex justify-end space-x-3 pt-4">
                            <button type="button" onclick="closeModal('editPeminjamanModal')" class="px-4 py-2 text-gray-600 border border-gray-300 rounded-lg hover:bg-gray-50">Batal</button>
                            <button type="submit" class="px-4 py-2 bg-[#A1C7DF] text-black rounded-lg hover:bg-[#5A9CC5]">Update Peminjaman</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    `;

    document.getElementById('petugasContent').innerHTML = content;
    loadPeminjamanTable();
    setupPeminjamanForms();
}

async function loadPeminjamanTable() {
    const tbody = document.getElementById('peminjamanTableBody');
    tbody.innerHTML = '<tr><td colspan="6" class="text-center py-4">Memuat data...</td></tr>';

    try {
        const response = await fetch('/api/peminjaman', {
            headers: {
                'Accept': 'application/json',
                ...Auth.getAuthHeaders()
            }
        });
        if (!response.ok) throw new Error('Gagal memuat data peminjaman');

        const peminjamans = await response.json();
        tbody.innerHTML = '';

        if (peminjamans.length === 0) {
            tbody.innerHTML = '<tr><td colspan="6" class="text-center py-4 text-gray-500">Belum ada data peminjaman</td></tr>';
            return;
        }

        peminjamans.forEach((pinjam) => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td class="px-4 py-3 text-sm text-gray-900">PJM-${pinjam.id}</td>
                <td class="px-4 py-3 text-sm text-gray-600">${pinjam.siswa ? pinjam.siswa.nama : '-'}</td>
                <td class="px-4 py-3 text-sm text-gray-600">${pinjam.buku ? pinjam.buku.judul : '-'}</td>
                <td class="px-4 py-3 text-sm text-gray-600">${pinjam.tanggal_peminjaman}</td>
                <td class="px-4 py-3 text-sm text-gray-600">${pinjam.tanggal_kembali_rencana}</td>
                <td class="px-4 py-3">
                    <div class="flex space-x-2">
                        <button onclick="editPeminjaman(${pinjam.id})" class="text-black hover:text-blue-800">
                            <i class="fas fa-edit"></i>
                        </button>
                        <button onclick="deletePeminjaman(${pinjam.id})" class="text-red-600 hover:text-red-800">
                            <i class="fas fa-trash"></i>
                        </button>
                    </div>
                </td>
            `;
            tbody.appendChild(row);
        });
    } catch (error) {
        console.error('Error loading peminjaman:', error);
        tbody.innerHTML = '<tr><td colspan="6" class="text-center py-4 text-red-500">Gagal memuat data peminjaman</td></tr>';
    }
}

function setupPeminjamanForms() {
    loadPeminjamanOptions();
    loadBorrowerOptions();

    const today = new Date().toISOString().split('T')[0];
    document.getElementById('peminjamanDate').value = today;
    calculateDueDate();

    document.getElementById('addPeminjamanForm').addEventListener('submit', async function (e) {
        e.preventDefault();

        const bookInput = document.getElementById('peminjamanBookId').value;
        const borrowerInput = document.getElementById('peminjamanBorrower').value;

        // Ekstrak ID dari format "ID - Judul"
        const bukuId = bookInput.split(' - ')[0];
        // Ekstrak nama dari format "Nama - Kelas X"
        const siswaName = borrowerInput.split(' - ')[0];

        try {
            // Cari siswa berdasarkan nama
            const siswaResponse = await fetch('/api/siswa', {
                headers: {
                    'Accept': 'application/json',
                    ...Auth.getAuthHeaders()
                }
            });
            const siswas = await siswaResponse.json();
            const siswa = siswas.find(s => s.nama === siswaName);

            if (!siswa) {
                alert('Siswa tidak ditemukan');
                return;
            }

            const newPeminjaman = {
                siswa_id: siswa.id,
                buku_id: parseInt(bukuId),
                tanggal_peminjaman: document.getElementById('peminjamanDate').value,
                tanggal_kembali_rencana: document.getElementById('peminjamanDueDate').value,
                jumlah: 1
            };

            const response = await fetch('/api/peminjaman', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                    ...Auth.getAuthHeaders()
                },
                body: JSON.stringify(newPeminjaman)
            });

            const data = await response.json();

            if (!response.ok) {
                alert(data.message || 'Gagal menambahkan peminjaman');
                return;
            }

            loadPeminjamanTable();
            closeModal('addPeminjamanModal');
            this.reset();
            alert('Peminjaman berhasil ditambahkan!');
        } catch (error) {
            console.error('Error adding peminjaman:', error);
            alert('Terjadi kesalahan saat menambahkan peminjaman');
        }
    });

    document.getElementById('editPeminjamanForm').addEventListener('submit', async function (e) {
        e.preventDefault();

        const id = document.getElementById('editPeminjamanCode').value;
        const bookInput = document.getElementById('editPeminjamanBookId').value;
        const borrowerInput = document.getElementById('editPeminjamanBorrower').value;

        const bukuId = bookInput.split(' - ')[0];
        const siswaName = borrowerInput.split(' - ')[0];

        try {
            // Cari siswa berdasarkan nama
            const siswaResponse = await fetch('/api/siswa', {
                headers: {
                    'Accept': 'application/json',
                    ...Auth.getAuthHeaders()
                }
            });
            const siswas = await siswaResponse.json();
            const siswa = siswas.find(s => s.nama === siswaName);

            if (!siswa) {
                alert('Siswa tidak ditemukan');
                return;
            }

            const updatedPeminjaman = {
                siswa_id: siswa.id,
                buku_id: parseInt(bukuId),
                tanggal_peminjaman: document.getElementById('editPeminjamanDate').value,
                tanggal_kembali_rencana: document.getElementById('editPeminjamanDueDate').value,
                jumlah: 1
            };

            const response = await fetch(`/api/peminjaman/${id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                    ...Auth.getAuthHeaders()
                },
                body: JSON.stringify(updatedPeminjaman)
            });

            const data = await response.json();

            if (!response.ok) {
                alert(data.message || 'Gagal mengupdate peminjaman');
                return;
            }

            loadPeminjamanTable();
            closeModal('editPeminjamanModal');
            alert('Data peminjaman berhasil diupdate!');
        } catch (error) {
            console.error('Error updating peminjaman:', error);
            alert('Terjadi kesalahan saat mengupdate peminjaman');
        }
    });
}

async function loadPeminjamanOptions() {
    const datalist = document.getElementById('book-list');
    const editDatalist = document.getElementById('edit-book-list');
    if (!datalist) return;

    try {
        const response = await fetch('/api/buku');
        const bukus = await response.json();

        datalist.innerHTML = '';
        if (editDatalist) editDatalist.innerHTML = '';

        bukus.filter(book => book.stok > 0).forEach(book => {
            const option = document.createElement('option');
            option.value = `${book.id} - ${book.judul}`;
            datalist.appendChild(option);

            if (editDatalist) {
                const editOption = document.createElement('option');
                editOption.value = `${book.id} - ${book.judul}`;
                editDatalist.appendChild(editOption);
            }
        });
    } catch (error) {
        console.error('Error loading books:', error);
    }
}

async function loadBorrowerOptions() {
    const datalist = document.getElementById('borrower-list');
    const editDatalist = document.getElementById('edit-borrower-list');
    if (!datalist) return;

    try {
        const response = await fetch('/api/siswa', {
            headers: {
                'Accept': 'application/json',
                ...Auth.getAuthHeaders()
            }
        });
        const siswas = await response.json();

        datalist.innerHTML = '';
        if (editDatalist) editDatalist.innerHTML = '';

        siswas.forEach(siswa => {
            const option = document.createElement('option');
            option.value = `${siswa.nama} - Kelas ${siswa.kelas}`;
            datalist.appendChild(option);

            if (editDatalist) {
                const editOption = document.createElement('option');
                editOption.value = `${siswa.nama} - Kelas ${siswa.kelas}`;
                editDatalist.appendChild(editOption);
            }
        });
    } catch (error) {
        console.error('Error loading siswa:', error);
    }
}

function showBookDetails() {
    const bookInput = document.getElementById('peminjamanBookId').value;
    const bookId = bookInput.split(' - ')[0]; // Ekstrak ID dari format "ID - Judul"
    const book = DataHelpers.getBookById(bookId);

    if (book) {
        document.getElementById('bookDetails').classList.remove('hidden');
        document.getElementById('bookDetailsContent').innerHTML = `
            <p><strong>Judul:</strong> ${book.title}</p>
            <p><strong>Jenis:</strong> ${book.type}</p>
            <p><strong>Tahun:</strong> ${book.year}</p>
            <p><strong>Stok:</strong> ${book.stock}</p>
        `;
    } else {
        document.getElementById('bookDetails').classList.add('hidden');
    }
}

function calculateDueDate() {
    const peminjamanDate = document.getElementById('peminjamanDate').value;
    if (peminjamanDate) {
        const date = new Date(peminjamanDate);
        date.setDate(date.getDate() + 7);
        document.getElementById('peminjamanDueDate').value = date.toISOString().split('T')[0];
    }
}

function calculateEditDueDate() {
    const peminjamanDate = document.getElementById('editPeminjamanDate').value;
    if (peminjamanDate) {
        const date = new Date(peminjamanDate);
        date.setDate(date.getDate() + 7);
        document.getElementById('editPeminjamanDueDate').value = date.toISOString().split('T')[0];
    }
}

function showAddPeminjamanModal() {
    showModal('addPeminjamanModal');
}

async function editPeminjaman(id) {
    try {
        const response = await fetch(`/api/peminjaman/${id}`, {
            headers: {
                'Accept': 'application/json',
                ...Auth.getAuthHeaders()
            }
        });
        if (!response.ok) throw new Error('Gagal mengambil data peminjaman');

        const pinjam = await response.json();

        document.getElementById('editPeminjamanCode').value = id;

        await loadPeminjamanOptions();
        await loadBorrowerOptions();

        setTimeout(() => {
            if (pinjam.buku) {
                document.getElementById('editPeminjamanBookId').value = `${pinjam.buku.id} - ${pinjam.buku.judul}`;
            }
            if (pinjam.siswa) {
                document.getElementById('editPeminjamanBorrower').value = `${pinjam.siswa.nama} - Kelas ${pinjam.siswa.kelas}`;
            }
            document.getElementById('editPeminjamanDate').value = pinjam.tanggal_peminjaman;
            document.getElementById('editPeminjamanDueDate').value = pinjam.tanggal_kembali_rencana;
        }, 100);

        showModal('editPeminjamanModal');
    } catch (error) {
        console.error('Error fetching peminjaman:', error);
        alert('Gagal mengambil data peminjaman');
    }
}

function loadEditPeminjamanOptions() {
    // Fungsi ini sudah tidak digunakan, diganti dengan loadPeminjamanOptions
}

function loadEditBorrowerOptions() {
    // Fungsi ini sudah tidak digunakan, diganti dengan loadBorrowerOptions
}

async function deletePeminjaman(id) {
    if (confirm('Apakah Anda yakin ingin menghapus data peminjaman ini?')) {
        try {
            const response = await fetch(`/api/peminjaman/${id}`, {
                method: 'DELETE',
                headers: {
                    'Accept': 'application/json',
                    ...Auth.getAuthHeaders()
                }
            });

            if (!response.ok) {
                alert('Gagal menghapus data peminjaman');
                return;
            }

            loadPeminjamanTable();
            alert('Data peminjaman berhasil dihapus!');
        } catch (error) {
            console.error('Error deleting peminjaman:', error);
            alert('Terjadi kesalahan saat menghapus data peminjaman');
        }
    }
}

function searchPeminjaman() {
    const searchTerm = document.getElementById('searchPeminjaman').value.toLowerCase();
    const tbody = document.getElementById('peminjamanTableBody');
    const rows = tbody.getElementsByTagName('tr');

    Array.from(rows).forEach(row => {
        const text = row.textContent.toLowerCase();
        row.style.display = text.includes(searchTerm) ? '' : 'none';
    });
}