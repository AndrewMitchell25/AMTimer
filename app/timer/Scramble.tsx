interface Props {
  scramble: string;
}

function Scramble({ scramble }: Props) {
  return (
    <div className="flex text-center items-center justify-center text-2xl text-zinc-800 dark:text-neutral-50">
      {scramble}
    </div>
  );
}

export default Scramble;
