import Timer from "./Timer";
import Cube from "./CubeState";
import Times from "./Times";

function Homepage() {
  return (
    <div className="flex justify-center align-middle h-full w-full">
      <Timer />
      <Times />
    </div>
  );
}

export default Homepage;
