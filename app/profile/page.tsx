"use client";

import { useAuth } from "../../Contexts/AuthContext";

function ProfilePage() {
  const { currentUser } = useAuth() as AuthContextType;

  return <div>{currentUser.displayName}</div>;
}

export default ProfilePage;
