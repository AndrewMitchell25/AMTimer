"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "../../Contexts/AuthContext";
import Link from "next/link";
import { motion } from "framer-motion";
import { AiFillGoogleCircle } from "react-icons/ai";

function SignUpPage() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    passwordConfirm: "",
    displayName: "",
  });
  const { signUp, updateUserDisplayName, signInWithGoogle } =
    useAuth() as AuthContextType;
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    if (formData.password !== formData.passwordConfirm) {
      return setError("Passwords do not match");
    }

    try {
      setError("");
      setLoading(true);
      await signUp(formData.email, formData.password, formData.displayName);
      router.push("/");
    } catch {
      setError("Failed to create an account");
    }
    setLoading(false);
  }

  return (
    <div className="flex items-center flex-col">
      <h2 className="mt-10 text-2xl font-semibold">Sign Up</h2>
      {error && <p>{error}</p>}
      <form onSubmit={handleSubmit} className="flex flex-col mt-8">
        <label htmlFor="email">Email</label>
        <input
          type="email"
          value={formData.email}
          onChange={(e) =>
            setFormData({
              email: e.target.value,
              password: formData.password,
              passwordConfirm: formData.passwordConfirm,
              displayName: formData.displayName,
            })
          }
          required
          placeholder="Email"
        />
        <label htmlFor="password">Password</label>
        <input
          type="password"
          value={formData.password}
          onChange={(e) =>
            setFormData({
              email: formData.email,
              password: e.target.value,
              passwordConfirm: formData.passwordConfirm,
              displayName: formData.displayName,
            })
          }
          required
          placeholder="Password"
        />
        <label htmlFor="password-confirm">Password Confirmation</label>
        <input
          type="password"
          value={formData.passwordConfirm}
          onChange={(e) =>
            setFormData({
              email: formData.email,
              password: formData.password,
              passwordConfirm: e.target.value,
              displayName: formData.displayName,
            })
          }
          required
          placeholder="Password Confirmation"
        />
        <label>User Name</label>
        <input
          type=""
          value={formData.displayName}
          onChange={(e) =>
            setFormData({
              email: formData.email,
              password: formData.password,
              passwordConfirm: formData.passwordConfirm,
              displayName: e.target.value,
            })
          }
          required
          placeholder="User Name"
        />
        <motion.button
          whileTap={{ scale: 0.9 }}
          disabled={loading}
          type="submit"
        >
          Sign Up
        </motion.button>
      </form>
      <div className="flex flex-col items-center">
        <p className="text-gray-500 text-sm">or you can sign up with</p>
        <motion.button
          onClick={signInWithGoogle}
          whileTap={{ scale: 0.9 }}
          className=""
        >
          <AiFillGoogleCircle className="hover:text-red-700 w-5 h-5" />
        </motion.button>
      </div>
      <div>
        Already have an acoount?
        <Link href="/signin" className="text-blue-400">
          {" "}
          Sign In
        </Link>
      </div>
    </div>
  );
}

export default SignUpPage;
