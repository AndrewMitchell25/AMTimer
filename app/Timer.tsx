"use client";
import { run } from "node:test";
import { useEffect, useRef, useState } from "react";
import Time from "./Time";
import { timerDelay, formatTime } from "../constants";

function Timer() {
  const [time, setTime] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const [keyPressed, setKeyPressed] = useState<KeyboardEvent | null>(null);
  const [releaseTimer, setReleaseTimer] = useState(false);
  const [timeStyle, setTimeStyle] = useState("");

  const timestamp = useRef(0);

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
    if (isRunning && isSpaceBar) {
      //Stop the timer
      setIsRunning(false);
      //Generate new scramble?
      //Add time to database?
    } else if (!isRunning && isSpaceBar && releaseTimer) {
      //Start the timer
      setTime(0);
      setTimeStyle("");
      setIsRunning(true);
      //Turn off everything except timer?
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

  const handleKeyDown = (e: KeyboardEvent) => {
    setKeyPressed(e);
    setReleaseTimer(false);

    if (e.key !== " ") {
      return;
    }

    if (e.repeat && timeStyle === "") {
      setTimeStyle("text-green-500");
      setTime(0);
      return;
    }

    timestamp.current = Date.now();
  };
  const handleKeyUp = (e: KeyboardEvent) => {
    if (e.key != " ") {
      return;
    }

    setTimeStyle("");

    const pressed = timestamp.current;
    const released = Date.now();

    if (released - pressed < timerDelay) {
      return;
    }
    setKeyPressed(e);
    setReleaseTimer(true);
  };

  return (
    <div>
      <Time time={formatTime(time)} style={timeStyle} />
    </div>
  );
}

export default Timer;
