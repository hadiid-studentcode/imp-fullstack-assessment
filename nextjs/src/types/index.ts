export interface User {
  id: number;
  name: string;
  email: string;
}

export interface AuthResponse {
  user: User;
  token: string;
}

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface RegisterData extends LoginCredentials {
  name: string;
  password_confirmation: string;
}

export interface AuthContextType {
  user: User | null;
  error: string | null;
  isLoading: boolean;
  login: (Credential: LoginCredentials) => Promise<void>;
  register: (data: RegisterData) => Promise<void>;
  logout: () => Promise<void>;
  setError: (error: string | null) => void;
}

export interface Post {
  post: any;
  id: number;
  title: string;
  body: string;
  created_at: Date;
  updated_at: Date;
  user_id: number;
  user?: User;
}

export type PostFormData = Pick<Post, "title" | "body">;

export interface PaginatedResponse<T> {
  data: T[];
  links: {
    first: string;
    last: string;
    prev: string | null;
    next: string | null;
  };
  meta: {
    current_page: number;
    from: number;
    last_page: number;
    path: string;
    per_page: number;
    to: number;
    total: number;
  };
}
