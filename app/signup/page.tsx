"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "../../Contexts/AuthContext";
import Link from "next/link";
import { motion } from "framer-motion";
import { AiFillGoogleCircle } from "react-icons/ai";
import {
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
} from "firebase/auth";
import { auth, db } from "../../Firebase/firebase";
import {
  addDoc,
  collection,
  doc,
  getDoc,
  serverTimestamp,
  setDoc,
} from "firebase/firestore";

function SignUpPage() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    passwordConfirm: "",
    displayName: "",
  });
  const { currentUser } = useAuth() as AuthContextType;
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
      //Actual signup function
      await createUserWithEmailAndPassword(
        auth,
        formData.email,
        formData.password
      ).then(async (user) =>
        //Add the user to the database
        {
          try {
            //Check to see if userDoc already exists and don't overwrite it
            const oldDocRef = await getDoc(
              doc(db, "users", `${user.user.uid}`)
            );
            if (!oldDocRef.exists()) {
              const docRef = await setDoc(
                doc(db, "users", `${user.user.uid}`),
                {
                  totalSolves: 0,
                  dateCreated: user.user.metadata.creationTime,
                  displayName: formData.displayName,
                  pbs: {
                    single: "",
                    ao5: "",
                    ao12: "",
                    ao50: "",
                    ao100: "",
                  },
                }
              );
            }
          } catch (e) {
            console.log(e);
          }
        }
      );

      setLoading(false);
      router.push("/");
    } catch {
      setError("Failed to create an account");
    }
    setLoading(false);
  }

  async function signInWithGoogle() {
    setError("");
    setLoading(true);
    const provider = new GoogleAuthProvider();
    await signInWithPopup(auth, provider).then(async (result) => {
      try {
        //Check to see if userDoc already exists and don't overwrite it
        const oldDocRef = await getDoc(doc(db, "users", `${result.user.uid}`));
        if (!oldDocRef.exists()) {
          const docRef = await setDoc(doc(db, "users", `${result.user.uid}`), {
            totalSolves: 0,
            dateCreated: result.user.metadata.creationTime,
            displayName: result.user.displayName,
            pbs: {
              single: "",
              ao5: "",
              ao12: "",
              ao50: "",
              ao100: "",
            },
          });
        }
        setLoading(false);
        router.push("/");
      } catch {
        setError("Failed to create an account");
      }
    });
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
