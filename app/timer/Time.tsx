type Props = {
  time: string;
  style: string;
};

function Time({ time, style }: Props) {
  return (
    <div className={`${style} font-sans text-zinc-800 dark:text-neutral-100`}>
      <span className="text-[20vh]">{time.slice(0, -2)}</span>
      <span className="text-[8vh]">{time.slice(-2)}</span>
    </div>
  );
}

export default Time;
