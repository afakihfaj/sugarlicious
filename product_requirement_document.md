# Product Requirement Document (PRD)

## Sugarlicious Artisanal Bakehouse Web Platform

---

## 1. Project Overview & Background

Sugarlicious adalah *artisanal bakehouse* yang memproduksi roti dan *pastry* premium berbahan mentega murni Prancis & New Zealand, fermentasi lambat 24 jam alami (*wild levain*), serta bebas bahan pengawet/pelembut sintetis.

Sebelumnya, transaksi dan pertanyaan stok harian bergantung pada interaksi chat WhatsApp manual dan kunjungan langsung ke *bakehouse*. Platform web ini dibangun ulang sebagai Single Page Application (SPA) modern yang interaktif, memiliki visual 3D imersif, katalog terpusat, serta generator keranjang belanja interaktif yang memformat pesanan terstruktur langsung ke WhatsApp resmi toko.

---

## 2. Product Objectives & Target Audience

### 2.1 Objectives
1. **Mengurangi Beban Operasional Admin:** Mengeliminasi proses tanya-jawab menu berulang kali via WhatsApp melalui katalog digital dinamis dan keranjang interaktif.
2. **Standardisasi Format Pesanan:** Memastikan data penting (nama, nomor WA, opsi kirim/ambil, request potong roti, alamat lengkap, dan jam pengantaran) masuk dalam format teks WA yang seragam.
3. **Meningkatkan Kepercayaan & Pengalaman Visual Brand:** Mengombinasikan pilar kualitas, social proof, serta pengalaman visual 3D interaktif (*hero showcase*) untuk menegaskan kesan artisanal modern.

### 2.2 User Persona
1. **Pecinta Roti Premium / Food Enthusiast:** Mencari *shokupan* atau *croissant* otentik berstandar kafe.
2. **Pemilik Kafe / Bisnis Kuliner (*B2B Light*):** Membutuhkan suplai *pastry* berkualitas untuk menu *pairing* kopi.
3. **Keluarga / Ibu Rumah Tangga:** Sangat memperhatikan komposisi bahan bebas pengawet untuk konsumsi harian anak dan keluarga.

---

## 3. Technology Stack & Infrastructure

Platform ini dibangun menggunakan arsitektur modern berbasis performa tinggi:

| Layer / Kebutuhan | Teknologi Terpilih | Justifikasi & Peran |
| :--- | :--- | :--- |
| **Runtime & Package Manager** | **Bun** | Instalasi dependensi kilat, script runner cepat, dan kompatibilitas modern module bundling. |
| **Framework / View Library** | **React 18/19 (Vite)** | Ekosistem reaktif komponen berbasis SPA, modul HMR (Hot Module Replacement) super instan via Vite. |
| **Styling & Design System** | **Tailwind CSS (v3/v4)** | *Utility-first styling* untuk desain responsif yang konsisten, animasi halus, dan file CSS akhir yang terkompresi optimal. |
| **Interactive 3D Graphics** | **Three.js** *(atau `@react-three/fiber` / `@react-three/drei`)* | Rendering model 3D roti/pastry interaktif pada Hero Section atau Visual Proof (rotasi 360°, lighting hangat oven, dan micro-interaction canvas). |
| **Deployment & Hosting** | **Netlify** | CI/CD otomatis via Git, Global Edge CDN, SSL otomatis gratis, dan dukungan rewrite rules untuk SPA routing. |

### 3.1 Spesifikasi Three.js
* **Komponen:** Canvas WebGL interaktif pada Hero Section atau bagian Showcase Produk.
* **Perilaku:** 
  * Orbit/rotasi halus mengikuti pointer/cursor (*gyroscope* pada perangkat mobile).
  * Lighting bertema hangat (*warm ambient & directional light*) merepresentasikan roti hangat baru keluar dari oven.
  * *Fallback handling:* Menampilkan fallback gambar statis berkualitas tinggi jika perangkat pengguna tidak mendukung WebGL atau mengalami *performance drop*.

### 3.2 Konfigurasi Deployment Netlify
* **Build Command:** `bun run build` (atau `vite build`)
* **Publish Directory:** `dist`
* **SPA Redirects:** File `_redirects` atau konfigurasi `netlify.toml` dengan aturan:
  ```toml
  [[redirects]]
    from = "/*"
    to = "/index.html"
    status = 200
  ```

---

## 4. Scope of Work (SOW)

* **In Scope:**
  * Single Page Application (SPA) berbasis React + Vite.
  * Setup styling terintegrasi Tailwind CSS.
  * Kanvas Three.js untuk visual interaktif 3D produk artisan.
  * Navigasi tautan cepat (*Galeri Produk*, *Rahasia Rasa*, *Ulasan*, *Lokasi*).
  * Sistem filter kategori menu produk.
  * Keranjang belanja lokal (*client-side React state* / *slide-over drawer*).
  * Fitur kustomisasi roti (catatan *slicing* / ketebalan potongan *loaf*).
  * Checkout modal dengan validasi input form.
  * WhatsApp Order Formatter (konversi data keranjang & formulir menjadi link WhatsApp terenkode).
  * Integrasi Google Maps embed & link navigasi.
  * Modal viewer dokumentasi blueprint Markdown.
  * Konfigurasi continuous deployment di Netlify.

* **Out of Scope (Fase Sekarang):**
  * *Payment gateway* otomatis (Midtrans/Xendit) — pembayaran saat ini diverifikasi manual via WhatsApp/QRIS.
  * Autentikasi dan akun pengguna (*membership system*).
  * Pelacakan kurir *real-time GPS*.

---

## 5. Feature Specifications & Requirements

