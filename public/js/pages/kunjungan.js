function renderKunjunganPage() {
    const content = `
        <div class="bg-white rounded-xl shadow-sm p-6 mb-6 fade-in">
            <div class="flex items-center justify-between mb-6">
                <h2 class="text-xl font-bold text-gray-800">Data Kunjungan</h2>
                <button onclick="showAddKunjunganModal()" class="bg-[#A1C7DF] hover:bg-[#5A9CC5] text-black text-sm px-4 py-2 rounded-lg transition duration-200 flex items-center whitespace-nowrap">
                    <i class="fas fa-plus mr-2"></i>Tambah
                </button>
            </div>

            <div class="mb-6">
                <div class="relative">
                    <input type="text" id="searchKunjungan" onkeyup="searchKunjungan()" placeholder="Cari data kunjungan..." class="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent">
                    <i class="fas fa-search absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"></i>
                </div>
            </div>

            <div class="overflow-x-auto hide-scrollbar">
                <table class="w-full min-w-max">
                    <thead class="bg-gray-50">
                        <tr>
                            <th class="px-4 py-3 text-left text-sm font-semibold text-gray-600">Nama</th>
                            <th class="px-4 py-3 text-left text-sm font-semibold text-gray-600">NIS (Nomor Induk Siswa)</th>
                            <th class="px-4 py-3 text-left text-sm font-semibold text-gray-600">Kelas</th>
                            <th class="px-4 py-3 text-left text-sm font-semibold text-gray-600">Waktu Kunjungan</th>
                            <th class="px-4 py-3 text-left text-sm font-semibold text-gray-600">Aksi</th>
                        </tr>
                    </thead>
                    <tbody id="kunjunganTableBody" class="divide-y divide-gray-200"></tbody>
                </table>
            </div>
        </div>

        <!-- Add Kunjungan Modal -->
        <div id="addKunjunganModal" class="hidden fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div class="bg-white rounded-xl shadow-2xl w-full max-w-md">
                <div class="p-6">
                    <div class="flex items-center justify-between mb-6">
                        <h3 class="text-xl font-bold text-gray-800">Tambah Data Kunjungan</h3>
                        <button onclick="closeModal('addKunjunganModal')" class="text-gray-400 hover:text-gray-600">
                            <i class="fas fa-times text-xl"></i>
                        </button>
                    </div>
                    <form id="addKunjunganForm" class="space-y-4">
                        <div>
                            <label class="block text-sm font-medium text-gray-700 mb-2">Nama Lengkap</label>
                            <input type="text" id="addKunjunganNama" required class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500">
                        </div>
                        <div>
                            <label class="block text-sm font-medium text-gray-700 mb-2">NIS (Nomor Induk Siswa)</label>
                            <input type="text" id="addKunjunganNis" required class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500">
                        </div>
                        <div>
                            <label class="block text-sm font-medium text-gray-700 mb-2">Kelas</label>
                            <select id="addKunjunganKelas" required class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500">
                                <option value="">Pilih Kelas</option>
                                <option value="X">X</option>
                                <option value="XI">XI</option>
                                <option value="XII">XII</option>
                            </select>
                        </div>
                        <div>
                            <label class="block text-sm font-medium text-gray-700 mb-2">Waktu Kunjungan</label>
                            <input type="datetime-local" id="addKunjunganWaktu" required class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500">
                        </div>
                        <div class="flex justify-end space-x-3 pt-4">
                            <button type="button" onclick="closeModal('addKunjunganModal')" class="px-4 py-2 text-gray-600 border border-gray-300 rounded-lg hover:bg-gray-50">Batal</button>
                            <button type="submit" class="px-4 py-2 bg-[#A1C7DF] hover:bg-[#5A9CC5] text-black rounded-lg">Simpan Data</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>

        <!-- Edit Kunjungan Modal -->
        <div id="editKunjunganModal" class="hidden fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div class="bg-white rounded-xl shadow-2xl w-full max-w-md">
                <div class="p-6">
                    <div class="flex items-center justify-between mb-6">
                        <h3 class="text-xl font-bold text-gray-800">Edit Data Kunjungan</h3>
                        <button onclick="closeModal('editKunjunganModal')" class="text-gray-400 hover:text-gray-600">
                            <i class="fas fa-times text-xl"></i>
                        </button>
                    </div>
                    
                    <form id="editKunjunganForm" class="space-y-4">
                        <input type="hidden" id="editKunjunganIndex">
                        <div>
                            <label class="block text-sm font-medium text-gray-700 mb-2">Nama Lengkap</label>
                            <input type="text" id="editKunjunganNama" required class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500">
                        </div>
                        <div>
                            <label class="block text-sm font-medium text-gray-700 mb-2">NIS (Nomor Induk Siswa)</label>
                            <input type="text" id="editKunjunganNis" required class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500">
                        </div>
                        <div>
                            <label class="block text-sm font-medium text-gray-700 mb-2">Kelas</label>
                            <select id="editKunjunganKelas" required class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500">
                                <option value="">Pilih Kelas</option>
                                <option value="X">X</option>
                                <option value="XI">XI</option>
                                <option value="XII">XII</option>
                            </select>
                        </div>
                        <div>
                            <label class="block text-sm font-medium text-gray-700 mb-2">Waktu Kunjungan</label>
                            <input type="datetime-local" id="editKunjunganWaktu" required class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500">
                        </div>
                        <div class="flex justify-end space-x-3 pt-4">
                            <button type="button" onclick="closeModal('editKunjunganModal')" class="px-4 py-2 text-gray-600 border border-gray-300 rounded-lg hover:bg-gray-50">Batal</button>
                            <button type="submit" class="px-4 py-2 bg-[#A1C7DF] hover:bg-[#5A9CC5] text-black rounded-lg">Update Data</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    `;
    
    document.getElementById('petugasContent').innerHTML = content;
    loadKunjunganTable();
    setupKunjunganForms();
}

