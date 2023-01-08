"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "../../Contexts/AuthContext";
import Link from "next/link";

function SignUpPage() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    passwordConfirm: "",
  });
  const { signUp } = useAuth() as AuthContextType;
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
      await signUp(formData.email, formData.password);
      router.push("/");
    } catch {
      setError("Failed to create an account");
    }
    setLoading(false);
  }

  return (
    <div>
      <h2>Sign Up</h2>
      {error && <p>{error}</p>}
      <form onSubmit={handleSubmit}>
        <label htmlFor="email">Email</label>
        <input
          type="email"
          value={formData.email}
          onChange={(e) =>
            setFormData({
              email: e.target.value,
              password: formData.password,
              passwordConfirm: formData.passwordConfirm,
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
            })
          }
          required
          placeholder="Password Confirmation"
        />
        <button disabled={loading} type="submit">
          Sign Up
        </button>
      </form>
      <div>
        Already have an acoount? <Link href="/signin">Sign In</Link>
      </div>
    </div>
  );
}

export default SignUpPage;
