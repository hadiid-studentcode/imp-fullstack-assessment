import { apiClient } from "@/lib/apiClient";
import { PaginatedResponse, Post, PostFormData } from "@/types";

export const getPosts = (
  page: number = 1
): Promise<PaginatedResponse<Post>> => {
  return apiClient.get<PaginatedResponse<Post>>(`/posts?page=${page}`);
};

export const getPostById = (id: number | string): Promise<Post> => {
  return apiClient.get<Post>(`/posts/${id}`);
};

export const createPost = (data: PostFormData): Promise<Post> => {
  return apiClient.post<Post>("/posts", data);
};
export const updatePost = (
  id: number | string,
  data: PostFormData
): Promise<Post> => {
  return apiClient.put<Post>(`/posts/${id}`, data);
};

export const deletePost = (id: number | string): Promise<void> => {
 
  return apiClient.delete<void>(`/posts/${id}`);
};