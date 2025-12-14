function renderSiswaPetugasPage() {
    const content = `
        <div class="bg-white rounded-xl shadow-sm p-6 mb-6 fade-in">
            <div class="flex items-center justify-between mb-6">
                <h2 class="text-xl font-bold text-gray-800">Data Siswa</h2>
                <button onclick="showAddSiswaModal()" class="bg-[#A1C7DF] hover:bg-[#5A9CC5] text-black text-sm px-4 py-2 rounded-lg transition duration-200 flex items-center whitespace-nowrap">
                    <i class="fas fa-plus mr-2"></i>Tambah
                </button>
            </div>

            <div class="mb-6">
                <div class="relative">
                    <input type="text" id="searchSiswa" onkeyup="searchSiswa()" placeholder="Cari siswa..." class="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent">
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
                            <th class="px-4 py-3 text-left text-sm font-semibold text-gray-600">Aksi</th>
                        </tr>
                    </thead>
                    <tbody id="siswaTableBody" class="divide-y divide-gray-200"></tbody>
                </table>
            </div>
        </div>

        <!-- Add Siswa Modal -->
        <div id="addSiswaModal" class="hidden fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div class="bg-white rounded-xl shadow-2xl w-full max-w-md max-h-[90vh] overflow-y-auto">
                <div class="p-6">
                    <div class="flex items-center justify-between mb-6">
                        <h3 class="text-xl font-bold text-gray-800">Tambah Siswa</h3>
                        <button type="button" onclick="closeModal('addSiswaModal')" class="text-gray-400 hover:text-gray-600">
                            <i class="fas fa-times text-xl"></i>
                        </button>
                    </div>
                    <form id="addSiswaForm" class="space-y-4">
                        <div>
                            <label class="block text-sm font-medium text-gray-700 mb-2">Nama Lengkap</label>
                            <input type="text" id="siswaNama" required class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500">
                        </div>
                        <div>
                            <label class="block text-sm font-medium text-gray-700 mb-2">NIS</label>
                            <input type="text" id="siswaNIS" required class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500">
                        </div>
                        <div>
                            <label class="block text-sm font-medium text-gray-700 mb-2">Kelas</label>
                            <select id="siswaKelas" required class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500">
                                <option value="">Pilih Kelas</option>
                                <option value="X">X</option>
                                <option value="XI">XI</option>
                                <option value="XII">XII</option>
                            </select>
                        </div>
                        <div class="flex justify-end space-x-3 pt-4">
                            <button type="button" onclick="closeModal('addSiswaModal')" class="px-4 py-2 text-gray-600 border border-gray-300 rounded-lg hover:bg-gray-50">Batal</button>
                            <button type="submit" class="px-4 py-2 bg-[#A1C7DF] text-black rounded-lg hover:bg-[#5A9CC5]">Simpan Siswa</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>

        <!-- Edit Siswa Modal -->
        <div id="editSiswaModal" class="hidden fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div class="bg-white rounded-xl shadow-2xl w-full max-w-md max-h-[90vh] overflow-y-auto">
                <div class="p-6">
                    <div class="flex items-center justify-between mb-6">
                        <h3 class="text-xl font-bold text-gray-800">Edit Siswa</h3>
                        <button type="button" onclick="closeModal('editSiswaModal')" class="text-gray-400 hover:text-gray-600">
                            <i class="fas fa-times text-xl"></i>
                        </button>
                    </div>
                    <form id="editSiswaForm" class="space-y-4">
                        <input type="hidden" id="editSiswaId">
                        <div>
                            <label class="block text-sm font-medium text-gray-700 mb-2">Nama Lengkap</label>
                            <input type="text" id="editSiswaNama" required class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500">
                        </div>
                        <div>
                            <label class="block text-sm font-medium text-gray-700 mb-2">NIS</label>
                            <input type="text" id="editSiswaNIS" required class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500">
                        </div>
                        <div>
                            <label class="block text-sm font-medium text-gray-700 mb-2">Kelas</label>
                            <select id="editSiswaKelas" required class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500">
                                <option value="">Pilih Kelas</option>
                                <option value="X">X</option>
                                <option value="XI">XI</option>
                                <option value="XII">XII</option>
                            </select>
                        </div>
                        <div class="flex justify-end space-x-3 pt-4">
                            <button type="button" onclick="closeModal('editSiswaModal')" class="px-4 py-2 text-gray-600 border border-gray-300 rounded-lg hover:bg-gray-50">Batal</button>
                            <button type="submit" class="px-4 py-2 bg-[#A1C7DF] text-black rounded-lg hover:bg-[#5A9CC5]">Update Siswa</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    `;

    const target = document.getElementById('petugasContent');
    if (target) {
        target.innerHTML = content;
        loadSiswaTable();
        setupSiswaForms();
    }
}

