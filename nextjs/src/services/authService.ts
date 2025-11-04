import { apiClient, tokenManager } from "@/lib/apiClient";
import { AuthResponse, LoginCredentials, RegisterData, User } from "@/types";

// Fungsi Login
export const login = async (credentials: LoginCredentials): Promise<User> => {
  const response = await apiClient.post<AuthResponse>("/sign-in", credentials);

  if (response && response.token && response.user) {
    tokenManager.setToken(response.token);
    tokenManager.setUser(response.user);
    return response.user;
  }

  throw new Error("Login failed");
};

export const register = async (
  userData: RegisterData
): Promise<AuthResponse> => {
  const response = await apiClient.post<AuthResponse>("/sign-up", userData);

  if (response && response.token && response.user) {
    tokenManager.setToken(response.token);
    tokenManager.setUser(response.user);
    return response;
  }

  throw new Error("Login failed");
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
