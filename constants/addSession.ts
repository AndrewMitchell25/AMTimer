import { User } from "firebase/auth";
import { doc, getDoc, serverTimestamp, setDoc } from "firebase/firestore";
import { useAuth } from "../Contexts/AuthContext";
import { db } from "../Firebase/firebase";

async function addSession(session: string, currentUser: User) {
  if (session.length < 2) {
    //TODO: Create error
    return;
  }
  try {
    //Create blank session document in firestore
    const oldSession = await getDoc(
      doc(db, `users/${currentUser.uid}/sessions`, `${session}`)
    );
    if (oldSession.exists()) {
      //TODO: Create error
      console.log("Session already exists");
      return;
    }

    const docRef = await setDoc(
      doc(db, `users/${currentUser.uid}/sessions`, `${session}`),
      {
        timestamp: serverTimestamp(),
        single: {
          id: "",
          time: "",
          timestamp: "",
          scramble: "",
          plus2: false,
          dnf: false,
        },
        ao5: [],
        ao12: [],
        ao50: [],
        ao100: [],
        cube: "",
      }
    );
  } catch {
    console.error();
  }
}

export default addSession;
