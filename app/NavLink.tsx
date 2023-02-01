import Link from "next/link";
import { Dispatch, SetStateAction } from "react";

interface Props {
  active: string;
  text: string;
  setActive: Dispatch<SetStateAction<string>>;
}

function NavLink({ text, active, setActive }: Props) {
  return (
    <Link
      href={text == "Home" ? "/" : `/${text.toLowerCase()}`}
      className={
        (active == text ? "text-red-600" : "") +
        " text-lg hover:bg-neutral-700 h-full text-center items-center flex px-4"
      }
      onClick={() => setActive(text)}
    >
      {text}
    </Link>
  );
}

export default NavLink;
