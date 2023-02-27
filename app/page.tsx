"use client";

import Link from "next/link";
import Cube from "./timer/CubeState";
import { BsArrowRight } from "react-icons/bs";
import heroCube from "../assets/images/heroCube.png";
import Image from "next/image";

function Homepage() {
  return (
    <>
      <div className="bg-red-600 w-[50vw] md:w-80 absolute h-screen top-0 right-0 -z-20"></div>
      <div className="flex h-[95vh] w-full text-zinc-800 dark:text-neutral-50 p-4 flex-col xl:flex-row">
        <div className="hidden lg:block text-[42rem] text-zinc-800 dark:text-neutral-50 font-bold absolute -left-32 opacity-5 top-0 h-auto -z-10 select-none">
          AM
        </div>
        <div className="flex items-center text-center xl:text-left xl:items-start flex-col xl:ml-56 xl:mt-28 mt-10 ">
          <h1 className="font-bold lg:text-9xl md:text-8xl text-7xl">
            AMTimer
          </h1>
          <h2 className="font-semibold lg:text-4xl md:text-3xl text-2xl mt-4 md:mt-0">
            The website for all your cubing needs.
            {/*"Unlock Your Inner Speedcuber with Our Timer App"
"Revolutionize Your Rubik's Cube Solving Experience"
"Track Your Progress and Improve Your Time with Our Timer"
"Solve Faster and Smarter with the Rubik's Cube Timer App"
"The Ultimate Tool for Every Rubik's Cube Enthusiast"
 The Ultimate Rubik's Cube Companion*/}
          </h2>
          <p className="text lg:text-xl text-lg max-w-2xl mt-4">
            Delve into the world of speedcubing with this all-in-one timer,
            including personalized stats, tutorials, and more.
          </p>
          <div className="flex w-full mt-16 space-x-11 xl:justify-start justify-center">
            <Link
              href="/about"
              className="text-xl rounded-lg text-center p-2 border-2 border-neutral-100 text-neutral-100 md:border-red-600 md:text-red-600 flex items-center hover:bg-red-300"
              scroll={false}
            >
              Learn More
              <BsArrowRight className="ml-2" />
            </Link>
            <Link
              href="/signup"
              className="text-zinc-900 text-xl bg-neutral-100 rounded-lg text-center p-2 border-2 dark:border-neutral-100 border-zinc-800 hover:bg-neutral-200"
            >
              Sign Up
            </Link>
          </div>
        </div>
        <div className="flex items-center justify-start lg:w-[30rem] w-[10rem]">
          <div className="aspect-square object-contain w-full select-none">
            <Image src={heroCube} alt="cube" fill={false} />
          </div>
        </div>
      </div>
    </>
  );
}

export default Homepage;
