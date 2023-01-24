import { deleteDoc, doc, getDoc, setDoc, updateDoc } from "firebase/firestore";
import { motion } from "framer-motion";
import { Dispatch, SetStateAction } from "react";
import { HiX } from "react-icons/hi";
import { useAuth } from "../../Contexts/AuthContext";
import { db } from "../../Firebase/firebase";

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
        await updateDoc(docRef, {
          /*
            time: data.time
            .substring(0, -3)
            .concat((data.time.at(-3).parseInt() + 2).toString())
            .concat(data.time.substring(-4)),
            */
          plus2: !data.plus2,
        }),
          {};
      }
      //CREATE REAL TIME UPDATE SHOWING +2 ON SCREEN
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
      //CREATE REAL TIME UPDATE SHOWING DNF ON SCREEN
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
              onClick={() => setPlus2(time)}
            >
              +2
            </motion.button>
            <motion.button
              whileTap={{ scale: 0.9 }}
              className="text-lg bg-slate-200 rounded-md px-1 py-.5"
              onClick={() => setDNF(time)}
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
          {
            //TEMPROARY
            //FIND SOME WAY TO REPLACE
          }
          <h2>{time.plus2 ? "+2" : ""}</h2>
          <h2>{time.dnf ? "DNF" : ""}</h2>
        </div>
      </div>
    </div>
  );
}

export default TimeModal;
