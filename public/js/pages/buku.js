function renderBukuPage() {
    const content = `
        <div class="bg-white rounded-xl shadow-sm p-6 mb-6 fade-in">
            <div class="flex items-center justify-between mb-6">
                <h2 class="text-xl font-bold text-gray-800">Data Buku</h2>
                <button onclick="showAddBookModal()" class="bg-[#A1C7DF] hover:bg-[#5A9CC5] text-black text-sm px-4 py-2 rounded-lg transition duration-200 flex items-center whitespace-nowrap">
                    <i class="fas fa-plus mr-2"></i>Tambah
                </button>
            </div>

            <div class="mb-6">
                <div class="relative">
                    <input type="text" id="searchBooks" onkeyup="searchBooks()" placeholder="Cari buku..." class="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent">
                    <i class="fas fa-search absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"></i>
                </div>
            </div>

            <div class="overflow-x-auto hide-scrollbar">
                <table class="w-full min-w-max">
                    <thead class="bg-gray-50">
                        <tr>
                            <th class="px-4 py-3 text-left text-sm font-semibold text-gray-600">Cover</th>
                            <th class="px-4 py-3 text-left text-sm font-semibold text-gray-600">Kode</th>
                            <th class="px-4 py-3 text-left text-sm font-semibold text-gray-600">Judul</th>
                            <th class="px-4 py-3 text-left text-sm font-semibold text-gray-600">Penerbit</th>
                            <th class="px-4 py-3 text-left text-sm font-semibold text-gray-600">Tahun</th>
                            <th class="px-4 py-3 text-left text-sm font-semibold text-gray-600">Jenis</th>
                            <th class="px-4 py-3 text-left text-sm font-semibold text-gray-600">Stok</th>
                            <th class="px-4 py-3 text-left text-sm font-semibold text-gray-600">Status</th>
                            <th class="px-4 py-3 text-left text-sm font-semibold text-gray-600">Aksi</th>
                        </tr>
                    </thead>
                    <tbody id="booksTableBody" class="divide-y divide-gray-200"></tbody>
                </table>
            </div>
        </div>

        <!-- Add Book Modal -->
        <div id="addBookModal" class="hidden fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div class="bg-white rounded-xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
                <div class="p-6">
                    <div class="flex items-center justify-between mb-6">
                        <h3 class="text-xl font-bold text-gray-800">Tambah Buku Baru</h3>
                        <button type="button" onclick="closeModal('addBookModal')" class="text-gray-400 hover:text-gray-600">
                            <i class="fas fa-times text-xl"></i>
                        </button>
                    </div>
                    
                    <form id="addBookForm" class="space-y-4">
                        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <label class="block text-sm font-medium text-gray-700 mb-2">Judul Buku</label>
                                <input type="text" id="bookTitle" required class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500">
                            </div>
                            <div>
                                <label class="block text-sm font-medium text-gray-700 mb-2">Pengarang</label>
                                <input type="text" id="bookAuthor" required class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500">
                            </div>
                            <div>
                                <label class="block text-sm font-medium text-gray-700 mb-2">Penerbit</label>
                                <input type="text" id="bookPublisher" class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500">
                            </div>
                            <div>
                                <label class="block text-sm font-medium text-gray-700 mb-2">Tahun Terbit</label>
                                <input type="number" id="bookYear" required class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500">
                            </div>
                            <div>
                                <label class="block text-sm font-medium text-gray-700 mb-2">Jenis Buku</label>
                                <select id="bookType" required class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500">
                                    <option value="">Pilih Jenis</option>
                                    <option value="Fiksi">Fiksi</option>
                                    <option value="Non-Fiksi">Non-Fiksi</option>
                                    <option value="Referensi">Referensi</option>
                                    <option value="Majalah">Majalah</option>
                                </select>
                            </div>
                            <div>
                                <label class="block text-sm font-medium text-gray-700 mb-2">Nomor Rak</label>
                                <input type="text" id="bookRack" required class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500">
                            </div>
                            <div>
                                <label class="block text-sm font-medium text-gray-700 mb-2">Stok</label>
                                <input type="number" id="bookStock" required class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500">
                            </div>
                        </div>
                        <div>
                            <label class="block text-sm font-medium text-gray-700 mb-2">Gambar Cover Buku</label>
                            <input type="file" id="bookImage" accept="image/*" class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500">
                        </div>
                        <div>
                            <label class="block text-sm font-medium text-gray-700 mb-2">Sinopsis</label>
                            <textarea id="bookSynopsis" rows="3" class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"></textarea>
                        </div>
                        <div class="flex justify-end space-x-3 pt-4">
                            <button type="button" onclick="closeModal('addBookModal')" class="px-4 py-2 text-gray-600 border border-gray-300 rounded-lg hover:bg-gray-50">Batal</button>
                            <button type="submit" class="px-4 py-2 bg-[#A1C7DF] text-black rounded-lg hover:bg-[#5A9CC5]">Simpan Buku</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>

        <!-- Edit Book Modal -->
        <div id="editBookModal" class="hidden fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div class="bg-white rounded-xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
                <div class="p-6">
                    <div class="flex items-center justify-between mb-6">
                        <h3 class="text-xl font-bold text-gray-800">Edit Buku</h3>
                        <button type="button" onclick="closeModal('editBookModal')" class="text-gray-400 hover:text-gray-600">
                            <i class="fas fa-times text-xl"></i>
                        </button>
                    </div>
                    
                    <form id="editBookForm" class="space-y-4">
                        <input type="hidden" id="editBookId">
                        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <label class="block text-sm font-medium text-gray-700 mb-2">Judul Buku</label>
                                <input type="text" id="editBookTitle" required class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500">
                            </div>
                            <div>
                                <label class="block text-sm font-medium text-gray-700 mb-2">Pengarang</label>
                                <input type="text" id="editBookAuthor" required class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500">
                            </div>
                            <div>
                                <label class="block text-sm font-medium text-gray-700 mb-2">Penerbit</label>
                                <input type="text" id="editBookPublisher" class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500">
                            </div>
                            <div>
                                <label class="block text-sm font-medium text-gray-700 mb-2">Tahun Terbit</label>
                                <input type="number" id="editBookYear" required class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500">
                            </div>
                            <div>
                                <label class="block text-sm font-medium text-gray-700 mb-2">Jenis Buku</label>
                                <select id="editBookType" required class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500">
                                    <option value="">Pilih Jenis</option>
                                    <option value="Fiksi">Fiksi</option>
                                    <option value="Non-Fiksi">Non-Fiksi</option>
                                    <option value="Referensi">Referensi</option>
                                    <option value="Majalah">Majalah</option>
                                </select>
                            </div>
                            <div>
                                <label class="block text-sm font-medium text-gray-700 mb-2">Nomor Rak</label>
                                <input type="text" id="editBookRack" required class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500">
                            </div>
                            <div>
                                <label class="block text-sm font-medium text-gray-700 mb-2">Stok</label>
                                <input type="number" id="editBookStock" required class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500">
                            </div>
                        </div>
                        <div>
                            <label class="block text-sm font-medium text-gray-700 mb-2">Gambar Cover Buku</label>
                            <input type="file" id="editBookImage" accept="image/*" class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500">
                            <div id="currentImagePreview" class="mt-2 hidden">
                                <p class="text-sm text-gray-600 mb-2">Gambar saat ini:</p>
                                <img id="currentImage" src="" alt="Current book cover" class="w-32 h-40 object-cover rounded-lg border">
                            </div>
                        </div>
                        <div>
                            <label class="block text-sm font-medium text-gray-700 mb-2">Sinopsis</label>
                            <textarea id="editBookSynopsis" rows="3" class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"></textarea>
                        </div>
                        <div class="flex justify-end space-x-3 pt-4">
                            <button type="button" onclick="closeModal('editBookModal')" class="px-4 py-2 text-gray-600 border border-gray-300 rounded-lg hover:bg-gray-50">Batal</button>
                            <button type="submit" class="px-4 py-2 bg-[#A1C7DF] text-black rounded-lg hover:bg-[#5A9CC5]">Update Buku</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    `;
    
    // Ganti id target sesuai dengan index.html kamu
    const target = document.getElementById('petugasContent') || document.getElementById('petugasContent');
    if (target) {
        target.innerHTML = content;
        loadBooksTable();
        setupBookForms();
    }
}

