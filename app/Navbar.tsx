"use client";

import Link from "next/link";
import { useState } from "react";
import { useAuth } from "../Contexts/AuthContext";
import { HiMenuAlt4, HiX } from "react-icons/hi";
import { motion, MotionConfig } from "framer-motion";

function Navbar() {
  const { currentUser, signOut } = useAuth() as AuthContextType;
  const [toggle, setToggle] = useState(false);

  return (
    <nav className="w-full flex items-center justify-between bg-slate-300 border border-solid border-opacity-20 border-black fixed px-2 py-1 backdrop-blur-sm">
      <div className="flex justify-start items-center">
        <img src={""} alt="logo" className="w-auto h-[45px] 2xl:h-[60px]" />
        <h2 className="text-xl 2xl:text-2xl px-3">AMTimer</h2>
        <ul className="hidden md:flex px-4">
          {["test", "links", "here"].map((item) => (
            <li
              key={`link-${item}`}
              className="flex justify-center items-center text-md 2xl:text-2xl text-gray-800 px-5"
            >
              <Link href={`/${item}`}>{item}</Link>
            </li>
          ))}
        </ul>
      </div>
      {currentUser == null ? (
        <Link
          href="signin"
          className="bg-blue-400 p-2 w-auto h-full rounded-md"
        >
          Sign In
        </Link>
      ) : (
        <button
          onClick={signOut}
          className="bg-blue-400 p-2 w-auto h-full rounded-md hidden md:block"
        >
          Sign Out{currentUser.displayName}
        </button>
      )}

      <div className="flex md:hidden justify-center items-center px-2 py-0 list-none">
        <HiMenuAlt4 onClick={() => setToggle(true)} />

        {toggle && (
          <motion.div
            whileInView={{ x: [300, 0] }}
            transition={{ duration: 0.85, ease: "easeOut" }}
          >
            <HiX onClick={() => setToggle(false)} />
          </motion.div>
        )}
      </div>
    </nav>
  );
}

export default Navbar;

{
  /*
<nav className="flex align-middle h-10">
      <Link href="/">AMTimer</Link>
      {currentUser == null ? (
        <Link
          href="signin"
          className="bg-blue-400 p-3 w-auto h-full rounded-md"
        >
          Sign In
        </Link>
      ) : (
        <button onClick={signOut}>Sign Out{currentUser.displayName}</button>
      )}
    </nav>
  */
}
