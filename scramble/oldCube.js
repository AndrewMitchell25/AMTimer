class Cube{

    constructor(){
        this.solved = { "U" : [['w', 'w', 'w'], ['w', 'w', 'w'], ['w', 'w', 'w']], 
                        "F" : [['g', 'g', 'g'], ['g', 'g', 'g'], ['g', 'g', 'g']], 
                        "R" : [['r', 'r', 'r'], ['r', 'r', 'r'], ['r', 'r', 'r']], 
                        "B" : [['b', 'b', 'b'], ['b', 'b', 'b'], ['b', 'b', 'b']], 
                        "L" : [['o', 'o', 'o'], ['o', 'o', 'o'], ['o', 'o', 'o']], 
                        "D" : [['y', 'y', 'y'], ['y', 'y', 'y'], ['y', 'y', 'y']]
                      }
        this.state = { "U" : [['w', 'w', 'w'], ['w', 'w', 'w'], ['w', 'w', 'w']], 
                       "F" : [['g', 'g', 'g'], ['g', 'g', 'g'], ['g', 'g', 'g']], 
                       "R" : [['r', 'r', 'r'], ['r', 'r', 'r'], ['r', 'r', 'r']], 
                       "B" : [['b', 'b', 'b'], ['b', 'b', 'b'], ['b', 'b', 'b']], 
                       "L" : [['o', 'o', 'o'], ['o', 'o', 'o'], ['o', 'o', 'o']], 
                       "D" : [['y', 'y', 'y'], ['y', 'y', 'y'], ['y', 'y', 'y']]
                     }
    }

    display() {
        let str = ""
        str += "          +---------+\n"
        for(let i = 0; i < 3; i++){
            str += "          |"
            for(let j = 0; j < 3; j++){
                str += ` ${this.state.U[i][j]} `
            }
            str += "|\n"
        }
        str += "+---------+---------+---------+---------+\n"
        for(let i = 0; i < 3; i++){
            str += "|"
            for(let j = 0; j < 3; j++){
                str += ` ${this.state.L[i][j]} `
            }
            str += "|"
            for(let j = 0; j < 3; j++){
                str += ` ${this.state.F[i][j]} `
            }
            str += "|"
            for(let j = 0; j < 3; j++){
                str += ` ${this.state.R[i][j]} `
            }
            str += "|"
            for(let j = 0; j < 3; j++){
                str += ` ${this.state.B[i][j]} `
            }
            str += "|\n"
        }
        str += "+---------+---------+---------+---------+\n"
        for(let i = 0; i < 3; i++){
            str += "          |"
            for(let j = 0; j < 3; j++){
                str += ` ${this.state.D[i][j]} `
            }
            str += "|\n"
        }
        str += "          +---------+\n"
        console.log(str)
    }

    R(){
        let temp = []
        for(let i = 0; i < 3; i++) {
            temp.push(this.state.U[i][2]) 
        }
        for(let i = 0; i < 3; i++) {
            this.state.U[i][2] = this.state.F[i][2]
        }
        for(let i = 0; i < 3; i++) {
            this.state.F[i][2] = this.state.D[i][2]
        }
        for(let i = 0; i < 3; i++) {
            this.state.D[i][2] = this.state.B[i][2]
        }
        for(let i = 0; i < 3; i++) {
            this.state.B[i][2] = temp[i]
        }
    }

    Ri(){
        let temp = []
        for(let i = 0; i < 3; i++) {
            temp.push(this.state.U[i][2]) 
        }
        for(let i = 0; i < 3; i++) {
            this.state.U[i][2] = this.state.B[i][2]
        }
        for(let i = 0; i < 3; i++) {
            this.state.B[i][2] = this.state.D[i][2]
        }
        for(let i = 0; i < 3; i++) {
            this.state.D[i][2] = this.state.F[i][2]
        }
        for(let i = 0; i < 3; i++) {
            this.state.F[i][2] = temp[i]
        }
    }

}
