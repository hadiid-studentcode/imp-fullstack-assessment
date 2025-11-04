/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import { useState, FormEvent, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useApiMutation } from "@/hooks/useApiMutation";
import { createPost } from "@/services/postService";
import { PostFormData } from "@/types";
import { useAuth } from "@/context/AuthContext";
import ErrorAlert from "@/components/errorAlert";
import toast, { Toaster } from "react-hot-toast";

export default function CreatePostPage() {
  const [formData, setFormData] = useState<PostFormData>({
    title: "",
    body: "",
  });
  const router = useRouter();
  const { user } = useAuth();

  const { mutate, isLoading, error, setError } = useApiMutation(createPost, {
    onSuccess: (data) => {
     toast("Post created successfully.");
     setFormData({
       title: "",
       body: "",
     });
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

  useEffect(() => {
    if (!user) {
      router.push("/sign-in");
    }
  }, [user, router]);

  if (!user) {
    return null;
  }

  return (
    <div className="card bg-base-100 shadow-sm">
      <Toaster />
      {error && <ErrorAlert error={error} />}

      <div className="card-body">
        <h2 className="card-title">Create New Post</h2>
        <form onSubmit={handleSubmit}>
          <fieldset className="fieldset">
            <legend className="fieldset-legend">Title</legend>
            <input
              type="text"
              className="input"
              placeholder="Type here"
              value={formData.title}
              onChange={handleChange}
              name="title"
              disabled={isLoading}
              required
            />

            <legend className="fieldset-legend">Body</legend>
            <textarea
              className="textarea h-24"
              placeholder="Type here"
              name="body"
              value={formData.body}
              onChange={handleChange}
              disabled={isLoading}
              required
            ></textarea>
          </fieldset>
          <div className="card-actions mt-4 ">
            <button className="btn btn-primary" disabled={isLoading}>
              {isLoading && <span className="loading loading-spinner"></span>}
              Create Post
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
