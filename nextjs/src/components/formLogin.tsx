import { LoginCredentials } from "@/types";
import { FormEvent } from "react";

export default function FormLogin({
  credentials,
  handleChange,
  handleSubmit,
  isLoading,
}: {
  credentials: LoginCredentials;
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleSubmit: (e: FormEvent<HTMLFormElement>) => void;
  isLoading: boolean;
}) {
  return (
    <>
      <form onSubmit={handleSubmit}>
        <label className="label mb-4">Email</label>
        <input
          type="email"
          className="input"
          placeholder="Email"
          name="email"
          value={credentials.email}
          onChange={handleChange}
          required
          disabled={isLoading}
        />

        <label className="label mb-4 mt-4">Password</label>
        <input
          type="password"
          className="input"
          placeholder="Password"
          name="password"
          value={credentials.password}
          onChange={handleChange}
          required
          disabled={isLoading}
        />

        <button className="btn btn-neutral mt-4" disabled={isLoading}>
          {isLoading && (
            <span className="loading loading-dots loading-xl"></span>
          )}
          Login
        </button>
      </form>
    </>
  );
}
