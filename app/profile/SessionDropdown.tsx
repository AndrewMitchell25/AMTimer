import { motion } from "framer-motion";
import { Dispatch, MutableRefObject, SetStateAction } from "react";
import { RiArrowDropDownLine } from "react-icons/ri";

interface Props {
  sessionName: string;
  setSessionName: Dispatch<SetStateAction<string>>;
  sessionNames: string[];
  sessionListRef: MutableRefObject<null>;
  sessionDropdown: boolean;
  setSessionDropdown: Dispatch<SetStateAction<boolean>>;
}

function SessionDropdown({
  sessionName,
  setSessionName,
  sessionNames,
  sessionListRef,
  sessionDropdown,
  setSessionDropdown,
}: Props) {
  return (
    <div className="relative" ref={sessionListRef}>
      <div
        className="flex text-center justify-center items-center cursor-pointer bg-neutral-100 text-neutral-900 rounded-md p-2 space-x-2"
        onClick={() => setSessionDropdown(!sessionDropdown)}
      >
        <h1>{sessionName}</h1>
        <motion.div whileTap={{ scale: 0.9 }}>
          <RiArrowDropDownLine
            className={
              (sessionDropdown ? "rotate-180 transition-all ease-in-out" : "") +
              " text-xl bg-neutral-300 rounded-md hover:bg-neutral-400"
            }
          />
        </motion.div>
      </div>
      {sessionDropdown && (
        <div className="bg-neutral-100 text-neutral-900 w-full absolute rounded-md mt-1 p-2 flex flex-col shadow-md z-30">
          {sessionNames.map((session) => (
            <div
              className="cursor-pointer hover:bg-slate-200 p-1 rounded-md"
              key={session}
              onClick={() => {
                setSessionName(session);
                setSessionDropdown(!sessionDropdown);
              }}
            >
              {session}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default SessionDropdown;
