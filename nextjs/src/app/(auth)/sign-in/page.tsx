/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import { useState, useEffect, FormEvent } from "react";
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { LoginCredentials } from "@/types";
import FormLogin from "@/components/formLogin";
import ErrorAlert from "@/components/errorAlert";

export default function SignInPage() {
  const [credentials, setCredentials] = useState<LoginCredentials>({
    email: "",
    password: "",
  });
  const router = useRouter();

  const { login, isLoading, error, setError, user } = useAuth();

  useEffect(() => {
    if (user) {
      router.push("/");
    }
  }, [user, router]);

  useEffect(() => {
    if (credentials.email || credentials.password) {
      setError(null);
    }
  }, [credentials, setError]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setCredentials((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      await login(credentials);
    } catch (err) {
     
    }
  };

  if (user) return null;

  return (
    <>
      <div className="hero bg-base-200 min-h-screen">
        <div className="hero-content text-center">
          <div className="max-w-md">
            <fieldset className="fieldset bg-base-200 border-base-300 rounded-box w-xs border p-4">
              <legend className="fieldset-legend">Login</legend>

              {error && <ErrorAlert error={error} />}

              <FormLogin
                credentials={credentials}
                handleChange={handleChange}
                handleSubmit={handleSubmit}
                isLoading={isLoading}
              />
            </fieldset>
            <fieldset>
              <legend className="fieldset-legend">
                Dont have an account yet?
                <Link href="/sign-up" className="btn-link ">
                  Sign Up
                </Link>
              </legend>
            </fieldset>
          </div>
        </div>
      </div>
    </>
  );
}
