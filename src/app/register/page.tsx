"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";
import Image from "next/image";
import { createProfile } from "@/api/profile";

export default function RegisterPage() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [fullName, setFullName] = useState("");
  const [loading, setLoading] = useState(false);

  const handleRegister = async () => {
    setLoading(true);

    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          full_name: fullName,
        },
      },
    });

    if (error) {
      alert(error.message);
      setLoading(false);
      return;
    }

    if (data?.user) {
      const { error: profileError } = await createProfile(
        data.user.id,
        fullName,
        email
      );
      if (profileError) {
        alert("Profile creation failed: " + profileError.message);
      }
    } else {
      alert("Signup succeeded but user data is missing.");
      setLoading(false);
      return;
    }

    // ✅ Immediately log the user in after signup
    const { error: loginError } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (loginError) {
      alert("Signup succeeded but login failed: " + loginError.message);
    } else {
      router.push("/chats");
    }

    setLoading(false);
  };

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
          Create Account
        </h1>

        <div className="space-y-4">
          <input
            type="text"
            placeholder="Full Name"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded text-sm focus:outline-none focus:ring-2 focus:ring-green-500"
          />
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
            onClick={handleRegister}
            disabled={loading}
            className="w-full py-2 bg-green-500 text-white rounded hover:bg-green-600 transition"
          >
            {loading ? "Creating..." : "Sign Up"}
          </button>
        </div>

        <p className="text-xs text-center text-gray-500 mt-4">
          Already have an account?{" "}
          <a href="/login" className="text-green-600 hover:underline">
            Login
          </a>
        </p>
      </div>
    </main>
  );
}
