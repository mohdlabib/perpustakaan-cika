function renderPengembalianPage() {
    const content = `
        <div class="bg-white rounded-xl shadow-sm p-6 mb-6 fade-in">
            <div class="flex items-center justify-between mb-6">
                <h2 class="text-xl font-bold text-gray-800">Kelola Pengembalian</h2>
                <button onclick="showAddPengembalianModal()" class="bg-[#A1C7DF] hover:bg-[#5A9CC5] text-black text-sm px-4 py-2 rounded-lg transition duration-200 flex items-center whitespace-nowrap">
                    <i class="fas fa-plus mr-2"></i><span>Tambah</span>
                </button>
            </div>

            <div class="overflow-x-auto hide-scrollbar">
                <table class="w-full min-w-max">
                    <thead class="bg-gray-50">
                        <tr>
                            <th class="px-4 py-3 text-left text-sm font-semibold text-gray-600">Kode</th>
                            <th class="px-4 py-3 text-left text-sm font-semibold text-gray-600">Nama</th>
                            <th class="px-4 py-3 text-left text-sm font-semibold text-gray-600">Judul Buku</th>
                            <th class="px-4 py-3 text-left text-sm font-semibold text-gray-600">Tanggal Kembali</th>
                            <th class="px-4 py-3 text-left text-sm font-semibold text-gray-600">Terlambat</th>
                            <th class="px-4 py-3 text-left text-sm font-semibold text-gray-600">Denda</th>
                            <th class="px-4 py-3 text-left text-sm font-semibold text-gray-600">Aksi</th>
                        </tr>
                    </thead>
                    <tbody id="pengembalianTableBody" class="divide-y divide-gray-200"></tbody>
                </table>
            </div>
        </div>

        <!-- Add Pengembalian Modal -->
        <div id="addPengembalianModal" class="hidden fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div class="bg-white rounded-xl shadow-2xl w-full max-w-2xl">
                <div class="p-6">
                    <div class="flex items-center justify-between mb-6">
                        <h3 class="text-xl font-bold text-gray-800">Proses Pengembalian</h3>
                        <button onclick="closeModal('addPengembalianModal')" class="text-gray-400 hover:text-gray-600">
                            <i class="fas fa-times text-xl"></i>
                        </button>
                    </div>
                    
                    <form id="addPengembalianForm" class="space-y-4">
                        <div>
                            <label class="block text-sm font-medium text-gray-700 mb-2">Kode Peminjaman</label>
                            <input type="text" id="pengembalianCode" list="peminjaman-list" onchange="showPeminjamanDetails()" required placeholder="Ketik untuk mencari kode peminjaman..." class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500">
                            <datalist id="peminjaman-list">
                            </datalist>
                        </div>
                        <div id="peminjamanDetails" class="hidden bg-blue-50 p-4 rounded-lg">
                            <h4 class="font-semibold text-purple-800 mb-2">Detail Peminjaman:</h4>
                            <div id="peminjamanDetailsContent"></div>
                        </div>
                        <div>
                            <label class="block text-sm font-medium text-gray-700 mb-2">Tanggal Dikembalikan</label>
                            <input type="date" id="pengembalianDate" onchange="calculateDenda()" required class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500">
                        </div>
                        <div id="dendaInfo" class="hidden bg-red-50 p-4 rounded-lg">
                            <div id="dendaContent"></div>
                        </div>
                        <div class="flex justify-end space-x-3 pt-4">
                            <button type="button" onclick="closeModal('addPengembalianModal')" class="px-4 py-2 text-gray-600 border border-gray-300 rounded-lg hover:bg-gray-50">
                                Batal
                            </button>
                            <button type="submit" class="px-4 py-2 bg-[#A1C7DF] text-black rounded-lg hover:bg-[#5A9CC5]">
                                Proses Pengembalian
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>

        <!-- Edit Pengembalian Modal -->
        <div id="editPengembalianModal" class="hidden fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div class="bg-white rounded-xl shadow-2xl w-full max-w-lg">
                <div class="p-6">
                    <div class="flex items-center justify-between mb-6">
                        <h3 class="text-xl font-bold text-gray-800">Edit Pengembalian</h3>
                        <button onclick="closeModal('editPengembalianModal')" class="text-gray-400 hover:text-gray-600">
                            <i class="fas fa-times text-xl"></i>
                        </button>
                    </div>
                    <form id="editPengembalianForm" class="space-y-4">
                        <input type="hidden" id="editPengembalianCode">
                        <div>
                            <label class="block text-sm font-medium text-gray-700 mb-2">Kode Peminjaman</label>
                            <input type="text" id="viewPengembalianCode" readonly class="w-full px-3 py-2 border border-gray-300 rounded-lg bg-gray-50">
                        </div>
                        <div>
                            <label class="block text-sm font-medium text-gray-700 mb-2">Nama Peminjam</label>
                            <input type="text" id="viewPengembalianBorrower" readonly class="w-full px-3 py-2 border border-gray-300 rounded-lg bg-gray-50">
                        </div>
                        <div>
                            <label class="block text-sm font-medium text-gray-700 mb-2">Tanggal Dikembalikan</label>
                            <input type="date" id="editPengembalianDate" required class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500">
                        </div>
                        <div class="flex justify-end space-x-3 pt-4">
                            <button type="button" onclick="closeModal('editPengembalianModal')" class="px-4 py-2 text-gray-600 border border-gray-300 rounded-lg hover:bg-gray-50">Batal</button>
                            <button type="submit" class="px-4 py-2 bg-[#A1C7DF] text-black rounded-lg hover:bg-[#5A9CC5]">Update Pengembalian</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    `;
    
    document.getElementById('petugasContent').innerHTML = content;
    loadPengembalianTable();
    setupPengembalianForms();
}
async function loadPengembalianTable() {
    const tbody = document.getElementById('pengembalianTableBody');
    tbody.innerHTML = '<tr><td colspan="7" class="text-center py-4">Memuat data...</td></tr>';

    try {
        const response = await fetch('/api/pengembalian');
        if (!response.ok) throw new Error('Gagal memuat data pengembalian');

        const pengembalians = await response.json();
        tbody.innerHTML = '';

        if (pengembalians.length === 0) {
            tbody.innerHTML = '<tr><td colspan="7" class="text-center py-4 text-gray-500">Belum ada data pengembalian</td></tr>';
            return;
        }

        pengembalians.forEach((kembali) => {
            // Hitung apakah terlambat
            const dueDate = new Date(kembali.peminjaman?.tanggal_kembali_rencana);
            const returnDate = new Date(kembali.tanggal_pengembalian);
            const diffTime = returnDate - dueDate;
            const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
            const isLate = diffDays > 0 ? 'Ya' : 'Tidak';
            const denda = kembali.denda || 0;

            const row = document.createElement('tr');
            row.innerHTML = `
                <td class="px-4 py-3 text-sm text-gray-900">PGM-${kembali.id}</td>
                <td class="px-4 py-3 text-sm text-gray-600">${kembali.peminjaman?.siswa?.nama || '-'}</td>
                <td class="px-4 py-3 text-sm text-gray-600">${kembali.peminjaman?.buku?.judul || '-'}</td>
                <td class="px-4 py-3 text-sm text-gray-600">${kembali.tanggal_pengembalian}</td>
                <td class="px-4 py-3">
                    <span class="px-2 py-1 text-xs font-semibold rounded-full ${isLate === 'Ya' ? 'bg-red-100 text-red-800' : 'bg-green-100 text-green-800'}">
                        ${isLate}
                    </span>
                </td>
                <td class="px-4 py-3 text-sm text-gray-600">Rp ${denda.toLocaleString('id-ID')}</td>
                <td class="px-4 py-3">
                    <div class="flex space-x-2">
                        <button onclick="editPengembalian(${kembali.id})" class="text-black hover:text-blue-800">
                            <i class="fas fa-edit"></i>
                        </button>
                        <button onclick="deletePengembalian(${kembali.id})" class="text-red-600 hover:text-red-800">
                            <i class="fas fa-trash"></i>
                        </button>
                    </div>
                </td>
            `;
            tbody.appendChild(row);
        });
    } catch (error) {
        console.error('Error loading pengembalian:', error);
        tbody.innerHTML = '<tr><td colspan="7" class="text-center py-4 text-red-500">Gagal memuat data pengembalian</td></tr>';
    }
}

