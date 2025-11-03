"use client";

import ErrorAlert from "@/components/errorAlert";
import FormRegister from "@/components/formRegister";
import { useAuth } from "@/context/AuthContext";
import { RegisterData } from "@/types";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { FormEvent, useEffect, useState } from "react";

export default function SignUpPage() {
  const [credentials, setCredentials] = useState<RegisterData>({
    name: "",
    email: "",
    password: "",
    password_confirmation: "",
  });
  const router = useRouter();
  const { register, isLoading, error, setError, user } = useAuth();

  useEffect(() => {
    if (user) {
      router.push("/");
    }
  }, [user, router]);

  useEffect(() => {
    if (
      credentials.name ||
      credentials.email ||
      credentials.password ||
      credentials.password_confirmation
    ) {
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
      await register(credentials);
    } catch (err) {}
  };

  if (user) return null;

  return (
    <>
      <div className="hero bg-base-200 min-h-screen">
        <div className="hero-content flex-col lg:flex-row-reverse">
          <div className="text-center lg:text-left">
            <h1 className="text-5xl font-bold">Register now!</h1>
            <p className="py-6">
              Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda
              excepturi exercitationem quasi. In deleniti eaque aut repudiandae
              et a id nisi.
            </p>
          </div>
          <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
            <div className="card-body">
              <fieldset className="fieldset">
                {error && <ErrorAlert error={error} />}

                <FormRegister
                  credentials={credentials}
                  handleChange={handleChange}
                  handleSubmit={handleSubmit}
                  isLoading={isLoading}
                />
              </fieldset>
              <fieldset>
                <legend className="fieldset-legend">
                  already have an account?
                  <Link href="/sign-in" className="btn-link ">
                    Sign In
                  </Link>
                </legend>
              </fieldset>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
