"use client";

import { useApiQuery } from "@/hooks/useApiQuery";
import { getPostById } from "@/services/postService";
import { useParams } from "next/navigation";
import Link from "next/link";

export default function PostDetailPage() {
  const params = useParams();
  const id = params.id as string;
  const {
    data: post,
    isLoading,
    error,
  } = useApiQuery(() => getPostById(id), [id]);

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

  return (
    <article className="max-w-3xl mx-auto p-4">
      {post && (
        <>
          <h1 className="text-4xl font-extrabold mb-4">{post?.post.title}</h1>
          <div className="text-sm text-gray-500 mb-6">
            <p>
              Diterbitkan pada:{" "}
              {new Date(post.post?.created_at).toLocaleDateString("id-ID", {
                day: "numeric",
                month: "long",
                year: "numeric",
              })}
            </p>
          </div>

          <div className="prose lg:prose-xl max-w-none">
            <p>{post.post?.body}</p>
          </div>

          <hr className="my-8" />

          <Link href="/posts" className="btn btn-ghost mt-8">
            ← Kembali ke semua post
          </Link>
        </>
      )}
    </article>
  );
}
