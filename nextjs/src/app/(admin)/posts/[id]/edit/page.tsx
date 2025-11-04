/* eslint-disable react-hooks/set-state-in-effect */
"use client";

import { useState, FormEvent, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
import { useApiMutation } from "@/hooks/useApiMutation";
import { useApiQuery } from "@/hooks/useApiQuery";
import { getPostById, updatePost } from "@/services/postService";
import { PostFormData } from "@/types";
import { useAuth } from "@/context/AuthContext";
import ErrorAlert from "@/components/errorAlert";
import toast, { Toaster } from "react-hot-toast";

export default function EditPostPage() {
  const [formData, setFormData] = useState<PostFormData>({
    title: "",
    body: "",
  });
  const router = useRouter();
  const params = useParams();
  const id = params.id as string;
  const { user } = useAuth();

  const {
    data: post,
    isLoading: isQueryLoading,
    error: queryError,
  } = useApiQuery(() => getPostById(id), [id]);

  useEffect(() => {
    if (post) {
      setFormData({
        title: post.post?.title || "",
        body: post.post?.body || "",
      });
    }
  }, [post]);

  const {
    mutate: updatePostMutate,
    isLoading: isMutationLoading,
    error: mutationError,
    setError,
  } = useApiMutation(
    (updatedData: PostFormData) => updatePost(id, updatedData),
    {
      onSuccess: () => {
        toast("Post updated successfully.");
        setTimeout(() => {
          router.push(`/posts`);
        }, 1000);
      },
      onError: (err) => {
        console.error(err.message);
      },
    }
  );

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (mutationError) setError(null);
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    await updatePostMutate(formData);
  };

  useEffect(() => {
    if (!user) {
      router.push("/sign-in");
    }
  }, [user, router]);

  if (isQueryLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <span className="loading loading-spinner loading-lg"></span>
      </div>
    );
  }

  if (!user) {
    return null;
  }


  return (
    <div className="card bg-base-100 shadow-sm">
      <Toaster />
      {queryError && <ErrorAlert error={queryError} />}
      {mutationError && <ErrorAlert error={mutationError} />}

      <div className="card-body">
        <h2 className="card-title">Edit Post</h2>
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
              disabled={isMutationLoading}
              required
            />

            <legend className="fieldset-legend">Body</legend>
            <textarea
              className="textarea h-24"
              placeholder="Type here"
              name="body"
              value={formData.body}
              onChange={handleChange}
              disabled={isMutationLoading}
              required
            ></textarea>
          </fieldset>
          <div className="card-actions mt-4 ">
            <button className="btn btn-primary" disabled={isMutationLoading}>
              {isMutationLoading && (
                <span className="loading loading-spinner"></span>
              )}
              Update Post
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
