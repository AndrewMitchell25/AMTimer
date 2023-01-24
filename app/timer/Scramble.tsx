interface Props {
  scramble: string;
}

function Scramble({ scramble }: Props) {
  return (
    <div className="flex text-center items-center justify-center bg-slate-200 text-2xl">
      {scramble}
    </div>
  );
}

export default Scramble;
