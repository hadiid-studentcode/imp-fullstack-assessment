# Assessment Fullstack (Project Based) - PT Informatika Media Pratama

Ini adalah proyek submission untuk asesmen Fullstack (Project Based) di PT Informatika Media Pratama.

Aplikasi ini adalah web app sederhana yang memiliki dua fitur utama:
1.  **Authentication**: Sign Up, Sign In, dan Sign Out.
2.  **Post Management (CRUD)**: Membuat, membaca, memperbarui, dan menghapus postingan, lengkap dengan paginasi.

---

## STACK TEKNOLOGI

Proyek ini dibuat menggunakan dua *stack* terpisah sesuai dengan instruksi:

* **Backend (API):** **Laravel**
* **Frontend (Client):** **Next.js** (menggunakan App Router)
* **UI/Komponen:** **DaisyUI**

---

## STRUKTUR FOLDER

Repositori ini berisi dua folder utama yang menampung masing-masing aplikasi:

* `./laravel/`: Berisi seluruh kode untuk backend API Laravel.
* `./nextjs/`: Berisi seluruh kode untuk frontend Next.js.

---

## INFORMASI API ENDPOINTS

Endpoint API ini didefinisikan di `laravel/routes/api.php`. Semua endpoint secara otomatis diawali dengan prefix `/api/` oleh Laravel.

URL Backend yang digunakan di Next.js: `http://localhost:8000/api`

### Rute Publik (Tidak Perlu Autentikasi)
* `POST /sign-up`: Registrasi user baru.
* `POST /sign-in`: Login user.
* `GET /hello-world`: Rute tes untuk "Hello World".

### Rute Terproteksi (Wajib Autentikasi - Sanctum)

* `POST /sign-out`: Logout user.
* `GET /posts`: Menampilkan semua postingan (paginasi).
* `POST /posts`: Menyimpan postingan baru.
* `GET /posts/{id}`: Menampilkan detail satu postingan.
* `PUT /posts/{id}`: Memperbarui postingan.
* `DELETE /posts/{id}`: Menghapus postingan.

---

## PANDUAN INSTALASI DAN MENJALANKAN PROYEK

Anda perlu menjalankan kedua aplikasi (backend dan frontend) secara bersamaan.

### Prasyarat

* PHP >= 8.1
* Composer
* Node.js >= 18.x
* NPM / Yarn
* Database (MySQL/PostgreSQL)

---

### 1. Backend (Laravel API)

Backend akan berjalan di `http://localhost:8000`.

1.  **Masuk ke direktori laravel:**
    ```bash
    cd laravel
    ```

2.  **Install dependensi Composer:**
    ```bash
    composer install
    ```

3.  **Salin file environment:**
    ```bash
    cp .env.example .env
    ```

4.  **Atur file `.env`:**
    Buka file `.env` dan atur koneksi database Anda (terutama `DB_HOST`, `DB_PORT`, `DB_DATABASE`, `DB_USERNAME`, `DB_PASSWORD`).

5.  **Generate key aplikasi:**
    ```bash
    php artisan key:generate
    ```

6.  **Jalankan migrasi database:**
    ```bash
    php artisan migrate
    ```

7.  **Jalankan server API:**
    ```bash
    php artisan serve
    ```
    > **Catatan:** Server API Laravel akan berjalan di `http://localhost:8000`.

---

### 2. Frontend (Next.js Client)

Frontend akan berjalan di `http://localhost:3000`. Buka terminal baru untuk menjalankan ini.

1.  **Masuk ke direktori nextjs:**
    ```bash
    cd nextjs
    ```

2.  **Install dependensi Node.js:**
    ```bash
    npm install
    ```

3.  **Atur file environment:**
    Buat file `.env.local` di dalam folder `nextjs/`. (Jika belum ada).

4.  **Isi file `.env.local`:**
    Pastikan Anda mengarahkan URL API ke server Laravel yang sedang berjalan. (Ini sesuai dengan file `config.ts` kita).
    ```env
    URL_BACKEND_API="http://localhost:8000/api"
    ```

5.  **Jalankan server development:**
    ```bash
    npm run dev
    ```

6.  **Selesai!**
    Buka `http://localhost:3000` di browser Anda untuk melihat aplikasi.

---

## 📝 CATATAN TAMBAHAN

* **Manajemen State (Next.js):** Aplikasi frontend tidak menggunakan Redux. Manajemen *state* global (seperti status login) ditangani menggunakan **React Context API**.
* **Data Fetching (Next.js):** Pengambilan data dan mutasi (CRUD) ditangani menggunakan *custom hooks* (`useApiQuery` dan `useApiMutation`) untuk memisahkan logika *fetching* dari komponen UI.
* **Docker:** Sesuai instruksi, pengerjaan difokuskan pada fungsionalitas aplikasi. Oleh karena itu, proyek ini **tidak** menyertakan konfigurasi `docker-compose` yang bersifat opsional/bonus.