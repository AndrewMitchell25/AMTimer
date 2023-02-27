"use client";

import {
  doc,
  DocumentData,
  DocumentSnapshot,
  getDoc,
} from "firebase/firestore";
import { createContext, useContext, useEffect } from "react";
import { db } from "../Firebase/firebase";

interface Props {
  children: React.ReactNode;
}

const DBContext = createContext<DBContextType | null>(null);

const DBProvider: React.FC<Props> = ({ children }) => {
  let appDataSnap = null;
  let appDataRef = doc(db, "appData/data");

  useEffect(() => {
    const getAppData = async () => {
      appDataSnap = await getDoc(doc(db, "appData/data"));
    };
  }, []);

  const value = { appDataSnap, appDataRef };

  return <DBContext.Provider value={value}>{children}</DBContext.Provider>;
};

export function useDB() {
  return useContext(DBContext);
}

export default DBProvider;
