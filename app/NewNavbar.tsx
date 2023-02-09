"use client";

import Link from "next/link";
import { useRef, useState } from "react";
import { HiOutlineMenuAlt3 } from "react-icons/hi";
import { useAuth } from "../Contexts/AuthContext";
import logo from "../assets/images/logo.png";
import Image from "next/image";
import { CgProfile } from "react-icons/cg";
import NavLink from "./NavLink";
import { usePathname, useRouter } from "next/navigation";
import clickOutside from "../constants/clickOutside";
import { profile } from "console";
import { auth } from "../Firebase/firebase";

function NewNavbar() {
  const { currentUser, currentUserData } = useAuth() as AuthContextType;
  const [toggle, setToggle] = useState(false);
  const routerPath = usePathname();
  const router = useRouter();
  const [profileMenu, setProfileMenu] = useState(false);
  const profileMenuRef = useRef(null);
  const profileMenuButtonRef = useRef(null);

  //clickOutside([profileMenuRef, profileMenuButtonRef], () =>
  //  setProfileMenu(false)
  //);

  function signOut() {
    return auth.signOut();
  }

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
          <NavLink text="Home" active={routerPath == "/"} />
          <NavLink text="About" active={routerPath == "/about"} />
          <NavLink text="Timer" active={routerPath == "/timer"} />
        </ul>

        {currentUser ? (
          <div className="flex ml-auto cursor-pointer text-center items-center relative">
            <div ref={profileMenuButtonRef}>
              <CgProfile
                className="w-auto h-8"
                onClick={() => {
                  setProfileMenu(!profileMenu);
                }}
              />
            </div>
            {profileMenu && (
              <div
                className="absolute right-0 top-12 w-56 divide-y divide-gray-100 rounded-md bg-neutral-100 shadow-lg origin-top-right p-2"
                ref={profileMenuRef}
              >
                <ul className="text-neutral-900">
                  {currentUserData && (
                    <h2 className="flex">{currentUserData.displayName}</h2>
                  )}
                  <Link
                    href="/profile"
                    className="flex hover:bg-neutral-300 w-full rounded-sm p-2"
                    onClick={() => setProfileMenu(false)}
                  >
                    Profile
                  </Link>
                  <h2
                    onClick={() => {
                      setProfileMenu(false);
                      signOut();
                      router.push("/");
                    }}
                    className="text-blue-400 cursor-pointer flex hover:bg-slate-300 w-full rounded-sm p-1"
                  >
                    Sign Out
                  </h2>
                </ul>
              </div>
            )}
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
