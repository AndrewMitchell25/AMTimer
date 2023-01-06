type Props = {
    color: string;
}

const colors: Map<string, string> = new Map([
  ['W', 'white'],
  ['R', 'red'],
  ['G', 'green'],
  ['Y', 'yellow'],
  ['O', 'orange'],
  ['B', 'blue']
]);


function Tile({color} : Props) {
  return (
    <div className={`bg-${colors.get(color)}-600 h-10 w-10`}></div>
  )
}

export default Tile