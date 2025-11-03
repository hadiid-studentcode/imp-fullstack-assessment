/* eslint-disable @typescript-eslint/no-explicit-any */
import { URL_BACKEND_API } from "@/config";
import { User } from "@/types";

const tokenManager = {
  getToken: (): string | null => {
    return typeof window !== "undefined"
      ? localStorage.getItem("authToken")
      : null;
  },
  setToken: (token: string): void => {
    if (typeof window !== "undefined") {
      localStorage.setItem("authToken", token);
    }
  },
  clearToken: (): void => {
    if (typeof window !== "undefined") {
      localStorage.removeItem("authToken");
      localStorage.removeItem("authUser");
    }
  },
  setUser: (user: User): void => {
    if (typeof window !== "undefined") {
      localStorage.setItem("authUser", JSON.stringify(user));
    }
  },
  getUser: (): User | null => {
    if (typeof window === "undefined") return null;
    const user = localStorage.getItem("authUser");
    if (!user || user === "undefined") {
      return null;
    }
    try {
      return JSON.parse(user) as User;
    } catch (error) {
      console.error("Error parsing user data:", error);
      return null;
    }
  },
};

const handleResponse = async (response: Response) => {
  if (!response.ok) {
    let errorMessage = `HTTP Error: ${response.status} ${response.text}`;

    try {
      const errorData = await response.json();
      errorMessage = errorData.message || JSON.stringify(errorData.errors);
    } catch (error) {
      console.error("Error parsing response:", error);
    }
    throw new Error(errorMessage);
  }

  if (response.status === 204) {
    return {
      success: true,
    };
  }
  return response.json();
};

interface RequestOptions extends RequestInit {
  data?: unknown;
}

const request = async <T = any>(
  endpoint: string,
  options: RequestOptions = {}
): Promise<T> => {
  const { method = "GET", data, ...customConfig } = options;
  const token = tokenManager.getToken();

  const config: RequestInit = {
    method: method,
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      ...(token && { Authorization: `Bearer ${token}` }),
    },
    ...customConfig,
  };

  if (data) {
    config.body = JSON.stringify(data);
  }

  const response = await fetch(`${URL_BACKEND_API}${endpoint}`, config);
  return handleResponse(response) as Promise<T>;
};

export const apiClient = {
  get: <T = any>(endpoint: string) => request<T>(endpoint, { method: "GET" }),
  post: <T = any>(endpoint: string, data: unknown) =>
    request<T>(endpoint, { method: "POST", data }),
  put: <T = any>(endpoint: string, data: unknown) =>
    request<T>(endpoint, { method: "PUT", data }),
  delete: <T = any>(endpoint: string) =>
    request<T>(endpoint, { method: "DELETE" }),
};

export { tokenManager };
