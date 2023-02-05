import { User } from "firebase/auth";
import { collection, deleteDoc, doc, getDocs } from "firebase/firestore";
import { Dispatch, SetStateAction } from "react";
import { db } from "../Firebase/firebase";

async function deleteSession(
  session: string,
  currentUser: User,
  sessionName: string,
  setSessionName: Dispatch<SetStateAction<string>>,
  setSessionTimes: Dispatch<SetStateAction<time[]>>
) {
  try {
    //Path to current session's times
    const querySnapshot = await getDocs(
      collection(
        db,
        "users",
        `${currentUser.uid}`,
        "sessions",
        `${session}`,
        "times"
      )
    );
    //Delete every time in the session
    querySnapshot.forEach(async (doc) => {
      await deleteDoc(doc.ref);
    });
    //Delete the session document
    await deleteDoc(doc(db, `users/${currentUser.uid}/sessions`, session));
    if (sessionName == session) {
      setSessionName("Select a Session");
      setSessionTimes([]);
    }
  } catch {
    console.error();
  }
}

export default deleteSession;