async function loadBooksTable() {
    const tbody = document.getElementById('booksTableBody');
    if (!tbody) return;

    tbody.innerHTML = '<tr><td colspan="9" class="text-center py-4">Memuat data...</td></tr>';

    try {
        const response = await fetch('/api/buku');
        if (!response.ok) throw new Error('Gagal memuat data buku');

        const books = await response.json();
        tbody.innerHTML = '';

        if (!books || books.length === 0) {
            tbody.innerHTML = '<tr><td colspan="9" class="text-center py-4">Tidak ada data buku</td></tr>';
            return;
        }

        books.forEach(book => {
            const imageContent = book.gambar
                ? `<img src="${book.gambar}" alt="${book.judul}" class="w-12 h-16 object-cover rounded border">`
                : `<div class="w-12 h-16 bg-[#A1C7DF] rounded border flex items-center justify-center">
                    <i class="fas fa-book-open text-black text-sm"></i>
                   </div>`;

            const status = book.stok > 0 ? 'Tersedia' : 'Tidak Tersedia';

            const row = document.createElement('tr');
            row.innerHTML = `
                <td class="px-4 py-3">${imageContent}</td>
                <td class="px-4 py-3 text-sm text-gray-800 font-mono">${book.id}</td>
                <td class="px-4 py-3 text-sm text-gray-900">${book.judul}</td>
                <td class="px-4 py-3 text-sm text-gray-600">${book.penerbit || '-'}</td>
                <td class="px-4 py-3 text-sm text-gray-600">${book.tahun}</td>
                <td class="px-4 py-3 text-sm text-gray-600">${book.jenis || '-'}</td>
                <td class="px-4 py-3 text-sm text-gray-600">${book.stok}</td>
                <td class="px-4 py-3">
                    <span class="px-2 py-1 text-xs font-semibold rounded-full ${status === 'Tersedia' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}">
                        ${status}
                    </span>
                </td>
                <td class="px-4 py-3">
                    <div class="flex space-x-2">
                        <button onclick="editBook('${book.id}')" class="text-black hover:text-blue-800">
                            <i class="fas fa-edit"></i>
                        </button>
                        <button onclick="deleteBook('${book.id}')" class="text-red-600 hover:text-red-800">
                            <i class="fas fa-trash"></i>
                        </button>
                    </div>
                </td>
            `;
            tbody.appendChild(row);
        });
    } catch (error) {
        console.error('Error loading books:', error);
        tbody.innerHTML = '<tr><td colspan="9" class="text-center py-4 text-red-600">Gagal memuat data buku</td></tr>';
    }
}

