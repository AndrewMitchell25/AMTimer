"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import TimeModal from "./TimeModal";

interface Props {
  sessionTimes: time[];
  sessionName: string;
}

function Times({ sessionTimes, sessionName }: Props) {
  const [timeModal, setTimeModal] = useState<time>({
    id: "",
    time: "",
    timestamp: "",
    scramble: "",
    ao5: "",
    ao12: "",
    ao50: "",
    ao100: "",
    plus2: false,
    dnf: false,
  });
  const [toggleModal, setToggleModal] = useState(false);

  return (
    <div className="flex items-center justify-start flex-col overflow-auto">
      {sessionTimes.map((time, i) => (
        <motion.div className="flex" key={i}>
          <div className="p-1">{sessionTimes.length - i}</div>
          <div
            className="p-1 cursor-pointer"
            onClick={() => {
              setTimeModal(time);
              setToggleModal(true);
            }}
          >
            {time.dnf
              ? time.time + " (DNF)"
              : time.plus2
              ? time.time + " (+2)"
              : time.time}
          </div>
        </motion.div>
      ))}
      {toggleModal && (
        <TimeModal
          time={timeModal}
          setToggleModal={setToggleModal}
          sessionName={sessionName}
        />
      )}
    </div>
  );
}

export default Times;
