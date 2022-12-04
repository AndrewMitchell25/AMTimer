class Cube:
    
    def __init__(self):
        self.solved = [[['w', 'w', 'w'], ['w', 'w', 'w'], ['w', 'w', 'w']], 
                       [['g', 'g', 'g'], ['g', 'g', 'g'], ['g', 'g', 'g']], 
                       [['r', 'r', 'r'], ['r', 'r', 'r'], ['r', 'r', 'r']], 
                       [['b', 'b', 'b'], ['b', 'b', 'b'], ['b', 'b', 'b']], 
                       [['o', 'o', 'o'], ['o', 'o', 'o'], ['o', 'o', 'o']], 
                       [['y', 'y', 'y'], ['y', 'y', 'y'], ['y', 'y', 'y']]
                      ]

        self.state = [[['w', 'w', 'w'], ['w', 'w', 'w'], ['w', 'w', 'w']], 
                      [['g', 'g', 'g'], ['g', 'g', 'g'], ['g', 'g', 'g']], 
                      [['r', 'r', 'r'], ['r', 'r', 'r'], ['r', 'r', 'r']], 
                      [['b', 'b', 'b'], ['b', 'b', 'b'], ['b', 'b', 'b']], 
                      [['o', 'o', 'o'], ['o', 'o', 'o'], ['o', 'o', 'o']], 
                      [['y', 'y', 'y'], ['y', 'y', 'y'], ['y', 'y', 'y']]
                     ]


    def R(self):
        temp = [self.state[0][0][2], self.state[0][1][2], self.state[0][2][2]]
        for i in range(3):
            self.state[0][i][2] = self.state[1][i][2]
        for i in range(3):
            self.state[1][i][2] = self.state[5][i][2]
        for i in range(3):
            self.state[5][i][2] = self.state[3][i][2]
        for i in range(3):
            self.state[3][i][2] = temp[i]

        temp = [self.state[2][0][0], self.state[2][0][1]]
        self.state[2][0][0], self.state[2][0][1] = self.state[2][2][0], self.state[2][1][0]
        self.state[2][2][0], self.state[2][1][0] = self.state[2][2][2], self.state[2][2][1]
        self.state[2][2][2], self.state[2][2][1] = self.state[2][0][2], self.state[2][1][2]
        self.state[2][0][2], self.state[2][1][2] = temp

    def Rp(self):
        temp = [self.state[0][0][2], self.state[0][1][2], self.state[0][2][2]]
        for i in range(3):
            self.state[0][i][2] = self.state[3][i][2]
        for i in range(3):
            self.state[3][i][2] = self.state[5][i][2]
        for i in range(3):
            self.state[5][i][2] = self.state[1][i][2]
        for i in range(3):
            self.state[1][i][2] = temp[i]

        temp = [self.state[2][0][0], self.state[2][0][1]]
        self.state[2][0][0], self.state[2][0][1] = self.state[2][0][2], self.state[2][1][2]
        self.state[2][0][2], self.state[2][1][2] = self.state[2][2][2], self.state[2][2][1]
        self.state[2][2][2], self.state[2][2][1] = self.state[2][2][0], self.state[2][1][0]
        self.state[2][2][0], self.state[2][1][0] = temp

    def L(self):
        temp = [self.state[0][0][0], self.state[0][1][0], self.state[0][2][0]]
        for i in range(3):
            self.state[0][i][0] = self.state[3][i][0]
        for i in range(3):
            self.state[3][i][0] = self.state[5][i][0]
        for i in range(3):
            self.state[5][i][0] = self.state[1][i][0]
        for i in range(3):
            self.state[1][i][0] = temp[i]

        temp = [self.state[4][0][0], self.state[4][0][1]]
        self.state[4][0][0], self.state[4][0][1] = self.state[4][2][0], self.state[4][1][0]
        self.state[4][2][0], self.state[4][1][0] = self.state[4][2][2], self.state[4][2][1]
        self.state[4][2][2], self.state[4][2][1] = self.state[4][0][2], self.state[4][1][2]
        self.state[4][0][2], self.state[4][1][2] = temp

    def Lp(self):
        temp = [self.state[0][0][0], self.state[0][1][0], self.state[0][2][0]]
        for i in range(3):
            self.state[0][i][0] = self.state[1][i][0]
        for i in range(3):
            self.state[1][i][0] = self.state[5][i][0]
        for i in range(3):
            self.state[5][i][0] = self.state[3][i][0]
        for i in range(3):
            self.state[3][i][0] = temp[i]

        temp = [self.state[4][0][0], self.state[4][0][1]]
        self.state[4][0][0], self.state[4][0][1] = self.state[4][0][2], self.state[4][1][2]
        self.state[4][0][2], self.state[4][1][2] = self.state[4][2][2], self.state[4][2][1]
        self.state[4][2][2], self.state[4][2][1] = self.state[4][2][0], self.state[4][1][0]
        self.state[4][2][0], self.state[4][1][0] = temp

def main():
    cube = Cube()
    cube.L()
    print(cube.state)

if __name__ == '__main__':
    main()
