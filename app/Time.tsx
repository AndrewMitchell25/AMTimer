type Props = {
  time: number;
  style: string;
};

function Time({ time, style }: Props) {
  return <div className={`h-10 ${style}`}>{time}</div>;
}

export default Time;
