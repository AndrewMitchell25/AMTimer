"use client";
import { useEffect, useState } from "react";
import Time from "./Time";
import { timerDelay, formatTime } from "../../constants";
import { useAuth } from "../../Contexts/AuthContext";
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  increment,
  onSnapshot,
  orderBy,
  query,
  serverTimestamp,
  setDoc,
  updateDoc,
} from "firebase/firestore";
import { db } from "../../Firebase/firebase";
import { AnimatePresence, motion } from "framer-motion";
import Times from "./Times";
import { HiX } from "react-icons/hi";
import Scramble from "./Scramble";
import generateScramble from "../../scramble/generateScramble";
import Cube from "../../scramble/cube";

function Timer() {
  const [time, setTime] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const [keyPressed, setKeyPressed] = useState<KeyboardEvent | null>(null);
  const [releaseTimer, setReleaseTimer] = useState(false);
  const [timeStyle, setTimeStyle] = useState("");
  const [downTime, setDownTime] = useState(0);
  const [downTimeIsRunning, setDownTimeIsRunning] = useState(false);
  const { currentUser } = useAuth() as AuthContextType;
  const [sessionName, setSessionName] = useState("Select a Session");
  const [sessionOpen, setSessionOpen] = useState(false);
  const [sessionNames, setSessionNames] = useState<string[]>([]);
  const [inputSessionName, setInputSessionName] = useState("");
  const [sessionTimes, setSessionTimes] = useState<time[]>([]);
  const [scramble, setScramble] = useState("");
  const [cube, setCube] = useState(new Cube());
  const [sessionStats, setSessionStats] = useState<sessionStats>(
    {} as sessionStats
  );

  //Add event listeners for key events
  useEffect(() => {
    document.addEventListener("keydown", handleKeyDown);
    document.addEventListener("keyup", handleKeyUp);
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.removeEventListener("keyup", handleKeyUp);
    };
  }, []);

  //Get an initial scramble on page load
  useEffect(() => {
    getScramble();
  }, []);

  //Start and stop the timer when the spacebar is released
  useEffect(() => {
    //Check to see if the key pressed is the spacebar
    const isSpaceBar = keyPressed?.key === " ";

    //If red timer is still on, reset
    if (downTimeIsRunning && isSpaceBar) {
      setDownTimeIsRunning(false);
      //If no timer is on, start the red timer
    } else if (!downTimeIsRunning && isSpaceBar) {
      setDownTime(0);
      setDownTimeIsRunning(true);
    }
    //If spacebar and green timer is on
    if (isRunning && isSpaceBar) {
      //Stop the timer
      setIsRunning(false);
      //Add time to database and get a new scramble
      if (currentUser) {
        addTime(formatTime(time), scramble);
        getScramble();
      }
    } else if (!isRunning && isSpaceBar && releaseTimer) {
      //Start the timer
      setTime(0);
      //If no session is chosen, create a new one with the current date
      if (sessionName == "Select a Session") {
        if (currentUser) {
          let d = new Date();
          let date = d.toISOString().substring(0, 10);
          addSession(date);
          setSessionName(date);
        }
      }
      //Reset color and set state
      setDownTime(0);
      setTimeStyle("");
      setIsRunning(true);
    }
  }, [keyPressed]);

  //Actual clock, updating every millisecond
  useEffect(() => {
    let interval: NodeJS.Timer;
    if (isRunning) {
      interval = setInterval(() => {
        setTime((prevTime) => prevTime + 10);
      }, 10);
    }
    return () => clearInterval(interval);
  }, [isRunning]);

  //Clock to count how long red time has been running
  useEffect(() => {
    let interval: NodeJS.Timer;
    if (downTimeIsRunning) {
      interval = setInterval(() => {
        setDownTime((prevTime) => prevTime + 10);
      }, 10);
    }
    return () => clearInterval(interval);
  }, [downTimeIsRunning]);

  //Continuously check how long the space button has been pressed and assign color
  useEffect(() => {
    if (downTime >= timerDelay) {
      setTimeStyle("text-green-600");
      setTime(0);
      setReleaseTimer(true);
      //TODO: Clear UI?
    } else if (downTime > 50) {
      setTimeStyle("text-red-600");
    }
  }, [downTime]);

  //Keydown function
  const handleKeyDown = (e: KeyboardEvent) => {
    //Return if the key is held down or not the space bar
    if (e.key !== " " || e.repeat) {
      return;
    }

    setKeyPressed(e);
    setReleaseTimer(false);
  };

  //Keyup function
  const handleKeyUp = (e: KeyboardEvent) => {
    //Return if the key is not the space bar
    if (e.key != " ") {
      return;
    }

    setKeyPressed(e);
    setDownTime(0);
    setTimeStyle("");
  };

  //Add snapshot listener for session names for the current user and add them to state, calls when user changes
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
      //If the user logs out reset the state to default
    } else {
      setSessionNames([]);
      setSessionName("Select a Session");
      setSessionTimes([]);
    }
  }, [currentUser]);

  //Add snapshot listener to get session stats and set the state
  useEffect(() => {
    if (currentUser) {
      const unsubscribe = onSnapshot(
        doc(db, `users/${currentUser.uid}/sessions`, sessionName),
        (doc) => {
          if (doc.exists()) {
            setSessionStats({
              timestamp: doc.data().timestamp,
              single: doc.data().single,
              ao5: doc.data().ao5,
              ao12: doc.data().ao12,
              ao50: doc.data().ao50,
              ao100: doc.data().ao100,
              cube: doc.data().cube,
            });
          } else {
            setSessionStats({} as sessionStats);
          }
        }
      );
    }
  }, [sessionName]);

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

  async function addTime(time: string, scramble: string) {
    let sT = serverTimestamp();
    try {
      //Add time document to firestore
      const docRef = await addDoc(
        collection(
          db,
          "users",
          `${currentUser.uid}`,
          "sessions",
          `${sessionName}`,
          "times"
        ),
        {
          time: time,
          timestamp: sT,
          scramble: scramble,
          ao5: "",
          ao12: "",
          ao50: "",
          ao100: "",
          plus2: false,
          dnf: false,
        }
      );

      //Check to see if it's session PB and update
      const sessionRef = doc(
        db,
        `users/${currentUser.uid}/sessions/${sessionName}`
      );
      const sessionSnap = await getDoc(sessionRef);
      if (
        sessionSnap.exists() &&
        (time < sessionSnap.data().single || sessionSnap.data().single === "")
      ) {
        await updateDoc(sessionRef, {
          single: time,
        });
      }
      //Increment all time app solves
      const dataRef = updateDoc(doc(db, "appData/data"), {
        totalSolves: increment(1),
      });

      const userRef = updateDoc(doc(db, `users/${currentUser.uid}`), {
        totalSolves: increment(1),
      });
    } catch {
      console.error();
    }

    //Caclulate averages from previous times
    //increment stats including users all time solve count, solves with cube from session name,
  }

  async function addSession(session: string) {
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
          single: "",
          ao5: "",
          ao12: "",
          ao50: "",
          ao100: "",
          cube: "",
        }
      );
    } catch {
      console.error();
    }
  }

  async function deleteSession(session: string) {
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

  //Generate a new scramble and set the state
  function getScramble() {
    setScramble(() => generateScramble());
  }

  //Draw the scramble in the console
  //TODO: Draw to 2D or 3D cube representation
  useEffect(() => {
    console.log(scramble);
    setCube(new Cube());
    cube.move(scramble);
    console.log(cube.display());
  }, [scramble]);

  return (
    <div className="grid grid-cols-4 grid-rows-4 w-full h-[80vh]">
      <div className=" row-span-4 col-span-2 md:col-span-1 bg-slate-400 p-3 text-center">
        <div className="flex justify-center relative h-auto w-full">
          <h2 className="flex p-1">Session: </h2>
          <motion.div
            whileTap={{ scale: 0.9 }}
            onClick={() => setSessionOpen(!sessionOpen)}
            className="cursor-pointer p-1 relative select-none h-auto"
          >
            {sessionName}

            <AnimatePresence>
              {sessionOpen && (
                <motion.div
                  className="absolute bg-white w-[200px] flex flex-col items-start p-1 top-7 overflow-auto"
                  onClick={(e) => e.stopPropagation()}
                  onPointerDownCapture={(e) => e.stopPropagation()}
                >
                  <motion.button
                    onClick={(e) => {
                      e.stopPropagation();
                      if (inputSessionName.length > 0) {
                        addSession(inputSessionName);
                        setSessionName(inputSessionName);
                        setInputSessionName("");
                        setSessionOpen(!sessionOpen);
                      }
                    }}
                    whileTap={{ scale: 0.9 }}
                  >
                    New
                  </motion.button>
                  <input
                    className="w-full border rounded-sm p-1"
                    onClick={(e) => e.stopPropagation()}
                    value={inputSessionName}
                    onChange={(e) => setInputSessionName(e.target.value)}
                  ></input>
                  <span className="w-full p-[1px] my-1 bg-slate-200"></span>
                  {sessionNames.map((session) => (
                    <motion.div
                      className="w-full p-1 flex items-center justify-items-start"
                      key={session}
                    >
                      <motion.div
                        onClick={(e) => {
                          e.stopPropagation();
                          setSessionName(session);
                          setSessionOpen(!sessionOpen);
                        }}
                        whileTap={{ scale: 0.9 }}
                        className="hover:bg-slate-100 p-1 w-auto"
                      >
                        {session}
                      </motion.div>
                      <HiX
                        onClick={(e) => {
                          e.stopPropagation();
                          deleteSession(session);
                        }}
                        className="flex hover:bg-slate-100 cursor-pointer rounded-md p-1 text-lg"
                      />
                    </motion.div>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
          <h2>Stats: {sessionStats.single}</h2>
          <h2></h2>
        </div>

        <div>
          <Times sessionTimes={sessionTimes} sessionName={sessionName} />
        </div>
      </div>
      <div className="grid col-span-2 md:col-span-3 text-center">
        <Scramble scramble={scramble} />
      </div>
      <div className="grid col-span-2 md:col-span-3 row-span-3 text-center">
        <Time time={formatTime(time)} style={timeStyle} />
      </div>
    </div>
  );
}

export default Timer;
