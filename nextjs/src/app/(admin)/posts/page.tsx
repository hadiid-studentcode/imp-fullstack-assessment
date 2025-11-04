import Link from "next/link";
import React from "react";
import { CiEdit } from "react-icons/ci";
import { FaRegTrashAlt } from "react-icons/fa";

const mockPosts = [
  { id: 1, title: "Judul Post Pertama", author: "Admin" },
  { id: 2, title: "DaisyUI itu Keren", author: "User" },
  { id: 3, title: "Belajar Next.js dan Laravel", author: "Admin" },
];

export default function PostManagementPage() {
  return (
    <div className="card bg-base-100 shadow-xl">
      <div className="card-body">
        <div className="card-title flex items-center justify-between mb-4">
          <h2 className="text-2xl font-bold">Manajemen Postingan</h2>
          <Link href="/posts/create" className="btn btn-primary">+ Tambah Postingan Baru</Link>
        </div>

        {/* Tabel Data */}
        <div className="overflow-x-auto">
          <table className="table w-full">
            {/* head */}
            <thead className="bg-base-200">
              <tr>
                <th>No</th>
                <th>Judul Postingan</th>
                <th>Author</th>
                <th>Aksi</th>
              </tr>
            </thead>
            <tbody>
              {mockPosts.map((post, index) => (
                <tr key={post.id} className="hover">
                  <th>{index + 1}</th>
                  <td>{post.title}</td>
                  <td>{post.author}</td>
                  <td className="flex gap-2">
                    <button
                      className="btn btn-ghost btn-sm btn-circle"
                      aria-label="Edit"
                    >
                      <CiEdit />
                    </button>
                    <button
                      className="btn btn-ghost btn-sm btn-circle text-error"
                      aria-label="Delete"
                    >
                      <FaRegTrashAlt />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="join card-actions justify-center mt-6">
          <button className="join-item btn">«</button>
          <button className="join-item btn btn-active">1</button>
          <button className="join-item btn">2</button>
          <button className="join-item btn">3</button>
          <button className="join-item btn btn-disabled">...</button>
          <button className="join-item btn">99</button>
          <button className="join-item btn">»</button>
        </div>
      </div>
    </div>
  );
}
