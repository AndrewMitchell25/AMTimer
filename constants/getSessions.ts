import { User } from "firebase/auth";
import { collection, onSnapshot, query } from "firebase/firestore";
import { Dispatch, SetStateAction, useEffect } from "react";
import { db } from "../Firebase/firebase";

function getSessions(
  currentUser: User,
  sessionNames: string[],
  setSessionNames: Dispatch<SetStateAction<string[]>>,
  setSessionName: Dispatch<SetStateAction<string>>,
  setSessionTimes: Dispatch<SetStateAction<time[]>>
) {
  useEffect(() => {
    if (currentUser) {
      const q = query(collection(db, `users/${currentUser.uid}/sessions`));

      const unsubscribe = onSnapshot(q, (querySnapshot) => {
        let s: string[] = [];
        querySnapshot.forEach((doc) => {
          s.push(doc.id);
        });
        setSessionNames([...sessionNames, ...s]);
      });

      return unsubscribe;
    } else {
      setSessionNames([]);
      setSessionName("Select a Session");
      setSessionTimes([]);
    }
  }, [currentUser]);
}

export default getSessions;
