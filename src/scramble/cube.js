let U,
  R,
  F,
  D,
  L,
  B,
  UR,
  UF,
  UL,
  UB,
  DR,
  DF,
  DL,
  DB,
  FR,
  FL,
  BL,
  BR,
  URF,
  UFL,
  ULB,
  UBR,
  DFR,
  DLF,
  DBL,
  DRB;

//centers
[U, R, F, D, L, B] = [0, 1, 2, 3, 4, 5];
const centers = [4, 13, 22, 31, 40, 49];
const centerColors = ["W", "R", "G", "Y", "O", "B"];

//corners
[URF, UFL, ULB, UBR, DFR, DLF, DBL, DRB] = [0, 1, 2, 3, 4, 5, 6, 7];
const corners = [
  [8, 9, 20],
  [6, 18, 38],
  [0, 36, 47],
  [2, 45, 11],
  [29, 26, 15],
  [27, 44, 24],
  [33, 53, 42],
  [35, 17, 51],
];
const cornerColors = [
  ["W", "R", "G"],
  ["W", "G", "O"],
  ["W", "O", "B"],
  ["W", "B", "R"],
  ["Y", "G", "R"],
  ["Y", "O", "G"],
  ["Y", "B", "O"],
  ["Y", "R", "B"],
];

//Edges
[UR, UF, UL, UB, DR, DF, DL, DB, FR, FL, BL, BR] = [
  0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11,
];
const edges = [
  [5, 10],
  [7, 19],
  [3, 37],
  [1, 46],
  [32, 16],
  [28, 25],
  [30, 43],
  [34, 52],
  [23, 12],
  [21, 41],
  [50, 39],
  [48, 14],
];
const edgeColors = [
  ["W", "R"],
  ["W", "G"],
  ["W", "O"],
  ["W", "B"],
  ["Y", "R"],
  ["Y", "G"],
  ["Y", "O"],
  ["Y", "B"],
  ["G", "R"],
  ["G", "O"],
  ["B", "O"],
  ["B", "R"],
];

