import Link from "next/link";
import { FaHome } from "react-icons/fa";
import { IoIosCreate } from "react-icons/io";

export default function Sidebar() {
  return (
    <>
      <div className="drawer-side">
        <label
          htmlFor="main-drawer"
          aria-label="close sidebar"
          className="drawer-overlay"
        ></label>

        <ul className="menu bg-base-100 min-h-full w-80 p-4 text-base-content">
          <li className="menu-title text-lg font-bold p-4">Menu Utama</li>
          <li className="mb-3">
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
            <Link href="/dashboard">
              <FaHome />
              Dashboard
            </Link>
          </li>

          <li>
            <Link href="/posts">
              <IoIosCreate />
              Post Management
            </Link>
          </li>
        </ul>
      </div>
    </>
  );
}
