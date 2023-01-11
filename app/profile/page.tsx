"use client";

import { useAuth } from "../../Contexts/AuthContext";

function ProfilePage() {
  const { currentUser } = useAuth() as AuthContextType;

  return (
    <div>
      {currentUser.displayName}
      {currentUser.metadata.creationTime}
    </div>
  );
}

export default ProfilePage;
