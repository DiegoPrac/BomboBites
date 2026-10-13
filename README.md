# BomboBites — Pre-order

Website HTML, CSS, dan JavaScript native untuk BomboBites. Tidak memerlukan npm atau proses build.

## Info batch

- Harga: Rp8.000/buah — Choco, Matcha, Ubi Ungu.
- Form: https://forms.gle/V3x5QW4d4DjhM1Rh6
- Penutupan PO: 14 Oktober 2026.
- Pengambilan: 15 Oktober 2026 di FASILKOM.
- Bayar lewat QRIS dan unggah bukti pembayaran di Google Form.
- Kartu Coming soon adalah teaser, belum dapat dipesan.

Google Form menangani pesanan; website tidak menyimpan data pelanggan. Form dengan unggahan bukti pembayaran dapat meminta login Google.

## Jalankan

Buka index.html langsung, atau gunakan Live Server. Data rasa dimuat dari data/menu.json; script.js memiliki fallback jika fetch gagal.

## Publikasi GitHub Pages

1. Buat repository BomboBites pada akun GitHub.
2. Unggah isi folder ini ke root repository (index.html harus di root).
3. Buka Settings → Pages → Deploy from a branch.
4. Pilih branch main, folder / (root), lalu Save.
5. Tunggu publikasi selesai; gunakan URL yang ditampilkan GitHub untuk bio Instagram.

## Mengubah batch berikutnya

Edit config.js untuk link form; edit index.html dan script.js untuk info tanggal. Harga serta nama rasa ada di data/menu.json dan fallback script.js. Tampilan di style.css. Semua tanggal batch saat ini adalah teks statis, bukan penutupan otomatis.

## Validasi

Versi final diperiksa melalui pemeriksaan sintaks JavaScript, parser CSS, dan simulasi DOM untuk katalog empat kartu, slider, menu mobile, tautan Instagram/form, dan fallback data. Tampilan browser final serta pengiriman jawaban form belum diuji.

## Pembelajaran

Lihat CATATAN_BELAJAR.md untuk hubungan kode dengan materi PWeb. Aset produk dibuat dengan bantuan AI.
