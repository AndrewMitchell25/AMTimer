import Link from "next/link";

function NewNavbar() {
  return (
    <nav className="flex w-full h-14 bg-transparent shadow-xl text-neutral-100 text-center items-center justify-start px-2">
      <div className="flex">
        <img src={""} alt="logo" />
        <h2 className="text-2xl font-semibold">AMTimer</h2>
      </div>
      <ul className="flex space-x-10 ml-14">
        <Link href="/" className="text-lg">
          Home
        </Link>
        <Link href="/about" className="text-lg">
          About
        </Link>
        <Link href="/timer" className="text-lg">
          Timer
        </Link>
      </ul>
      <Link href="/signup" className="text-lg rounded-lg border-2 p-2 ml-auto">
        Sign Up
      </Link>
    </nav>
  );
}

export default NewNavbar;
