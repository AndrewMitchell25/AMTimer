import Tile from "./Tile"
import Cube from "../scramble/cube"

function CubeState() {
  let c : Cube = new Cube()
  let tiles : string[] = c.toArray()
  return (
    <div className="grid grid-cols-9 grid-rows-9 w-auto h-auto">
      {
        tiles.map((tile, i) => (
          <Tile color={tile} key={i}/>
        ))
      }
    </div>
  )
}

export default CubeState