function setupBookForms() {
    const addForm = document.getElementById('addBookForm');
    if (addForm) {
        addForm.onsubmit = async function(e) {
            e.preventDefault();

            const imageFile = document.getElementById('bookImage');
            let imageData = '';
            if (imageFile && imageFile.files.length > 0) {
                imageData = await toBase64(imageFile.files[0]);
            }

            const authorEl = document.getElementById('bookAuthor');
            const bookData = {
                judul: document.getElementById('bookTitle').value,
                pengarang: authorEl ? authorEl.value : '',
                penerbit: document.getElementById('bookPublisher').value,
                tahun: parseInt(document.getElementById('bookYear').value),
                jenis: document.getElementById('bookType').value,
                rak: document.getElementById('bookRack').value,
                stok: parseInt(document.getElementById('bookStock').value),
                sinopsis: document.getElementById('bookSynopsis').value,
                gambar: imageData
            };

            try {
                const response = await fetch('/api/buku', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'Accept': 'application/json'
                    },
                    body: JSON.stringify(bookData)
                });

                if (!response.ok) {
                    const errorData = await response.json();
                    throw new Error(errorData.message || 'Gagal menyimpan buku.');
                }

                loadBooksTable();
                closeModal('addBookModal');
                addForm.reset();
                alert('Buku berhasil ditambahkan!');
            } catch (error) {
                console.error('Error saving book:', error);
                alert('Terjadi kesalahan saat menyimpan buku.');
            }
        };
    }

    const editForm = document.getElementById('editBookForm');
    if (editForm) {
        editForm.onsubmit = async function(e) {
            e.preventDefault();

            const bookId = document.getElementById('editBookId').value;

            const imageFile = document.getElementById('editBookImage');
            let imageData = '';
            if (imageFile && imageFile.files.length > 0) {
                imageData = await toBase64(imageFile.files[0]);
            }

            const authorEl = document.getElementById('editBookAuthor');
            const bookData = {
                judul: document.getElementById('editBookTitle').value,
                pengarang: authorEl ? authorEl.value : '',
                penerbit: document.getElementById('editBookPublisher').value,
                tahun: parseInt(document.getElementById('editBookYear').value),
                jenis: document.getElementById('editBookType').value,
                rak: document.getElementById('editBookRack').value,
                stok: parseInt(document.getElementById('editBookStock').value),
                sinopsis: document.getElementById('editBookSynopsis').value,
            };

            // Only include image if a new one was uploaded
            if (imageData) {
                bookData.gambar = imageData;
            }

            try {
                const response = await fetch(`/api/buku/${bookId}`, {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json',
                        'Accept': 'application/json'
                    },
                    body: JSON.stringify(bookData)
                });

                if (!response.ok) {
                    const errorData = await response.json();
                    throw new Error(errorData.message || 'Gagal mengupdate buku.');
                }

                loadBooksTable();
                closeModal('editBookModal');
                alert('Buku berhasil diupdate!');
            } catch (error) {
                console.error('Error updating book:', error);
                alert('Terjadi kesalahan saat mengupdate buku.');
            }
        };
    }
}

