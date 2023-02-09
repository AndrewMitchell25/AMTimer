import { User } from "firebase/auth";
import { collection, onSnapshot, orderBy, query } from "firebase/firestore";
import { Dispatch, SetStateAction, useEffect } from "react";
import { db } from "../Firebase/firebase";

function profileGetTimes(
  currentUser: User,
  sessionName: string,
  setSessionTimes: Dispatch<SetStateAction<time[]>>
) {
  //Set up onSnapshot listener for session times every time the session name changes
  useEffect(() => {
    if (currentUser) {
      //Query the database to get the times in order
      const q = query(
        collection(
          db,
          `users/${currentUser.uid}/sessions/${sessionName}/times`
        ),
        orderBy("timestamp", "desc")
      );
      //onSnapshot iterate through times and add them to state
      const unsubscribe = onSnapshot(q, (querySnapshot) => {
        let t: time[] = [];
        querySnapshot.forEach((doc) => {
          let newTime: time = {
            id: doc.id,
            time: doc.data().time,
            timestamp: doc.data().timestamp,
            scramble: doc.data().scramble,
            ao5: doc.data().ao5,
            ao12: doc.data().ao12,
            ao50: doc.data().ao50,
            ao100: doc.data().ao100,
            plus2: doc.data().plus2,
            dnf: doc.data().dnf,
          };
          t.push(newTime);
        });
        setSessionTimes(t);
      });
      return unsubscribe;
    }
  }, [sessionName]);
}

export default profileGetTimes;
