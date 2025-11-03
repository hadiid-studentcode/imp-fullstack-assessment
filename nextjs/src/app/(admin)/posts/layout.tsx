import React from "react";


export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="drawer lg:drawer-open">
      {/* Checkbox untuk mengontrol drawer di mobile */}
      <input id="main-drawer" type="checkbox" className="drawer-toggle" />

      {/* Konten Utama (Navbar + Page Content) */}
      <div className="drawer-content flex flex-col min-h-screen">
        {/* Navbar */}
        <div className="navbar bg-base-100 shadow-sm w-full sticky top-0 z-10">
          {/* Tombol Hamburger (Hanya terlihat di mobile) */}
          <div className="flex-none lg:hidden">
            <label
              htmlFor="main-drawer"
              aria-label="open sidebar"
              className="btn btn-square btn-ghost"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                className="inline-block h-6 w-6 stroke-current"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h16M4 18h16"
                ></path>
              </svg>
            </label>
          </div>

          {/* Judul Navbar */}
          <div className="flex-1 px-2 mx-2 text-lg font-bold">
            Aplikasi Saya
          </div>

          {/* Menu Navbar (Desktop) */}
          <div className="flex-none hidden lg:flex">
            <ul className="menu menu-horizontal p-0 items-center">
              <li>
                <a href="">Logout</a>
              </li>
            </ul>
          </div>
        </div>

        {/* Konten Halaman Anda */}
        <main className="flex-grow p-6 bg-base-200">{children}</main>

        {/* Footer Sederhana */}
        <footer className="footer footer-center bg-base-300 p-4 text-base-content">
          <p>&copy; {new Date().getFullYear()} - Hak Cipta Dilindungi</p>
        </footer>
      </div>

      {/* Sidebar */}
      <div className="drawer-side">
        {/* Overlay untuk menutup sidebar di mobile saat diklik di luar */}
        <label
          htmlFor="main-drawer"
          aria-label="close sidebar"
          className="drawer-overlay"
        ></label>

        {/* Konten Menu Sidebar */}
        <ul className="menu bg-base-100 min-h-full w-80 p-4 text-base-content">
          <li className="menu-title text-lg font-bold p-4">Menu Utama</li>
          <li>
            <h1>Logout</h1>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              strokeLinejoin="round"
              strokeLinecap="round"
              strokeWidth="2"
              fill="none"
              stroke="currentColor"
              className="inline-block size-4 my-1.5"
            >
              <path d="M15 21v-8a1 1 0 0 0-1-1h-4a1 1 0 0 0-1 1v8"></path>
              <path d="M3 10a2 2 0 0 1 .709-1.528l7-5.999a2 2 0 0 1 2.582 0l7 5.999A2 2 0 0 1 21 10v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
            </svg>
            Homepage
          </li>
          <li>
            <a href="/settings">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                strokeLinejoin="round"
                strokeLinecap="round"
                strokeWidth="2"
                fill="none"
                stroke="currentColor"
                className="inline-block size-4 my-1.5"
              >
                <path d="M20 7h-9"></path>
                <path d="M14 17H5"></path>
                <circle cx="17" cy="17" r="3"></circle>
                <circle cx="7" cy="7" r="3"></circle>
              </svg>
              Settings
            </a>
          </li>
          {/* Tambahkan item sidebar lainnya di sini */}
          <li>
            <a href="/item1">Sidebar Item 1</a>
          </li>
          <li>
            <a href="/item2">Sidebar Item 2</a>
          </li>
        </ul>
      </div>
    </div>
  );
}
