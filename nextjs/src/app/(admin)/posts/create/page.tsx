"use client";

import { useState, FormEvent } from "react";
import { useRouter } from "next/navigation";
import { useApiMutation } from "@/hooks/useApiMutation";
import { createPost } from "@/services/postService";
import { PostFormData } from "@/types";
import { useAuth } from "@/context/AuthContext";

export default function CreatePostPage() {
  const [formData, setFormData] = useState<PostFormData>({
    title: "",
    body: "",
  });
  const router = useRouter();
  const { user } = useAuth(); 

  const { mutate, isLoading, error, setError } = useApiMutation(createPost, {
    onSuccess: (data) => {
    
      alert("Post berhasil dibuat!");
      console.log(data);
    },
    onError: (err) => {
      console.error(err.message);
    },
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (error) setError(null);
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    await mutate(formData);
  };

  if (!user) {
    return (
      <div className="text-center p-10">
        <p>Anda harus login untuk membuat post.</p>
        <button
          onClick={() => router.push("/login")}
          className="btn btn-primary mt-4"
        >
          Login
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">Buat Postingan Baru</h1>

      {error && (
        <div className="alert alert-error mb-4">
          <span>{error}</span>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="form-control">
          <label className="label">
            <span className="label-text">Judul</span>
          </label>
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            className="input input-bordered w-full"
            disabled={isLoading}
            required
          />
        </div>

        <div className="form-control">
          <label className="label">
            <span className="label-text">Isi Postingan</span>
          </label>
          <textarea
            name="body"
            value={formData.body}
            onChange={handleChange}
            className="textarea textarea-bordered h-40"
            disabled={isLoading}
            required
          ></textarea>
        </div>

        <div className="form-control">
          <button
            type="submit"
            className="btn btn-primary"
            disabled={isLoading}
          >
            {isLoading && <span className="loading loading-spinner"></span>}
            Submit Postingan
          </button>
        </div>
      </form>
    </div>
  );
}
