/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import { useAuth } from "@/context/AuthContext";
import Link from "next/link";
import { useEffect } from "react";

export default function Home() {
  const { user, logout } = useAuth();



  const handleLogout = async () => {
    try {
      await logout();
    } catch (err) {}
  };

  return (
    <>
      <div
        className="hero min-h-screen"
        style={{
          backgroundImage:
            "url(https://img.daisyui.com/images/stock/photo-1507358522600-9f71e620c44e.webp)",
        }}
      >
        <div className="hero-overlay"></div>
        <div className="hero-content text-neutral-content text-center">
          <div className="max-w-md">
            <h1 className="mb-5 text-5xl font-bold">
              Hello {user ? user.name : "Guest"}
            </h1>
            <p className="mb-5">
              Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda
              excepturi exercitationem quasi. In deleniti eaque aut repudiandae
              et a id nisi.
            </p>
            {user ? (
              <>
                <Link href="/posts" className="btn btn-primary mr-2">
                  View Posts
                </Link>

                <button onClick={handleLogout} className="btn btn-primary">
                  Logout
                </button>
              </>
            ) : (
              <Link href="/sign-in" className="btn btn-primary mr-2">
                Sign In
              </Link>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
