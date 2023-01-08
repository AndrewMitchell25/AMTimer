"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { useAuth } from "../../Contexts/AuthContext";
import Link from "next/link";

function SignInPage() {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const { signIn, signInWithGoogle, currentUser } =
    useAuth() as AuthContextType;
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
    <div>
      <h2>Sign In</h2>
      {error && <p>{error}</p>}
      <form onSubmit={handleSubmit}>
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
        <button disabled={loading} type="submit">
          Login
        </button>
      </form>
      <div>
        <button onClick={signInWithGoogle}>Sign in with Google</button>
      </div>
      {/*
      <div>
        <Link href="/forgot-password">Forgot Password?</Link>
      </div>
       */}
      <div>
        Need an account?
        <Link href="/signup">Sign up</Link>
      </div>
      <div>{currentUser.displayName}</div>
    </div>
  );
}

export default SignInPage;
