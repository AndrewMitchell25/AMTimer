import { deleteDoc, doc, getDoc, setDoc, updateDoc } from "firebase/firestore";
import { motion } from "framer-motion";
import { Dispatch, SetStateAction, useState } from "react";
import { HiX } from "react-icons/hi";
import { formatTime } from "../../constants/formatTime";
import unFormatTime from "../../constants/unFormatTime";
import { useAuth } from "../../Contexts/AuthContext";
import { db } from "../../Firebase/firebase";

interface Props {
  time: time;
  setToggleModal: Dispatch<SetStateAction<boolean>>;
  sessionName: string;
}

function TimeModal({ time, setToggleModal, sessionName }: Props) {
  const { currentUser } = useAuth() as AuthContextType;
  const [displayTime, setdisplayTime] = useState(time);

  async function deleteTime(id: string) {
    try {
      await deleteDoc(
        doc(db, `users/${currentUser.uid}/sessions/${sessionName}/times`, id)
      );
    } catch {
      console.error();
    }
  }

  async function setPlus2(time: time) {
    try {
      const docRef = doc(
        db,
        `users/${currentUser.uid}/sessions/${sessionName}/times`,
        time.id
      );
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        const data = docSnap.data();
        let plus = 0;
        data.plus2 ? (plus = -2000) : (plus = 2000);
        let newTime = formatTime(unFormatTime(data.time) * 1000 + plus);
        await updateDoc(docRef, {
          time: newTime,
          plus2: !data.plus2,
        }),
          {};
        const newDocSnap = await getDoc(docRef);
        setdisplayTime(newDocSnap.data() as time);
      }
    } catch {
      console.error();
    }
  }

  async function setDNF(time: time) {
    try {
      const docRef = doc(
        db,
        `users/${currentUser.uid}/sessions/${sessionName}/times`,
        time.id
      );
      const docSnap = await getDoc(docRef);
      if (docSnap.exists())
        await updateDoc(docRef, {
          dnf: !docSnap.data().dnf,
        }),
          {};
      const newDocSnap = await getDoc(docRef);
      setdisplayTime(newDocSnap.data() as time);
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
          <div className="flex space-x-3">
            <h1 className="text-5xl font-semibold pb-5">{displayTime.time}</h1>

            {displayTime.plus2 && (
              <h1 className="text-5xl font-semibold pb-5 text-red-500">+2</h1>
            )}

            {displayTime.dnf && (
              <h1 className="text-5xl font-semibold pb-5 text-red-500"> DNF</h1>
            )}
          </div>
          <div className="w-full flex items-center justify-center space-x-4">
            <motion.button
              whileTap={{ scale: 0.9 }}
              className={
                (displayTime.plus2 ? "bg-slate-500" : "bg-slate-200") +
                " text-lg  rounded-md px-2 py-1"
              }
              onClick={() => setPlus2(time)}
            >
              +2
            </motion.button>
            <motion.button
              whileTap={{ scale: 0.9 }}
              className={
                (displayTime.dnf ? "bg-slate-500" : "bg-slate-200") +
                " text-lg  rounded-md px-2 py-1"
              }
              onClick={() => setDNF(time)}
            >
              DNF
            </motion.button>
            <motion.button
              whileTap={{ scale: 0.9 }}
              className="text-lg bg-slate-200 rounded-md px-2 py-1"
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
