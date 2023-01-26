"use client";

import { useAuth } from "../../Contexts/AuthContext";

function ProfilePage() {
  const { currentUser, currentUserData } = useAuth() as AuthContextType;
  if (currentUser && currentUserData) {
    return (
      <div>
        {currentUserData.displayName}
        {currentUserData.dateCreated}
      </div>
    );
  }
}

export default ProfilePage;