async function loadKunjunganTable() {
    const tbody = document.getElementById('kunjunganTableBody');
    tbody.innerHTML = '<tr><td colspan="5" class="text-center py-4">Memuat data...</td></tr>';

    try {
        const response = await fetch('/api/kunjungan');
        if (!response.ok) throw new Error('Gagal memuat data kunjungan');

        const kunjungans = await response.json();
        tbody.innerHTML = '';

        if (kunjungans.length === 0) {
            tbody.innerHTML = '<tr><td colspan="5" class="text-center py-4 text-gray-500">Belum ada data kunjungan</td></tr>';
            return;
        }

        kunjungans.forEach((visit) => {
            const row = document.createElement('tr');
            const waktu = visit.tanggal_kunjungan + (visit.jam_masuk ? ' ' + visit.jam_masuk : '');
            row.innerHTML = `
                <td class="px-4 py-3 text-sm text-gray-900">${visit.nama}</td>
                <td class="px-4 py-3 text-sm text-gray-600">${visit.nis || '-'}</td>
                <td class="px-4 py-3 text-sm text-gray-600">${visit.kelas || '-'}</td>
                <td class="px-4 py-3 text-sm text-gray-600">${waktu}</td>
                <td class="px-4 py-3">
                    <div class="flex space-x-2">
                        <button onclick="editKunjungan(${visit.id})" class="text-black hover:text-blue-800">
                            <i class="fas fa-edit"></i>
                        </button>
                        <button onclick="deleteKunjungan(${visit.id})" class="text-red-600 hover:text-red-800">
                            <i class="fas fa-trash"></i>
                        </button>
                    </div>
                </td>
            `;
            tbody.appendChild(row);
        });
    } catch (error) {
        console.error('Error loading kunjungan:', error);
        tbody.innerHTML = '<tr><td colspan="5" class="text-center py-4 text-red-500">Gagal memuat data kunjungan</td></tr>';
    }
}

