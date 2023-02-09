"use client";

import {
  onAuthStateChanged,
  sendPasswordResetEmail,
  updateEmail,
  updatePassword,
  User,
  updateProfile,
} from "firebase/auth";
import { addDoc, collection, doc, getDoc } from "firebase/firestore";
import React, { createContext, useContext, useEffect, useState } from "react";
import { auth, db } from "../Firebase/firebase";

interface Props {
  children: React.ReactNode;
}

const AuthContext = createContext<AuthContextType | null>(null);

const AuthProvider: React.FC<Props> = ({ children }) => {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [currentUserData, setCurrentUserData] = useState<UserData | null>(null);

  function resetPassword(email: string) {
    return sendPasswordResetEmail(auth, email);
  }

  function updateUserEmail(email: string) {
    if (currentUser) {
      return updateEmail(currentUser, email);
    }
  }

  function updateUserPassword(password: string) {
    if (currentUser) {
      return updatePassword(currentUser, password);
    }
  }

  function updateUserDisplayName(newDisplayName: string) {
    if (currentUser) {
      return updateProfile(currentUser, { displayName: newDisplayName });
    }
  }

  useEffect(() => {
    onAuthStateChanged(auth, async (user) => {
      setCurrentUser(user);
      //TODO: FIX THIS
      if (user) {
        const dataSnap = await getDoc(doc(db, "users", `${user.uid}`));
        if (dataSnap.exists()) {
          const data = dataSnap.data();
          setCurrentUserData({
            dateCreated: data.dateCreated,
            displayName: data.displayName,
            pbs: data.pbs,
            totalSolves: data.totalSolves,
          });
        }
      }

      if (loading) {
        setLoading(false);
      }
    });
  }, []);

  const value = {
    currentUser,
    currentUserData,
    resetPassword,
    updateUserEmail,
    updateUserPassword,
    updateUserDisplayName,
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
};

export function useAuth() {
  return useContext(AuthContext);
}

export default AuthProvider;