function setupPengembalianForms() {
    loadPengembalianOptions();

    const today = new Date().toISOString().split('T')[0];
    const pengembalianDateInput = document.getElementById('pengembalianDate');
    if (pengembalianDateInput) {
        pengembalianDateInput.value = today;
    }

    document.getElementById('addPengembalianForm').addEventListener('submit', async function(e) {
        e.preventDefault();

        const input = document.getElementById('pengembalianCode').value;
        const peminjamanId = input.split(' - ')[0]; // Ekstrak ID dari format "ID - Nama"
        const returnDate = document.getElementById('pengembalianDate').value;

        try {
            // Ambil data peminjaman untuk hitung denda
            const peminjamanResponse = await fetch(`/api/peminjaman/${peminjamanId}`);
            if (!peminjamanResponse.ok) {
                alert('Peminjaman tidak ditemukan');
                return;
            }

            const pinjam = await peminjamanResponse.json();

            // Hitung denda
            const dueDate = new Date(pinjam.tanggal_kembali_rencana);
            const returnDateObj = new Date(returnDate);
            const diffTime = returnDateObj - dueDate;
            const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

            let denda = 0;
            if (diffDays > 0) {
                denda = diffDays * 2000;
            }

            const newPengembalian = {
                peminjaman_id: parseInt(peminjamanId),
                tanggal_pengembalian: returnDate,
                denda: denda,
                keterangan: diffDays > 0 ? `Terlambat ${diffDays} hari` : 'Tepat waktu'
            };

            const response = await fetch('/api/pengembalian', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                },
                body: JSON.stringify(newPengembalian)
            });

            const data = await response.json();

            if (!response.ok) {
                alert(data.message || 'Gagal memproses pengembalian');
                return;
            }

            loadPengembalianTable();
            closeModal('addPengembalianModal');
            this.reset();
            alert('Pengembalian berhasil diproses!');
        } catch (error) {
            console.error('Error adding pengembalian:', error);
            alert('Terjadi kesalahan saat memproses pengembalian');
        }
    });

    document.getElementById('editPengembalianForm').addEventListener('submit', async function(e) {
        e.preventDefault();

        const id = document.getElementById('editPengembalianCode').value;
        const returnDate = document.getElementById('editPengembalianDate').value;

        try {
            // Ambil data pengembalian untuk mendapatkan peminjaman_id
            const pengembalianResponse = await fetch(`/api/pengembalian/${id}`);
            if (!pengembalianResponse.ok) {
                alert('Pengembalian tidak ditemukan');
                return;
            }

            const kembali = await pengembalianResponse.json();

            // Hitung ulang denda
            const dueDate = new Date(kembali.peminjaman.tanggal_kembali_rencana);
            const returnDateObj = new Date(returnDate);
            const diffTime = returnDateObj - dueDate;
            const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

            let denda = 0;
            if (diffDays > 0) {
                denda = diffDays * 2000;
            }

            const updatedPengembalian = {
                tanggal_pengembalian: returnDate,
                denda: denda,
                keterangan: diffDays > 0 ? `Terlambat ${diffDays} hari` : 'Tepat waktu'
            };

            const response = await fetch(`/api/pengembalian/${id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                },
                body: JSON.stringify(updatedPengembalian)
            });

            const data = await response.json();

            if (!response.ok) {
                alert(data.message || 'Gagal mengupdate pengembalian');
                return;
            }

            loadPengembalianTable();
            closeModal('editPengembalianModal');
            alert('Data pengembalian berhasil diupdate!');
        } catch (error) {
            console.error('Error updating pengembalian:', error);
            alert('Terjadi kesalahan saat mengupdate pengembalian');
        }
    });
}

async function loadPengembalianOptions() {
    const datalist = document.getElementById('peminjaman-list');
    if (!datalist) return;

    try {
        const response = await fetch('/api/peminjaman');
        const peminjamans = await response.json();

        datalist.innerHTML = '';
        peminjamans.forEach(pinjam => {
            const option = document.createElement('option');
            option.value = `${pinjam.id} - ${pinjam.siswa?.nama || '-'} - ${pinjam.tanggal_peminjaman}`;
            datalist.appendChild(option);
        });
    } catch (error) {
        console.error('Error loading peminjaman options:', error);
    }
}

async function showPeminjamanDetails() {
    const input = document.getElementById('pengembalianCode').value;
    const peminjamanId = input.split(' - ')[0]; // Ekstrak ID dari format "ID - Nama"

    try {
        const response = await fetch(`/api/peminjaman/${peminjamanId}`);
        if (!response.ok) {
            document.getElementById('peminjamanDetails').classList.add('hidden');
            document.getElementById('dendaInfo').classList.add('hidden');
            return;
        }

        const pinjam = await response.json();

        document.getElementById('peminjamanDetails').classList.remove('hidden');
        document.getElementById('peminjamanDetailsContent').innerHTML = `
            <p><strong>Nomor Buku:</strong> ${pinjam.buku?.id || '-'}</p>
            <p><strong>Judul:</strong> ${pinjam.buku?.judul || '-'}</p>
            <p><strong>Jenis:</strong> ${pinjam.buku?.jenis || '-'}</p>
            <p><strong>Tahun:</strong> ${pinjam.buku?.tahun || '-'}</p>
            <p><strong>Nama Peminjam:</strong> ${pinjam.siswa?.nama || '-'}</p>
            <p><strong>Tanggal Pinjam:</strong> ${pinjam.tanggal_peminjaman}</p>
            <p><strong>Tenggat:</strong> ${pinjam.tanggal_kembali_rencana}</p>
        `;
        calculateDenda();
    } catch (error) {
        console.error('Error fetching peminjaman details:', error);
        document.getElementById('peminjamanDetails').classList.add('hidden');
        document.getElementById('dendaInfo').classList.add('hidden');
    }
}

async function calculateDenda() {
    const input = document.getElementById('pengembalianCode').value;
    const peminjamanId = input.split(' - ')[0]; // Ekstrak ID dari format "ID - Nama"
    const returnDate = document.getElementById('pengembalianDate').value;

    if (!returnDate) return;

    try {
        const response = await fetch(`/api/peminjaman/${peminjamanId}`);
        if (!response.ok) return;

        const pinjam = await response.json();

        const dueDate = new Date(pinjam.tanggal_kembali_rencana);
        const returnDateObj = new Date(returnDate);
        const diffTime = returnDateObj - dueDate;
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

        let isLate = 'Tidak';
        let denda = 0;

        if (diffDays > 0) {
            isLate = 'Ya';
            denda = diffDays * 2000;
        }

        document.getElementById('dendaInfo').classList.remove('hidden');
        document.getElementById('dendaContent').innerHTML = `
            <h4 class="font-semibold text-red-800 mb-2">Informasi Denda:</h4>
            <p><strong>Terlambat:</strong> ${isLate}</p>
            ${diffDays > 0 ? `<p><strong>Hari Terlambat:</strong> ${diffDays} hari</p>` : ''}
            <p><strong>Denda:</strong> Rp ${denda.toLocaleString('id-ID')}</p>
        `;
    } catch (error) {
        console.error('Error calculating denda:', error);
    }
}

function showAddPengembalianModal() {
    showModal('addPengembalianModal');
}

async function editPengembalian(id) {
    try {
        const response = await fetch(`/api/pengembalian/${id}`);
        if (!response.ok) throw new Error('Gagal mengambil data pengembalian');

        const kembali = await response.json();

        document.getElementById('editPengembalianCode').value = id;
        document.getElementById('viewPengembalianCode').value = `PGM-${id}`;
        document.getElementById('viewPengembalianBorrower').value = kembali.peminjaman?.siswa?.nama || '-';
        document.getElementById('editPengembalianDate').value = kembali.tanggal_pengembalian;
        showModal('editPengembalianModal');
    } catch (error) {
        console.error('Error fetching pengembalian:', error);
        alert('Gagal mengambil data pengembalian');
    }
}

async function deletePengembalian(id) {
    if (confirm('Apakah Anda yakin ingin menghapus data pengembalian ini?')) {
        try {
            const response = await fetch(`/api/pengembalian/${id}`, {
                method: 'DELETE',
                headers: {
                    'Accept': 'application/json'
                }
            });

            if (!response.ok) {
                alert('Gagal menghapus data pengembalian');
                return;
            }

            loadPengembalianTable();
            alert('Data pengembalian berhasil dihapus!');
        } catch (error) {
            console.error('Error deleting pengembalian:', error);
            alert('Terjadi kesalahan saat menghapus data pengembalian');
        }
    }
}