// app/login/page.tsx
"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";
import Image from "next/image";
import Link from "next/link";
import { ImSpinner8 } from "react-icons/im";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [checkingAuth, setCheckingAuth] = useState(true); // NEW
  const router = useRouter();

  useEffect(() => {
    const checkUser = async () => {
      const { data } = await supabase.auth.getUser();
      if (data.user) {
        router.replace("/chats");
      } else {
        setCheckingAuth(false); // Only show form if not logged in
      }
    };
    checkUser();
  }, [router]);

  const handleLogin = async () => {
    setLoading(true); // Start loading
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    setLoading(false); // Stop loading
    if (!error) router.push("/chats");
    else alert("Invalid credentials");
  };

  if (checkingAuth) {
    // Optionally, show a spinner here
    // Add spinner or loading state if needed
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="loader">
          <ImSpinner8 className="animate-spin text-2xl text-green-500" />
        </div>
      </div>
    );
  }

  return (
    <main className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="w-full max-w-sm bg-white rounded-lg shadow-md p-8 border border-gray-200">
        <Image
          src="/logo.png"
          alt="Periskope Logo"
          width={100}
          height={100}
          className="rounded-full mx-auto mb-4"
        />
        <h1 className="text-2xl font-semibold text-gray-800 mb-6 text-center">
          Login to Periskope
        </h1>

        <div className="space-y-4">
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded text-sm focus:outline-none focus:ring-2 focus:ring-green-500"
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded text-sm focus:outline-none focus:ring-2 focus:ring-green-500"
          />

          <button
            onClick={handleLogin}
            className="w-full py-2 bg-green-500 text-white rounded hover:bg-green-600 transition disabled:opacity-60"
            disabled={loading}
          >
            {loading ? "Logging in..." : "Log In"}
          </button>
          <div className="text-center mt-4">
            <span className="text-gray-500 text-sm">
              Don't have an account?{" "}
              <Link href="/register" className="text-green-600 hover:underline">
                Register
              </Link>
            </span>
          </div>
        </div>
      </div>
    </main>
  );
}