// Helper untuk konversi file ke base64
function toBase64(file) {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = () => resolve(reader.result);
        reader.onerror = error => reject(error);
        reader.readAsDataURL(file);
    });
}

// Helper untuk generate ID unik
function generateBookId() {
    return 'BOOK-' + Date.now() + '-' + Math.floor(Math.random() * 1000);
}

// Helper untuk ambil buku by id
function getBookById(bookId) {
    if (!window.AppData || !Array.isArray(AppData.books)) return null;
    return AppData.books.find(b => b.id === bookId);
}

function showAddBookModal() {
    showModal('addBookModal');
}

async function editBook(bookId) {
    try {
        const response = await fetch(`/api/buku/${bookId}`);
        if (!response.ok) throw new Error('Gagal mengambil data buku');

        const book = await response.json();

        document.getElementById('editBookId').value = book.id;
        document.getElementById('editBookTitle').value = book.judul || '';
        document.getElementById('editBookAuthor').value = book.pengarang || '';
        document.getElementById('editBookPublisher').value = book.penerbit || '';
        document.getElementById('editBookYear').value = book.tahun || '';
        document.getElementById('editBookType').value = book.jenis || '';
        document.getElementById('editBookRack').value = book.rak || '';
        document.getElementById('editBookStock').value = book.stok || 0;
        document.getElementById('editBookSynopsis').value = book.sinopsis || '';

        if (book.gambar) {
            const previewEl = document.getElementById('currentImagePreview');
            const imageEl = document.getElementById('currentImage');
            if (previewEl && imageEl) {
                previewEl.classList.remove('hidden');
                imageEl.src = book.gambar;
            }
        } else {
            const previewEl = document.getElementById('currentImagePreview');
            if (previewEl) {
                previewEl.classList.add('hidden');
            }
        }

        showModal('editBookModal');
    } catch (error) {
        console.error('Error loading book:', error);
        alert('Terjadi kesalahan saat memuat data buku.');
    }
}

async function deleteBook(bookId) {
    if (confirm('Apakah Anda yakin ingin menghapus buku ini?')) {
        try {
            const response = await fetch(`/api/buku/${bookId}`, {
                method: 'DELETE',
                headers: {
                    'Accept': 'application/json'
                }
            });

            if (!response.ok) throw new Error('Gagal menghapus buku');

            loadBooksTable();
            alert('Buku berhasil dihapus!');
        } catch (error) {
            console.error('Error deleting book:', error);
            alert('Terjadi kesalahan saat menghapus buku.');
        }
    }
}

function searchBooks() {
    const searchTerm = document.getElementById('searchBooks').value.toLowerCase();
    const tbody = document.getElementById('booksTableBody');
    const rows = tbody.getElementsByTagName('tr');

    Array.from(rows).forEach(row => {
        const text = row.textContent.toLowerCase();
        row.style.display = text.includes(searchTerm) ? '' : 'none';
    });
}