class Cube {
  constructor() {
    this.identity();

    this.newCenter = [0, 1, 2, 3, 4, 5];
    this.newCp = [0, 1, 2, 3, 4, 5, 6, 7];
    this.newCo = [0, 0, 0, 0, 0, 0, 0, 0];
    this.newEp = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11];
    this.newEo = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
  }

  identity() {
    this.center = [0, 1, 2, 3, 4, 5];
    this.cp = [0, 1, 2, 3, 4, 5, 6, 7];
    this.co = [0, 0, 0, 0, 0, 0, 0, 0];
    this.ep = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11];
    this.eo = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
  }

  toString() {
    let str = [];
    for (let i = 0; i < 6; i++) {
      str[centers[i]] = centerColors[this.center[i]];
    }
    for (let i = 0; i < 8; i++) {
      let c = this.cp[i];
      let o = this.co[i];
      for (let j = 0; j < 3; j++) {
        str[corners[i][j]] = cornerColors[c][(o + j) % 3];
      }
    }
    for (let i = 0; i < 12; i++) {
      let e = this.ep[i];
      let o = this.eo[i];
      for (let j = 0; j < 3; j++) {
        str[edges[i][j]] = edgeColors[e][(o + j) % 2];
      }
    }
    return str.join("");
  }

  display() {
    let str = this.toString();
    let res = "          +---------+\n";
    for (let i = 0; i < 3; i++) {
      res += "          |";
      for (let j = 0; j < 3; j++) {
        res += ` ${str[i * 3 + j]} `;
      }
      res += "|\n";
    }
    res += "+---------+---------+---------+---------+\n";
    for (let i = 0; i < 3; i++) {
      res += "|";
      for (let j = 0; j < 3; j++) {
        res += ` ${str[36 + i * 3 + j]} `;
      }
      res += "|";
      for (let j = 0; j < 3; j++) {
        res += ` ${str[18 + i * 3 + j]} `;
      }
      res += "|";
      for (let j = 0; j < 3; j++) {
        res += ` ${str[9 + i * 3 + j]} `;
      }
      res += "|";
      for (let j = 0; j < 3; j++) {
        res += ` ${str[45 + i * 3 + j]} `;
      }
      res += "|\n";
    }
    res += "+---------+---------+---------+---------+\n";
    for (let i = 0; i < 3; i++) {
      res += "          |";
      for (let j = 0; j < 3; j++) {
        res += ` ${str[27 + i * 3 + j]} `;
      }
      res += "|\n";
    }
    res += "          +---------+\n";
    console.log(res);
  }

  multiplyCenters(other) {
    for (let i = 0; i < 6; i++) {
      let n = other.center[i];
      this.newCenter[i] = this.center[n];
    }
    this.center = [...this.newCenter];
    return this;
  }

  multiplyCorners(other) {
    for (let i = 0; i < 9; i++) {
      let n = other.cp[i];
      this.newCp[i] = this.cp[n];
      this.newCo[i] = (this.co[n] + other.co[i]) % 3;
    }
    this.cp = [...this.newCp];
    this.co = [...this.newCo];
    return this;
  }

  multiplyEdges(other) {
    for (let i = 0; i < 12; i++) {
      let n = other.ep[i];
      this.newEp[i] = this.ep[n];
      this.newEo[i] = (this.eo[n] + other.eo[i]) % 2;
    }
    this.ep = [...this.newEp];
    this.eo = [...this.newEo];
    return this;
  }

  multiply(other) {
    this.multiplyCenters(other);
    this.multiplyCorners(other);
    this.multiplyEdges(other);
    return this;
  }

  move(arg) {
    let alg = this.parseAlg(arg);
    for (let i = 0; i < alg.length; i++) {
      let move = alg[i];
      let face = move[0];
      let power = move[1];
      for (let j = 0; j <= power; j++) {
        this.multiply(Cube.moves[face]);
      }
    }
    return this;
  }

  parseAlg(arg) {
    if (typeof arg === "string") {
      let alg = arg.split(" ");
      let res = [];
      for (let i = 0; i < alg.length; i++) {
        let x = alg[i];
        if (x.length > 2) {
          return null;
        }
        let move = Cube.faceNums[x[0]];
        let power = 0;
        if (x.length > 1) {
          if (x[1] == "2") {
            power = 1;
          } else if (x[1] == "'") {
            power = 2;
          }
        }
        res.push([move, power]);
      }
      return res;
    } else if (arg.length != null) {
      return arg;
    } else {
      return [arg];
    }
  }

  static moves = [
    //U
    {
      center: [0, 1, 2, 3, 4, 5],
      cp: [UBR, URF, UFL, ULB, DFR, DLF, DBL, DRB],
      co: [0, 0, 0, 0, 0, 0, 0, 0],
      ep: [UB, UR, UF, UL, DR, DF, DL, DB, FR, FL, BL, BR],
      eo: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    },
    //R
    {
      center: [0, 1, 2, 3, 4, 5],
      cp: [DFR, UFL, ULB, URF, DRB, DLF, DBL, UBR],
      co: [2, 0, 0, 1, 1, 0, 0, 2],
      ep: [FR, UF, UL, UB, BR, DF, DL, DB, DR, FL, BL, UR],
      eo: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    },
    //F
    {
      center: [0, 1, 2, 3, 4, 5],
      cp: [UFL, DLF, ULB, UBR, URF, DFR, DBL, DRB],
      co: [1, 2, 0, 0, 2, 1, 0, 0],
      ep: [UR, FL, UL, UB, DR, FR, DL, DB, UF, DF, BL, BR],
      eo: [0, 1, 0, 0, 0, 1, 0, 0, 1, 1, 0, 0],
    },
    //D
    {
      center: [0, 1, 2, 3, 4, 5],
      cp: [URF, UFL, ULB, UBR, DLF, DBL, DRB, DFR],
      co: [0, 0, 0, 0, 0, 0, 0, 0],
      ep: [UR, UF, UL, UB, DF, DL, DB, DR, FR, FL, BL, BR],
      eo: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    },
    //L
    {
      center: [0, 1, 2, 3, 4, 5],
      cp: [URF, ULB, DBL, UBR, DFR, UFL, DLF, DRB],
      co: [0, 1, 2, 0, 0, 2, 1, 0],
      ep: [UR, UF, BL, UB, DR, DF, FL, DB, FR, UL, DL, BR],
      eo: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    },
    //B
    {
      center: [0, 1, 2, 3, 4, 5],
      cp: [URF, UFL, UBR, DRB, DFR, DLF, ULB, DBL],
      co: [0, 0, 1, 2, 0, 0, 2, 1],
      ep: [UR, UF, UL, BR, DR, DF, DL, BL, FR, FL, UB, DB],
      eo: [0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 1, 1],
    },
  ];

  static faceNames = {
    0: "U",
    1: "R",
    2: "F",
    3: "D",
    4: "L",
    5: "B",
    6: "u",
    7: "r",
    8: "f",
    9: "d",
    10: "l",
    11: "b",
  };

  static faceNums = {
    U: 0,
    R: 1,
    F: 2,
    D: 3,
    L: 4,
    B: 5,
    u: 6,
    r: 7,
    f: 8,
    d: 9,
    l: 10,
    b: 11,
  };
}
