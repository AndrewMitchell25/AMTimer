"use client";
import { useEffect, useState } from "react";
import Time from "./Time";
import { timerDelay, formatTime } from "../constants";
import { useAuth } from "../Contexts/AuthContext";
import {
  addDoc,
  collection,
  doc,
  getDoc,
  getDocs,
  orderBy,
  query,
  serverTimestamp,
  setDoc,
} from "firebase/firestore";
import { db } from "../Firebase/firebase";
import { AnimatePresence, motion } from "framer-motion";

function Timer() {
  const [time, setTime] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const [keyPressed, setKeyPressed] = useState<KeyboardEvent | null>(null);
  const [releaseTimer, setReleaseTimer] = useState(false);
  const [timeStyle, setTimeStyle] = useState("");
  const [downTime, setDownTime] = useState(0);
  const [downTimeIsRunning, setDownTimeIsRunning] = useState(false);
  const { currentUser } = useAuth() as AuthContextType;
  const [sessionName, setSessionName] = useState("CHANGE THIS");
  const [sessionOpen, setSessionOpen] = useState(false);
  const [sessionNames, setSessionNames] = useState<string[]>([]);
  const [inputSessionName, setInputSessionName] = useState("");
  const [sessionTimes, setSessionTimes] = useState<number[]>([]);

  useEffect(() => {
    document.addEventListener("keydown", handleKeyDown);
    document.addEventListener("keyup", handleKeyUp);
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.removeEventListener("keyup", handleKeyUp);
    };
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
        addTime(time);
      }
    } else if (!isRunning && isSpaceBar && releaseTimer) {
      //Start the timer
      setTime(0);
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
    const getSessions = async () => {
      if (currentUser) {
        const querySnapshot = await getDocs(
          collection(db, `users/${currentUser.uid}/sessions`)
        );
        let s: string[] = [];
        querySnapshot.forEach((doc) => {
          s.push(doc.id);
        });
        setSessionNames([...sessionNames, ...s]);
      }
    };

    getSessions().catch(console.error);
  }, []);

  useEffect(() => {
    const getTimes = async () => {
      if (currentUser) {
        const querySnapshot = await getDocs(
          query(
            collection(
              db,
              `users/${currentUser.uid}/sessions/${sessionName}/times`
            ),
            orderBy("timestamp", "desc")
          )
        );
        let t: number[] = [];
        querySnapshot.forEach((doc) => {
          t.push(doc.data().time);
        });

        setSessionTimes(t);
      }
    };
    console.log(sessionTimes);
    getTimes().catch(console.error);
  }, [sessionName]);

  async function addTime(time: Number) {
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
          timestamp: serverTimestamp(),
          scramble: "",
        }
      );
      console.log(docRef.id);
    } catch (e) {
      console.log(e);
    }
  }

  async function addSession(session: string) {
    if (session.length < 2) {
      return;
    }
    setSessionNames([...sessionNames, session]);
    try {
      const docRef = await setDoc(
        doc(db, `users/${currentUser.uid}/sessions`, `${session}`),
        {
          timestamp: serverTimestamp(),
        }
      );
      console.log("created");
    } catch (e) {
      console.log(e);
    }
  }

  return (
    <div className="flex w-full">
      <div className="hidden md:flex w-64 self-start flex-col bg-slate-400 p-3 items-center">
        <div>
          <div className="flex justify-center relative w-64">
            <h2 className="flex p-1">Session: </h2>

            <motion.span
              whileTap={{ scale: 0.9 }}
              onClick={() => setSessionOpen(!sessionOpen)}
              className="cursor-pointer p-1 relative select-none"
            >
              {sessionName}

              <AnimatePresence>
                {sessionOpen && (
                  <motion.div className="absolute bg-white w-auto min-w-[100px] flex flex-col items-start p-1 top-7 overflow-auto">
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
                        onClick={(e) => {
                          e.stopPropagation();
                          setSessionName(session);
                          setSessionOpen(!sessionOpen);
                        }}
                        key={session}
                        className="hover:bg-slate-100 w-full p-1"
                      >
                        {session}
                      </motion.div>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.span>
          </div>
        </div>
        <div>
          {sessionTimes.map((time) => (
            <motion.div>{time}</motion.div>
          ))}
        </div>
      </div>
      <div className="flex justify-items-center">
        <Time time={formatTime(time)} style={timeStyle} />
      </div>
    </div>
  );
}

export default Timer;
