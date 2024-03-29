"use client";

import { useState, useRef } from "react";
import { useAuth } from "../../Contexts/AuthContext";
import Graph from "../Graph";
import getSessions from "../../constants/getSessions";
import profileGetTimes from "../../constants/profileGetTimes";
import clickOutside from "../../constants/clickOutside";
import SessionDropdown from "./SessionDropdown";

function ProfilePage() {
  const { currentUser, currentUserData } = useAuth() as AuthContextType;
  const [sessionName, setSessionName] = useState("Select a Session");
  const [sessionDropdown, setSessionDropdown] = useState(false);
  const [sessionNames, setSessionNames] = useState<string[]>([]);
  const [sessionTimes, setSessionTimes] = useState<time[]>([]);
  const sessionListRef = useRef(null);

  clickOutside([sessionListRef], () => setSessionDropdown(false));

  // Call getSessions function
  getSessions(
    currentUser,
    sessionNames,
    setSessionNames,
    setSessionName,
    setSessionTimes
  );

  profileGetTimes(currentUser, sessionName, setSessionTimes);

  if (currentUser && currentUserData) {
    return (
      <>
        <div className="bg-green-600 w-[50vw] md:w-80 absolute h-screen top-0 right-0 -z-20"></div>
        <div className="text-zinc-800 dark:text-neutral-50 w-full">
          <div className="px-8 pt-8">
            <h1 className="text-7xl font-bold break-before-auto break-words">
              {currentUserData.displayName}
            </h1>
            <h3 className="text-lg mt-2">
              Member since{" "}
              {currentUserData.dateCreated.split(" ").slice(0, 4).join(" ")}
            </h3>
          </div>
          <div className=" flex p-4 flex-col md:flex-row">
            <div className="flex flex-col md:w-1/2 w-full space-y-4 p-4">
              <div className="flex p-4 rounded-lg bg-neutral-200 dark:bg-neutral-900 dark:bg-opacity-70 w-full justify-center text-left items-center">
                <h1 className="text-xl flex justify-center text-left w-1/2">
                  Total Solves:
                </h1>
                <h1 className="text-xl flex justify-center text-right w-1/2">
                  {currentUserData.totalSolves}
                </h1>
              </div>
              <div className="flex flex-col p-4 rounded-lg bg-neutral-200 dark:bg-neutral-900 dark:bg-opacity-70 w-full justify-center text-left items-center">
                <h1 className="flex w-full text-center text-xl justify-center items-center">
                  PBs
                </h1>
                <div className="flex w-full">
                  <div className="flex flex-col w-1/2 text-center justify-center">
                    <p className="">Single:</p>
                    <p>Average of 5:</p>
                    <p>Average of 12:</p>
                    <p>Average of 50:</p>
                    <p>Average of 100:</p>
                  </div>
                  <div className="flex flex-col w-1/2 text-center justify-center">
                    <p>
                      {currentUserData.pbs.single
                        ? currentUserData.pbs.single
                        : "N/A"}
                    </p>
                    <p>
                      {currentUserData.pbs.ao5
                        ? currentUserData.pbs.ao5
                        : "N/A"}
                    </p>
                    <p>
                      {currentUserData.pbs.ao12
                        ? currentUserData.pbs.ao12
                        : "N/A"}
                    </p>
                    <p>
                      {currentUserData.pbs.ao50
                        ? currentUserData.pbs.ao50
                        : "N/A"}
                    </p>
                    <p>
                      {currentUserData.pbs.ao100
                        ? currentUserData.pbs.ao100
                        : "N/A"}
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div className="flex flex-col p-4 md:w-1/2 w-full">
              <div className="flex flex-col space-y-2 p-4 rounded-lg bg-neutral-200 dark:bg-neutral-900 dark:bg-opacity-70 w-full">
                <SessionDropdown
                  sessionName={sessionName}
                  setSessionName={setSessionName}
                  sessionNames={sessionNames}
                  sessionListRef={sessionListRef}
                  sessionDropdown={sessionDropdown}
                  setSessionDropdown={setSessionDropdown}
                />
                <div className="bg-neutral-100 p-2 rounded-md w-full flex relative h-60">
                  <Graph times={sessionTimes} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }
}

export default ProfilePage;
