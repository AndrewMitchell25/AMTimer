import { motion } from "framer-motion";

interface Props {
  sessionTimes: string[];
}

function Times({ sessionTimes }: Props) {
  return (
    <div>
      {sessionTimes.map((time) => (
        <motion.div>{time}</motion.div>
      ))}
    </div>
  );
}

export default Times;
