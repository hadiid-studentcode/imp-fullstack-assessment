'use client'

import { useAuth } from "@/context/AuthContext";

export default function Navbar() {
    const { logout } = useAuth();
  return (
    <>
      <div className="navbar bg-base-100 shadow-sm w-full sticky top-0 z-10">
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

        <div className="flex-1 px-2 mx-2 text-lg font-bold">Aplikasi Saya</div>

        <div className="flex-none hidden lg:flex">
          <ul className="menu menu-horizontal p-0 items-center">
            <li>
              <button className="btn btn-outline" onClick={logout} >Logout</button>
            </li>
          </ul>
        </div>
      </div>
    </>
  );
}
