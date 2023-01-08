"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { useAuth } from "../../Contexts/AuthContext";
import Link from "next/link";

function SignInPage() {
  const [formData, setFormData] = useState(["", ""]);
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
      await signIn(formData[0], formData[1]);
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
          value={formData[0]}
          onChange={(e) => setFormData([e.target.value, formData[1]])}
          required
          placeholder="Email"
        />
        <label htmlFor="password">Password</label>
        <input
          type="password"
          value={formData[1]}
          onChange={(e) => setFormData([formData[0], e.target.value])}
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