function setupKunjunganForms() {
    const addForm = document.getElementById('addKunjunganForm');
    if (addForm) {
        addForm.addEventListener('submit', async function(e) {
            e.preventDefault();

            const waktuValue = document.getElementById('addKunjunganWaktu').value;
            const [tanggal, waktu] = waktuValue.split('T');

            const newVisit = {
                nama: document.getElementById('addKunjunganNama').value,
                nis: document.getElementById('addKunjunganNis').value,
                kelas: document.getElementById('addKunjunganKelas').value,
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
                    alert(data.message || 'Gagal menambahkan data kunjungan');
                    return;
                }

                loadKunjunganTable();
                closeModal('addKunjunganModal');
                addForm.reset();
                alert('Data kunjungan baru berhasil ditambahkan!');
            } catch (error) {
                console.error('Error adding kunjungan:', error);
                alert('Terjadi kesalahan saat menambahkan data kunjungan');
            }
        });
    }

    document.getElementById('editKunjunganForm').addEventListener('submit', async function(e) {
        e.preventDefault();

        const id = parseInt(document.getElementById('editKunjunganIndex').value);
        const waktuValue = document.getElementById('editKunjunganWaktu').value;
        const [tanggal, waktu] = waktuValue.split('T');

        const updatedVisit = {
            nama: document.getElementById('editKunjunganNama').value,
            nis: document.getElementById('editKunjunganNis').value,
            kelas: document.getElementById('editKunjunganKelas').value,
            tanggal_kunjungan: tanggal,
            jam_masuk: waktu || null
        };

        try {
            const response = await fetch(`/api/kunjungan/${id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                },
                body: JSON.stringify(updatedVisit)
            });

            const data = await response.json();

            if (!response.ok) {
                alert(data.message || 'Gagal mengupdate data kunjungan');
                return;
            }

            loadKunjunganTable();
            closeModal('editKunjunganModal');
            alert('Data kunjungan berhasil diupdate!');
        } catch (error) {
            console.error('Error updating kunjungan:', error);
            alert('Terjadi kesalahan saat mengupdate data kunjungan');
        }
    });
}

function showAddKunjunganModal() {
    showModal('addKunjunganModal');
}

async function editKunjungan(id) {
    try {
        const response = await fetch(`/api/kunjungan/${id}`);
        if (!response.ok) throw new Error('Gagal mengambil data kunjungan');

        const visit = await response.json();

        document.getElementById('editKunjunganIndex').value = id;
        document.getElementById('editKunjunganNama').value = visit.nama;
        document.getElementById('editKunjunganNis').value = visit.nis || '';
        document.getElementById('editKunjunganKelas').value = visit.kelas || '';

        const waktu = visit.tanggal_kunjungan + (visit.jam_masuk ? 'T' + visit.jam_masuk.substring(0, 5) : 'T00:00');
        document.getElementById('editKunjunganWaktu').value = waktu;

        showModal('editKunjunganModal');
    } catch (error) {
        console.error('Error fetching kunjungan:', error);
        alert('Gagal mengambil data kunjungan');
    }
}

async function deleteKunjungan(id) {
    if (confirm('Apakah Anda yakin ingin menghapus data kunjungan ini?')) {
        try {
            const response = await fetch(`/api/kunjungan/${id}`, {
                method: 'DELETE',
                headers: {
                    'Accept': 'application/json'
                }
            });

            if (!response.ok) {
                alert('Gagal menghapus data kunjungan');
                return;
            }

            loadKunjunganTable();
            alert('Data kunjungan berhasil dihapus!');
        } catch (error) {
            console.error('Error deleting kunjungan:', error);
            alert('Terjadi kesalahan saat menghapus data kunjungan');
        }
    }
}

function searchKunjungan() {
    const searchTerm = document.getElementById('searchKunjungan').value.toLowerCase();
    const tbody = document.getElementById('kunjunganTableBody');
    const rows = tbody.getElementsByTagName('tr');

    Array.from(rows).forEach(row => {
        const text = row.textContent.toLowerCase();
        row.style.display = text.includes(searchTerm) ? '' : 'none';
    });
}