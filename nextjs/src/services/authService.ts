import { apiClient, tokenManager } from "@/lib/apiClient";
import { AuthResponse, LoginCredentials, RegisterData, User } from "@/types";

export const login = (credentials: LoginCredentials): Promise<AuthResponse> => {
  return apiClient.post<AuthResponse>("/sign-in", credentials);
};

export const register = (userData: RegisterData): Promise<AuthResponse> => {
  return apiClient.post<AuthResponse>("/sign-up", userData);
};

export const logout = async (): Promise<void> => {
  try {
    await apiClient.post("/sign-out", {});
  } catch (error) {
    console.warn(
      "Server logout error, forcing client logout:",
      (error as Error).message
    );
  } finally {
    tokenManager.clearToken();
  }
};

export const getLocalUser = (): User | null => {
  return tokenManager.getUser();
};
