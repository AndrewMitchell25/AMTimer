import Link from "next/link";
import { Dispatch, SetStateAction } from "react";

interface Props {
  active: boolean;
  text: string;
}

function NavLink({ text, active }: Props) {
  return (
    <Link
      href={text == "Home" ? "/" : `/${text.toLowerCase()}`}
      className={
        (active ? "text-red-600 bg-neutral-200 dark:bg-zinc-900" : "") +
        " text-lg dark:hover:bg-neutral-700 hover:bg-neutral-300 h-full text-center items-center flex px-4"
      }
    >
      {text}
    </Link>
  );
}

export default NavLink;
