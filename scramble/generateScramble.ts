function generateScramble() {
  let moves: string[] = ["U", "R", "F", "D", "L", "B"];
  let powers: string[] = ["", "2", "'"];
  let scrambleArr: number[] = [];
  let scramble: string[] = [];

  for (let i = 0; i < 20; i++) {
    let n = Math.floor(Math.random() * moves.length);
    while (scrambleArr.at(-1) == n || scrambleArr.at(-1) == (n + 3) % 6) {
      n = Math.floor(Math.random() * moves.length);
    }
    scrambleArr.push(n);
    let x = Math.floor(Math.random() * 3);
    scramble.push(moves[n]);
    scramble.push(powers[x]);
    scramble.push(" ");
  }
  return scramble.join("");
}

export default generateScramble;
