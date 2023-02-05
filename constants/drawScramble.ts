//Draw the scramble in the console

import { Dispatch, SetStateAction, useEffect } from "react";
import Cube from "../scramble/cube";

//TODO: Draw to 2D or 3D cube representation
function drawScramble(scramble: string, cube: any, setCube: any) {
  useEffect(() => {
    console.log(scramble);
    setCube(new Cube());
    cube.move(scramble);
    console.log(cube.display());
  }, [scramble]);
}

export default drawScramble;
