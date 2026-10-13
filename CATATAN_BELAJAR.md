# Catatan belajar PWeb — BomboBites

Tujuannya membuat website yang tampil menarik tetapi kode utamanya masih bisa dipahami mahasiswa semester 3. Daftar topik mengikuti tautan materi Ady Ahandika yang diberikan. Halaman dosen tidak berhasil diakses saat pengerjaan, sehingga ini adalah pemetaan terhadap **topik** materi, bukan klaim bahwa seluruh contoh atau konvensi dosen sudah dibaca dan diikuti persis.

## Materi dan penerapannya

| Topik materi | Penerapan di proyek |
| --- | --- |
| Persiapan pemrograman web | Folder proyek, VS Code/Live Server, browser DevTools, repository GitHub, dan publikasi Pages. |
| Konsep aplikasi web | Browser meminta HTML/CSS/JS serta JSON ke server. Google Form menangani pengumpulan pesanan di layanan terpisah. |
| CSS (si-es-es) | Selector, variabel `:root`, box model, Grid, Flexbox, media query, hover, keyframes, dan scroll snap. |
| JavaScript dasar / DOM | `querySelector`, `getElementById`, `textContent`, `classList`, event click, serta menu mobile. |
| JavaScript lanjutan / DOM dinamis / async / fetch | `createElement`, `append`, `replaceChildren`, `async/await`, Fetch API, `response.json()`, validasi, dan `try/catch/finally`. |
| Slicing HTML/CSS/JS | Membagi desain menjadi header, hero, katalog, cerita, cara pesan, FAQ, dan footer; diuji pada desktop serta HP. |
| Tailwind CSS | Tidak digunakan dalam versi ini. Layout memakai CSS native yang telah dipelajari sebelumnya; bisa menjadi latihan konversi class utility kemudian. |
| PHP | Tidak dijalankan pada versi GitHub Pages. PHP membutuhkan server yang bisa memproses PHP; Google Form menjadi layanan penerima pesanan. |

Tidak semua materi harus dipaksakan masuk pada satu website. PHP dan Tailwind adalah pilihan teknologi yang bisa dikembangkan nanti, bukan persyaratan agar halaman HTML/CSS/JS ini berjalan.

## Alur sederhana website

1. Browser membaca `index.html`, lalu CSS dan dua file JavaScript.
2. `config.js` menyediakan URL Instagram serta Google Form.
3. `script.js` memeriksa URL. Jika form kosong, status tetap “segera hadir”.
4. Data cadangan langsung tampil, kemudian `loadMenu()` meminta `data/menu.json` menggunakan Fetch API.
5. Jika respons valid, katalog dirender dari JSON; jika gagal, data cadangan tetap tampil.
6. Pengunjung menggeser katalog dan membuka bagian info pre-order.
7. Saat form telah tersedia, pengunjung pindah ke Google Form. Website tidak memproses pembayaran atau menyimpan pesanan.

## Bagian kode yang sebaiknya kamu pahami

### DOM dan event

```js
toggle.addEventListener("click", () => {
  const open = navigation.classList.toggle("open");
  toggle.setAttribute("aria-expanded", String(open));
});
```

Saat tombol menu ditekan, class `open` ditambahkan atau dihapus. CSS menampilkan daftar navigasi ketika class tersebut ada. `aria-expanded` menjelaskan status menu untuk pembaca layar.

### Fetch API dan async/await

```js
const response = await fetch("data/menu.json");
if (!response.ok) throw new Error("Menu belum bisa dimuat");
const data = await response.json();
renderMenu(data);
```

`fetch` meminta file JSON. `await` menunggu hasilnya tanpa menghentikan seluruh antarmuka. `response.ok` memeriksa status HTTP. Setelah JSON diubah menjadi array, fungsi `renderMenu` membuat kartu.

### DOM dinamis

```js
const card = document.createElement("article");
const title = document.createElement("h3");
title.textContent = flavor.name;
card.append(title);
```

Elemen dibuat melalui JavaScript berdasarkan data. `textContent` menempatkan isi sebagai teks, bukan HTML yang harus dieksekusi.

### Responsive CSS

Grid hero memakai dua kolom pada desktop. Di bawah 700px, media query mengubahnya menjadi satu kolom. Katalog memakai `overflow: auto` dan `scroll-snap-type` agar mudah digeser lewat sentuhan.

### Animasi scroll

`IntersectionObserver` mendeteksi kapan bagian masuk area layar. Class `visible` kemudian ditambahkan, sehingga transisi opacity dan posisi dapat berjalan. Parallax memakai `requestAnimationFrame` dan dibatasi 35px; di HP efek parallax dimatikan. Jika perangkat meminta reduced motion, animasi dihentikan.

## Latihan untuk menambah pemahaman

- Ganti satu deskripsi di `data/menu.json`, lalu lihat perubahan melalui Live Server.
- Isi URL form dan bandingkan tampilan status sebelum/sesudah.
- Ganti warna `--blue` di `:root`.
- Cari aturan `@media(max-width:700px)` dan jelaskan bagian mana yang berubah di HP.
- Matikan JavaScript dari DevTools: konten utama dan link Instagram tetap bisa dibaca; noscript memberi info rasa.

## Jika nanti ingin memakai PHP

Kembangkan pada server PHP (misalnya lingkungan lokal XAMPP atau hosting yang mendukung PHP). Alurnya bisa berupa form POST → validasi server → simpan database → konfirmasi. Fitur tersebut belum dibuat karena permintaan saat ini memakai link Google Form dan tujuan publikasinya GitHub Pages. Hindari mengaku website ini sudah punya backend PHP atau menyimpan pesanan sendiri.

## Tautan materi yang diberikan

- https://adyahandika.my.id/course/pemrograman-web/persiapan-pemrograman-web
- https://adyahandika.my.id/course/pemrograman-web/konsep-aplikasi-web
- https://adyahandika.my.id/course/pemrograman-web/si-es-es
- https://adyahandika.my.id/course/pemrograman-web/pengantar-javascript-dasar-manipulasi-dom
- https://adyahandika.my.id/course/pemrograman-web/javascript-lanjutan-dom-dinamis-asynchronous-javascript-dan-fetch-api
- https://adyahandika.my.id/course/pemrograman-web/tugas-slicing-website-htmlcssjs
- https://adyahandika.my.id/course/pemrograman-web/tailwind-css
- https://adyahandika.my.id/course/pemrograman-web/php-hypertext-preprocessor
