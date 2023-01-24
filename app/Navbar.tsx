"use client";

import Link from "next/link";
import { useState } from "react";
import { useAuth } from "../Contexts/AuthContext";
import { HiMenuAlt4, HiX } from "react-icons/hi";
import { AnimatePresence, motion } from "framer-motion";
import { CgProfile } from "react-icons/cg";
import { useRouter } from "next/navigation";

function Navbar() {
  const { currentUser, signOut } = useAuth() as AuthContextType;
  const [toggle, setToggle] = useState(false);
  const [profile, setProfile] = useState(false);
  const router = useRouter();

  return (
    <>
      <nav className="w-full flex items-center justify-between bg-slate-300 border border-solid border-opacity-20 border-black relative px-2 py-1 backdrop-blur-sm">
        <div className="flex justify-start items-center">
          <img src={""} alt="logo" className="w-auto h-[45px] 2xl:h-[60px]" />
          <Link
            href="/"
            className="text-xl 2xl:text-2xl px-3 font-semibold font-poppins"
          >
            AMTimer
          </Link>
          <ul className="hidden md:flex px-4">
            {["About", "test", "links", "here"].map((item) => (
              <li
                key={`link-${item}`}
                className="flex justify-center items-center text-md 2xl:text-2xl text-gray-800 px-5"
              >
                <Link href={`/${item.toLowerCase()}`} className="">
                  {item}
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <div className="hidden md:flex">
          {currentUser == null ? (
            <motion.button
              onClick={() => router.push("/signin")}
              whileTap={{ scale: 0.9 }}
              className="bg-blue-400 p-2 w-auto h-full rounded-md"
            >
              Sign In
            </motion.button>
          ) : (
            <motion.button whileTap={{ scale: 0.9 }}>
              <CgProfile
                onClick={() => setProfile(!profile)}
                className="w-auto h-6 cursor-pointer hover:text-white"
              />
            </motion.button>
          )}
          <AnimatePresence>
            {profile && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.35, ease: "easeOut" }}
                className="flex absolute top-11 mt-1 w-auto h-auto bg-white right-2 p-3 flex-col items-start space-y-2 rounded-sm"
                onClick={() => setProfile(false)}
              >
                <h2 className="flex">{currentUser.displayName}</h2>
                <Link
                  href="/profile"
                  className="flex hover:bg-slate-100 w-full rounded-sm p-1"
                >
                  Profile
                </Link>
                <h2
                  onClick={() => {
                    setProfile(false);
                    signOut();
                    router.push("/");
                  }}
                  className="text-blue-400 cursor-pointer flex hover:bg-slate-100 w-full rounded-sm p-1"
                >
                  Sign Out
                </h2>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
        <div className="flex md:hidden justify-center items-center px-2 py-0 list-none">
          <HiMenuAlt4 onClick={() => setToggle(true)} />

          {toggle && (
            <motion.div
              whileInView={{ x: [300, 0] }}
              transition={{ duration: 0.35, ease: "easeOut" }}
              className="fixed p-4 h-screen w-4/5 flex flex-col bg-white top-0 right-0"
            >
              <HiX
                onClick={() => setToggle(false)}
                className="flex self-end mt-1"
              />
              <ul>
                {["About", "test", "links", "here"].map((item) => (
                  <li key={`link-${item}`}>
                    <Link
                      href={`/${item.toLowerCase()}`}
                      onClick={() => setToggle(false)}
                    >
                      {item}
                    </Link>
                  </li>
                ))}
                <br />
                <li>
                  <a
                    href="https://github.com/AndrewMitchell25"
                    target="_blank"
                    rel="noreferrer"
                  >
                    GitHub
                  </a>
                </li>
              </ul>
            </motion.div>
          )}
        </div>
      </nav>
    </>
  );
}

export default Navbar;