async function loadSiswaTable() {
    const tbody = document.getElementById('siswaTableBody');
    if (!tbody) return;

    tbody.innerHTML = '<tr><td colspan="4" class="text-center py-4">Memuat data...</td></tr>';

    try {
        const response = await fetch('/api/siswa', {
            headers: {
                'Accept': 'application/json',
                ...Auth.getAuthHeaders()
            }
        });
        if (!response.ok) throw new Error('Gagal memuat data siswa');

        const siswas = await response.json();
        tbody.innerHTML = '';

        if (siswas.length === 0) {
            tbody.innerHTML = '<tr><td colspan="4" class="text-center py-4 text-gray-500">Belum ada data siswa</td></tr>';
            return;
        }

        siswas.forEach((siswa) => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td class="px-4 py-3 text-sm text-gray-900">${siswa.nama}</td>
                <td class="px-4 py-3 text-sm text-gray-600">${siswa.nis}</td>
                <td class="px-4 py-3 text-sm text-gray-600">${siswa.kelas}</td>
                <td class="px-4 py-3">
                    <div class="flex space-x-2">
                        <button onclick="editSiswa(${siswa.id})" class="text-black hover:text-blue-800">
                            <i class="fas fa-edit"></i>
                        </button>
                        <button onclick="deleteSiswa(${siswa.id})" class="text-red-600 hover:text-red-800">
                            <i class="fas fa-trash"></i>
                        </button>
                    </div>
                </td>
            `;
            tbody.appendChild(row);
        });
    } catch (error) {
        console.error('Error loading siswa:', error);
        tbody.innerHTML = '<tr><td colspan="4" class="text-center py-4 text-red-500">Gagal memuat data siswa</td></tr>';
    }
}

function setupSiswaForms() {
    // Tambah siswa
    const addForm = document.getElementById('addSiswaForm');
    if (addForm) {
        addForm.onsubmit = async function (e) {
            e.preventDefault();

            const newSiswa = {
                nama: document.getElementById('siswaNama').value,
                nis: document.getElementById('siswaNIS').value,
                kelas: document.getElementById('siswaKelas').value,
                jurusan: null
            };

            try {
                const response = await fetch('/api/siswa', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'Accept': 'application/json',
                        ...Auth.getAuthHeaders()
                    },
                    body: JSON.stringify(newSiswa)
                });

                const data = await response.json();

                if (!response.ok) {
                    alert(data.message || 'Gagal menambahkan data siswa');
                    return;
                }

                loadSiswaTable();
                closeModal('addSiswaModal');
                addForm.reset();
                alert('Data siswa baru berhasil ditambahkan!');
            } catch (error) {
                console.error('Error adding siswa:', error);
                alert('Terjadi kesalahan saat menambahkan data siswa');
            }
        };
    }

    // Edit siswa
    const editForm = document.getElementById('editSiswaForm');
    if (editForm) {
        editForm.onsubmit = async function (e) {
            e.preventDefault();

            const id = parseInt(document.getElementById('editSiswaId').value);
            const updatedSiswa = {
                nama: document.getElementById('editSiswaNama').value,
                nis: document.getElementById('editSiswaNIS').value,
                kelas: document.getElementById('editSiswaKelas').value,
                jurusan: null
            };

            try {
                const response = await fetch(`/api/siswa/${id}`, {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json',
                        'Accept': 'application/json',
                        ...Auth.getAuthHeaders()
                    },
                    body: JSON.stringify(updatedSiswa)
                });

                const data = await response.json();

                if (!response.ok) {
                    alert(data.message || 'Gagal mengupdate data siswa');
                    return;
                }

                loadSiswaTable();
                closeModal('editSiswaModal');
                alert('Data siswa berhasil diupdate!');
            } catch (error) {
                console.error('Error updating siswa:', error);
                alert('Terjadi kesalahan saat mengupdate data siswa');
            }
        };
    }
}

function showAddSiswaModal() {
    showModal('addSiswaModal');
    const modalsContainer = document.getElementById('modalsContainer');
    // Cek jika modal sudah ada, jangan buat lagi
    if (document.getElementById('addSiswaModal')) {
        showModal('addSiswaModal');
        return;
    }
    const template = document.getElementById('addSiswaModalTemplate');
    const modalClone = template.content.cloneNode(true);
    modalsContainer.appendChild(modalClone);
    showModal('addSiswaModal'); // Fungsi showModal global Anda
}

async function editSiswa(id) {
    try {
        const response = await fetch(`/api/siswa/${id}`, {
            headers: {
                'Accept': 'application/json',
                ...Auth.getAuthHeaders()
            }
        });
        if (!response.ok) throw new Error('Gagal mengambil data siswa');

        const siswa = await response.json();

        document.getElementById('editSiswaId').value = id;
        document.getElementById('editSiswaNama').value = siswa.nama;
        document.getElementById('editSiswaNIS').value = siswa.nis;
        document.getElementById('editSiswaKelas').value = siswa.kelas;
        showModal('editSiswaModal');
    } catch (error) {
        console.error('Error fetching siswa:', error);
        alert('Gagal mengambil data siswa');
    }
}

async function deleteSiswa(id) {
    if (confirm('Apakah Anda yakin ingin menghapus data siswa ini?')) {
        try {
            const response = await fetch(`/api/siswa/${id}`, {
                method: 'DELETE',
                headers: {
                    'Accept': 'application/json',
                    ...Auth.getAuthHeaders()
                }
            });

            if (!response.ok) {
                alert('Gagal menghapus data siswa');
                return;
            }

            loadSiswaTable();
            alert('Data siswa berhasil dihapus!');
        } catch (error) {
            console.error('Error deleting siswa:', error);
            alert('Terjadi kesalahan saat menghapus data siswa');
        }
    }
}

function searchSiswa() {
    const searchTerm = document.getElementById('searchSiswa').value.toLowerCase();
    const tbody = document.getElementById('siswaTableBody');
    const rows = tbody.getElementsByTagName('tr');
    Array.from(rows).forEach(row => {
        const text = row.textContent.toLowerCase();
        row.style.display = text.includes(searchTerm) ? '' : 'none';
    });
}