### 5.1 Header & Announcement Bar
* **Top Bar:** Menampilkan informasi *fresh batch* (04.00 Subuh), pengiriman instan, dan penawaran *free ongkir* untuk *bundle/hampers*.
* **Navbar Sticky/Fixed:**
  * Logo brand Sugarlicious.
  * Navigasi *smooth-scroll* ke setiap seksi halaman.
  * Tombol CTA langsung WhatsApp chat umum.
  * Tombol toggle Cart lengkap dengan *counter badge* (jumlah item di keranjang).

### 5.2 Hero Section dengan 3D Interactive Canvas
* **Hero Content:** Headline berbasis rasa (*Hangat Dari Oven, Lembut Hingga Gigitan Terakhir*), ringkasan bahan baku utama, tombol CTA ganda (eksplorasi menu & chat WA).
* **3D Interactive Scene (Three.js):** 
  * Model 3D roti/croissant dengan tekstur renyah dan partikel lembut.
  * Interaksi drag/rotate pengguna.
* **Statistik Visual:** 100% Mentega Prancis, 24 Jam Fermentasi Lambat, 0% Pengawet Sintetis.
* **Floating Badge:** Validasi waktu panggang subuh (04.00 WIB).

### 5.3 Section "Rahasia Rasa" (Quality Pillars)
Grid 4 pilar komitmen bahan dan teknik produksi:
1. 100% Mentega Prancis & NZ (84% fat grade A).
2. Fermentasi lambat 24 jam dengan ragi alami (*wild levain*).
3. 0% Pengawet & pelembut kimiawi.
4. *Freshly baked* setiap subuh (04.00 WIB).

### 5.4 Katalog Produk Dinamis & Filter Kategori
* **Tabs Filter:**
  * Semua Menu (`all`)
  * Roti Tawar & Sourdough (`loaf`)
  * Pastry & Croissant (`pastry`)
  * Sweet & Savory Bun (`bun`)
  * Paket Bundle & Hampers (`box`)
* **Product Card Requirements:**
  * Gambar produk, label kategori, nama roti, deskripsi rasa/bahan.
  * Harga satuan (format IDR).
  * Tombol interaktif `+ Keranjang`.

### 5.5 Keranjang Belanja (*Cart Drawer Panel*)
* Panel *slide-over* samping kanan dengan latar *overlay*.
* **State Keranjang:**
  * *Empty State:* Tampilan ikon keranjang kosong dengan ajakan memilih menu.
  * *Filled State:* List item berisi nama produk, kontrol kuantitas (`+` / `-`), harga subtotal item, dan tombol hapus.
* **Fitur Request Potongan Roti (*Slice Note*):**
  * Input teks khusus untuk *loaf/shokupan* (misal: "Slice 1.5 cm", "Slice tipis", "Biarkan utuh").
* **Subtotal Price Calculation:** Menampilkan akumulasi harga otomatis secara *real-time*.
* **CTA Button:** `Lanjut ke Detail Pemesanan`.

### 5.6 Modal Informasi Pemesanan & WhatsApp Checkout
* **Formulir Data Pemesan:**
  * `Nama Pemesan` (Required, teks)
  * `No. WhatsApp Aktif` (Required, tel/angka)
  * `Metode Pengambilan / Pengiriman` (Radio button: Kurir Instan / Ambil Sendiri di Bakehouse)
  * `Alamat Pengiriman Lengkap` (Required kondisional jika memilih kurir)
  * `Estimasi Jam Diambil / Dikirim` (Teks opsional)
* **Logika WhatsApp URL Generator:**
  * Pesan otomatis terformat rapi merinci daftar belanja, slicing request, identitas pemesan, dan metode kirim.
  * URL redirect: `https://wa.me/6281226070170?text={encoded_message}`.

### 5.7 Social Proof & Bukti Pelanggan
* Penilaian agregat (Rating 4.9/5.0 dari 1.280+ ulasan pembeli).
* Kartu testimoni mencakup representasi multi-persona (Food Creator, Pemilik Kafe, Praktisi Medis/Ibu).

### 5.8 Informasi Outlet Fisik & Navigasi Lokasi
* Alamat resmi: *JL. Sucipto GG. Kharisma LK. Parse RT 003 RW 002*.
* Jam operasional (07.00 - 21.00 WIB) & jadwal panggang (04.00 WIB).
* Fasilitas: *Fresh Daily Baking, Area Pick-Up, Parkir, Free WiFi, QRIS & Cashless*.
* Peta interaktif tersemat (Google Maps Embed) & tautan langsung Google Maps App.

---

## 6. Non-Functional Requirements (NFR)

1. **Responsiveness:** Tampilan responsif *Mobile First* menggunakan utility classes Tailwind CSS.
2. **WebGL Performance:** Optimasi mesh, texture size (< 1MB), dan animasi Three.js agar tetap stabil di 60 FPS pada perangkat mobile tanpa membebani GPU.
3. **Build Speed & Developer Experience:** Menggunakan Bun dan Vite untuk waktu kompilasi sub-detik.
4. **Usability & Accessibility:**
   * Semantic HTML pada komponen React.
   * Kontras warna sesuai standar WCAG.
   * Form accessible dengan label terikat dan atribut ARIA.

---

## 7. Success Metrics & KPIs

* **Conversion Rate to WhatsApp:** Rasio pengunjung web yang menekan tombol *Kirim Pesanan ke WhatsApp*.
* **Interaction Rate pada 3D Model:** Persentase user yang berinteraksi dengan scene 3D Three.js.
* **Order Accuracy:** Zero-error order format pada pesan WhatsApp yang diterima admin.
* **Lighthouse Performance Score:** Skor performa > 85 pada audit mobile di Netlify deployment.