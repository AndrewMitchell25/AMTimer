import Link from "next/link";
import Cube from "./timer/CubeState";
import { BsArrowRight } from "react-icons/bs";
import heroCube from "../assets/images/heroCube.png";
import Image from "next/image";

function Homepage() {
  return (
    <>
      <div className="bg-red-600 w-96 max-w-[50vw] absolute h-screen top-0 right-0 -z-10"></div>
      <div className="flex h-[90vh] w-full text-neutral-100 p-4 flex-col xl:flex-row">
        <div className="flex items-center text-center xl:text-left xl:items-start flex-col xl:ml-56 xl:mt-28 ">
          <h1 className="font-bold text-9xl">AMTimer</h1>
          <h2 className="font-semibold text-4xl">
            The website for all your cubing needs.
          </h2>
          <p className="text text-xl max-w-2xl mt-4">
            Delve into the world of speedcubing with this all-in-one timer,
            including personalized stats, tutorials, and more.
          </p>
          <div className="flex w-full mt-16 space-x-11">
            <Link
              href="/"
              className="text-xl rounded-lg text-center p-2 border-2 border-red-600 text-red-600 flex items-center"
            >
              Learn More
              <BsArrowRight className="ml-2" />
            </Link>
            <Link
              href="/signup"
              className="text-zinc-900 text-xl bg-neutral-100 rounded-lg text-center p-2 border-2"
            >
              Sign Up
            </Link>
          </div>
        </div>
        <div className="flex items-center justify-start lg:w-[30rem]">
          <div className="aspect-square object-contain w-full mt-28">
            <Image src={heroCube} alt="cube" fill={false} />
          </div>
        </div>
      </div>
    </>
  );
}

export default Homepage;
