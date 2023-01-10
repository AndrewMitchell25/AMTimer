"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { useAuth } from "../../Contexts/AuthContext";
import { AiFillGoogleCircle } from "react-icons/ai";
import Link from "next/link";
import { motion } from "framer-motion";

function SignInPage() {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const { signIn, signInWithGoogle } = useAuth() as AuthContextType;
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    try {
      setError("");
      setLoading(true);
      await signIn(formData.email, formData.password);
      router.push("/");
    } catch {
      setError("Failed to sign in");
    }
    setLoading(false);
  }

  return (
    <div className="flex items-center flex-col">
      <h2 className="mt-10 text-2xl font-semibold">Sign In</h2>
      {error && <p>{error}</p>}
      <form onSubmit={handleSubmit} className="flex flex-col mt-8">
        <label htmlFor="email">Email</label>
        <input
          type="email"
          value={formData.email}
          onChange={(e) =>
            setFormData({ email: e.target.value, password: formData.password })
          }
          required
          placeholder="Email"
        />
        <label htmlFor="password">Password</label>
        <input
          type="password"
          value={formData.password}
          onChange={(e) =>
            setFormData({ email: formData.email, password: e.target.value })
          }
          required
          placeholder="Password"
        />
        <motion.button
          whileTap={{ scale: 0.9 }}
          disabled={loading}
          type="submit"
        >
          Login
        </motion.button>
      </form>
      <div className="flex flex-col items-center">
        <p className="text-gray-500 text-sm">or you can sign in with</p>
        <motion.button
          onClick={() => {
            signInWithGoogle;
            router.push("/");
          }}
          whileTap={{ scale: 0.9 }}
          className=""
        >
          <AiFillGoogleCircle className="hover:text-red-700 w-5 h-5" />
        </motion.button>
      </div>
      {/*
      <div>
        <Link href="/forgot-password">Forgot Password?</Link>
      </div>
       */}
      <div>
        Need an account?
        <Link href="/signup" className="text-blue-400">
          {" "}
          Sign up
        </Link>
      </div>
    </div>
  );
}

export default SignInPage;
