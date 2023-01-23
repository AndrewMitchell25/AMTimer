"use client";
import { useEffect, useState } from "react";
import Time from "./Time";
import { timerDelay, formatTime } from "../constants";
import { useAuth } from "../Contexts/AuthContext";
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  onSnapshot,
  orderBy,
  query,
  serverTimestamp,
  setDoc,
} from "firebase/firestore";
import { db } from "../Firebase/firebase";
import { AnimatePresence, motion } from "framer-motion";
import Times from "./Times";
import { HiX } from "react-icons/hi";
import Scramble from "./Scramble";
import generateScramble from "../scramble/generateScramble";
import Cube from "../scramble/cube";

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
  const [cube, setCube] = useState({});

  useEffect(() => {
    document.addEventListener("keydown", handleKeyDown);
    document.addEventListener("keyup", handleKeyUp);
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.removeEventListener("keyup", handleKeyUp);
    };
  }, []);

  useEffect(() => {
    getScramble();
    setCube(new Cube());
    console.log(cube);
  }, []);

  useEffect(() => {
    const isSpaceBar = keyPressed?.key === " ";

    if (downTimeIsRunning && isSpaceBar) {
      setDownTimeIsRunning(false);
    } else if (!downTimeIsRunning && isSpaceBar) {
      setDownTime(0);
      setDownTimeIsRunning(true);
    }

    if (isRunning && isSpaceBar) {
      //Stop the timer
      setIsRunning(false);
      //Generate new scramble?
      //Add time to database?
      if (currentUser) {
        addTime(formatTime(time), scramble);
        getScramble();
      }
    } else if (!isRunning && isSpaceBar && releaseTimer) {
      //Start the timer
      setTime(0);
      if (sessionName == "Select a Session") {
        if (currentUser) {
          let d = new Date();
          let date = d.toISOString().substring(0, 10);
          addSession(date);
          setSessionName(date);
        }
      }
      setDownTime(0);
      setTimeStyle("");
      setIsRunning(true);
    }
  }, [keyPressed]);

  useEffect(() => {
    let interval: NodeJS.Timer;
    if (isRunning) {
      interval = setInterval(() => {
        setTime((prevTime) => prevTime + 10);
      }, 10);
    }
    return () => clearInterval(interval);
  }, [isRunning]);

  useEffect(() => {
    let interval: NodeJS.Timer;
    if (downTimeIsRunning) {
      interval = setInterval(() => {
        setDownTime((prevTime) => prevTime + 10);
      }, 10);
    }
    return () => clearInterval(interval);
  }, [downTimeIsRunning]);

  //Continuously check how long the space button has been pressed
  useEffect(() => {
    if (downTime >= timerDelay) {
      setTimeStyle("text-green-600");
      setTime(0);
      setReleaseTimer(true);
      //Turn off everything except timer?
    } else if (downTime > 50) {
      setTimeStyle("text-red-600");
    }
  }, [downTime]);

  const handleKeyDown = (e: KeyboardEvent) => {
    if (e.key !== " " || e.repeat) {
      return;
    }

    setKeyPressed(e);
    setReleaseTimer(false);
  };
  const handleKeyUp = (e: KeyboardEvent) => {
    if (e.key != " ") {
      return;
    }

    setKeyPressed(e);
    setDownTime(0);
    setTimeStyle("");
  };

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

  useEffect(() => {
    if (currentUser) {
      const q = query(
        collection(
          db,
          `users/${currentUser.uid}/sessions/${sessionName}/times`
        ),
        orderBy("timestamp", "desc")
      );

      const unsubscribe = onSnapshot(q, (querySnapshot) => {
        let t: time[] = [];
        querySnapshot.forEach((doc) => {
          let newTime: time = {
            id: doc.id,
            time: doc.data().time,
            timestamp: doc.data().timestamp,
            scramble: doc.data().scramble,
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
          //CHANGE THE SCRAMBLE TO SCRAMBLE
          scramble: scramble,
        }
      );
    } catch {
      console.error();
    }
  }

  async function addSession(session: string) {
    if (session.length < 2) {
      return;
    }
    try {
      const docRef = await setDoc(
        doc(db, `users/${currentUser.uid}/sessions`, `${session}`),
        {
          timestamp: serverTimestamp(),
        }
      );
    } catch {
      console.error();
    }
  }

  async function deleteSession(session: string) {
    try {
      //not working
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
      querySnapshot.forEach(async (doc) => {
        await deleteDoc(doc.ref);
      });

      await deleteDoc(doc(db, `users/${currentUser.uid}/sessions`, session));
      if (sessionName == session) {
        setSessionName("Select a Session");
        setSessionTimes([]);
      }
    } catch {
      console.error();
    }
  }

  function getScramble() {
    setScramble(generateScramble());
  }

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
