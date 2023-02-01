"use client";

import Link from "next/link";
import { useState } from "react";
import { HiOutlineMenuAlt3 } from "react-icons/hi";
import { useAuth } from "../Contexts/AuthContext";
import logo from "../assets/images/logo.png";
import Image from "next/image";
import { CgProfile } from "react-icons/cg";
import NavLink from "./NavLink";

function NewNavbar() {
  const { currentUser } = useAuth() as AuthContextType;
  const [toggle, setToggle] = useState(false);
  const [active, setActive] = useState("Home");

  const links = [];

  return (
    <nav className="flex w-full max-w-screen h-14 bg-transparent shadow-xl text-neutral-100 text-center items-center justify-start px-2">
      <div className="w-10">
        <Image src={logo} alt="logo" />
      </div>
      <div className="flex text-center">
        <h2 className="text-2xl font-semibold ml-4">AMTimer</h2>
      </div>
      <div className="flex md:hidden ml-auto text-lg rounded-lg border-2 p-2">
        <HiOutlineMenuAlt3 onClick={() => setToggle(true)} />
      </div>
      <div className="hidden md:flex flex-row h-full w-full">
        <ul className="flex space-x-10 ml-14 h-full text-center items-center">
          <NavLink text="Home" active={active} setActive={setActive} />
          <NavLink text="About" active={active} setActive={setActive} />
          <NavLink text="Timer" active={active} setActive={setActive} />
        </ul>

        {currentUser ? (
          <div className="flex ml-auto cursor-pointer text-center items-center">
            <CgProfile className="w-auto h-8" />
          </div>
        ) : (
          <Link
            href="/signup"
            className="flex text-lg rounded-lg border-2 p-2 ml-auto"
          >
            Sign Up
          </Link>
        )}
      </div>
    </nav>
  );
}

export default NewNavbar;
