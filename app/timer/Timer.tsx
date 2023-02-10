"use client";
import { useEffect, useRef, useState } from "react";
import Time from "./Time";
import { timerDelay, formatTime } from "../../constants/formatTime";
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
import clickOutside from "../../constants/clickOutside";
import drawScramble from "../../constants/drawScramble";
import addSession from "../../constants/addSession";
import deleteSession from "../../constants/deleteSession";
import Graph from "../Graph";
import getSessions from "../../constants/getSessions";

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
  const [cube, setCube] = useState<Cube>(new Cube());
  const [sessionStats, setSessionStats] = useState<sessionStats>({
    timestamp: "",
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
  });
  const sessionListRef = useRef(null);

  clickOutside([sessionListRef], () => setSessionOpen(false));

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
          addSession(date, currentUser);
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
  getSessions(
    currentUser,
    sessionNames,
    setSessionNames,
    setSessionName,
    setSessionTimes
  );

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
            setSessionStats({
              timestamp: "",
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
            } as sessionStats);
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
        let minTime: time = {
          id: "",
          time: "99999999",
          timestamp: "",
          scramble: "",
          ao5: "",
          ao12: "",
          ao50: "",
          ao100: "",
          plus2: false,
          dnf: false,
        };
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
          if (newTime.time < minTime.time) {
            minTime = newTime;
          }
        });
        setSessionTimes(t);
        //TODO: update sessionStats in database not just state
        setSessionStats({ ...sessionStats, single: minTime });
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
      /*
      //Check to see if it's session PB and update
      const sessionRef = doc(
        db,
        `users/${currentUser.uid}/sessions/${sessionName}`
      );
      const sessionSnap = await getDoc(sessionRef);
      if (
        sessionSnap.exists() &&
        (time < sessionSnap.data().single.time ||
          sessionSnap.data().single.time === "")
      ) {
        await updateDoc(sessionRef, {
          single: {
            id: docRef.id,
            time: time,
            timestamp: sT,
            scramble: scramble,
            plus2: false,
            dnf: false,
          },
        });
      }

      */
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

  //Generate a new scramble and set the state
  function getScramble() {
    setScramble(() => generateScramble());
  }

  drawScramble(scramble, cube, setCube);

  return (
    <div className="grid grid-cols-4 grid-rows-4 w-full h-[80vh]">
      <div className=" row-span-4 col-span-2 md:col-span-1 bg-slate-400 p-3 text-center">
        <div className="flex flex-col justify-center relative h-auto w-full">
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
                  ref={sessionListRef}
                >
                  <motion.button
                    onClick={(e) => {
                      e.stopPropagation();
                      if (inputSessionName.length > 0) {
                        addSession(inputSessionName, currentUser);
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
                        className="hover:bg-slate-200 p-1 w-auto"
                      >
                        {session}
                      </motion.div>
                      <HiX
                        onClick={(e) => {
                          e.stopPropagation();
                          deleteSession(
                            session,
                            currentUser,
                            sessionName,
                            setSessionName,
                            setSessionTimes
                          );
                        }}
                        className="flex hover:bg-slate-100 cursor-pointer rounded-md p-1 text-lg"
                      />
                    </motion.div>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
          <h2>Stats: {sessionStats && sessionStats.single.time}</h2>
          <div className="flex h-52">
            <Graph times={sessionTimes} />
          </div>
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
