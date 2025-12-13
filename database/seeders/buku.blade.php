{{-- 
    Container utama untuk halaman manajemen buku.
    File JavaScript (seperti buku.js) tidak perlu lagi me-render seluruh HTML ini.
    Sebagai gantinya, JS akan berinteraksi dengan elemen yang sudah ada di sini,
    misalnya dengan memanggil `loadBooksTable()` untuk mengisi <tbody>,
    dan `setupBookForms()` untuk menambahkan event listener pada form dan tombol.
--}}
<div id="buku-container" class="bg-white rounded-xl shadow-sm p-6 mb-6 fade-in">
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
            {{-- Tabel body ini akan diisi secara dinamis oleh loadBooksTable() dari buku.js --}}
            <tbody id="booksTableBody" class="divide-y divide-gray-200"></tbody>
        </table>
    </div>
</div>

{{-- Modal untuk Tambah Buku --}}
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
                        <label class="block text-sm font-medium text-gray-700 mb-2">Penerbit</label>
                        <input type="text" id="bookPublisher" required class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500">
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

{{-- Modal untuk Edit Buku --}}
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
                        <label class="block text-sm font-medium text-gray-700 mb-2">Penerbit</label>
                        <input type="text" id="editBookPublisher" required class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500">
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