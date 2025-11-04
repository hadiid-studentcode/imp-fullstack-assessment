"use client";

import { useApiMutation } from "@/hooks/useApiMutation";
import { useApiQuery } from "@/hooks/useApiQuery";
import { deletePost, getPosts } from "@/services/postService";
import { Post } from "@/types";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import { CiEdit } from "react-icons/ci";
import { FaRegEye, FaRegTrashAlt } from "react-icons/fa";

export default function PostManagementPage() {
  const [page, setPage] = useState(1);
  const router = useRouter();

  const { data, isLoading, error, refetch } = useApiQuery(
    () => getPosts(page),
    [page]
  );
  const { mutate: deletePostMutate } = useApiMutation(deletePost, {
    onSuccess: () => {
      toast("Post successfully deleted.");
      refetch();
    },
    onError: (err) => {
      toast(`Post deletion failed: ${err.message}`);
    },
  });

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <span className="loading loading-spinner loading-lg"></span>
      </div>
    );
  }

  if (error) {
    return (
      <div className="alert alert-error max-w-lg mx-auto">
        <span>Error: {error}</span>
      </div>
    );
  }

  const handleDelete = (id: number) => {
    if (window.confirm("Apakah Anda yakin ingin menghapus post ini?")) {
      deletePostMutate(id);
    }
  };
  return (
    <div className="card bg-base-100 shadow-xl">
      <Toaster />

      <div className="card-body">
        <div className="card-title flex items-center justify-between mb-4">
          <h2 className="text-2xl font-bold">Manajemen Postingan</h2>
          <Link href="/posts/create" className="btn btn-primary">
            + Tambah Postingan Baru
          </Link>
        </div>

        {/* Tabel Data */}
        <div className="overflow-x-auto">
          <table className="table w-full">
            {/* head */}
            <thead className="bg-base-200">
              <tr>
                <th>No</th>
                <th>Title</th>
                <th>Body</th>
                <th>Aksi</th>
              </tr>
            </thead>
            <tbody>
              {data && data.data.length > 0 ? (
                data.data.map((post: Post, index: number) => (
                  <tr key={post.id} className="hover">
                    <th>{index + 1}</th>
                    <td>{post.title}</td>
                    <td>{post.body}</td>
                    <td className="flex gap-2">
                      <Link
                        href={`/posts/${post.id}`}
                        className="btn btn-ghost btn-sm btn-circle"
                        aria-label="show"
                      >
                        <FaRegEye />
                      </Link>
                      <button
                        className="btn btn-ghost btn-sm btn-circle"
                        aria-label="Edit"
                        onClick={() => router.push(`/posts/${post.id}/edit`)}
                      >
                        <CiEdit />
                      </button>
                      <button
                        className="btn btn-ghost btn-sm btn-circle text-error"
                        aria-label="Delete"
                        onClick={() => handleDelete(post.id)}
                      >
                        <FaRegTrashAlt />
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={4} className="text-center">
                    Tidak ada data
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {data && (
          <div className="join card-actions justify-end mt-6">
            <button
              onClick={() => setPage(data.meta.current_page - 1)}
              disabled={!data.links.prev}
              className="join-item btn btn-outline"
            >
              « Prev
            </button>
            <button
              onClick={() => setPage(data.meta.current_page + 1)}
              disabled={!data.links.next}
              className="join-item btn btn-outline"
            >
              Next »
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
