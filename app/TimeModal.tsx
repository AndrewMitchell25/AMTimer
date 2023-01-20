import { deleteDoc, doc } from "firebase/firestore";
import { motion } from "framer-motion";
import { Dispatch, SetStateAction } from "react";
import { HiX } from "react-icons/hi";
import { useAuth } from "../Contexts/AuthContext";
import { db } from "../Firebase/firebase";

interface Props {
  time: time;
  setToggleModal: Dispatch<SetStateAction<boolean>>;
  sessionName: string;
}

function TimeModal({ time, setToggleModal, sessionName }: Props) {
  const { currentUser } = useAuth() as AuthContextType;

  async function deleteTime(id: string) {
    try {
      await deleteDoc(
        doc(db, `users/${currentUser.uid}/sessions/${sessionName}/times`, id)
      );
    } catch {
      console.error();
    }
  }

  return (
    <div className="absolute w-screen h-screen bg-opacity-30 bg-black top-0 left-0 flex items-center justify-center">
      <div className="w-1/2 h-1/2 bg-white rounded-lg p-2">
        <div className="w-full flex items-end justify-end">
          <HiX
            onClick={() => {
              setToggleModal(false);
            }}
            className="hover:bg-slate-100 rounded-md p-1 cursor-pointer text-3xl lg:text-4xl"
          />
        </div>
        <div className="flex flex-col items-center justify-center w-full p-2">
          <h1 className="text-5xl font-semibold pb-5">{time.time}</h1>
          <div className="w-full flex items-center justify-center space-x-4">
            <motion.button
              whileTap={{ scale: 0.9 }}
              className="text-lg bg-slate-200 rounded-md px-1 py-.5"
            >
              +2
            </motion.button>
            <motion.button
              whileTap={{ scale: 0.9 }}
              className="text-lg bg-slate-200 rounded-md px-1 py-.5"
            >
              DNF
            </motion.button>
            <motion.button
              whileTap={{ scale: 0.9 }}
              className="text-lg bg-slate-200 rounded-md px-1 py-.5"
              onClick={() => {
                deleteTime(time.id);
                setToggleModal(false);
              }}
            >
              Delete
            </motion.button>
          </div>
          <h2 className="text-2xl p-2 text-center">
            Scramble: {time.scramble}
          </h2>
        </div>
      </div>
    </div>
  );
}

export default TimeModal;
