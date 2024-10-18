class Transform {
    constructor() {
      this.forward = [0, 0, 1];
      this.right = [1, 0, 0];
      this.up = [0, 1, 0];
    }
  
    doRotations(RotAngles) {
      this.xRot = [
        [1, 0, 0, 0],
        [0, Math.cos(RotAngles[0]), -1 * Math.sin(RotAngles[0]), 0],
        [0, Math.sin(RotAngles[0]), Math.cos(RotAngles[0]), 0],
        [0, 0, 0, 1],
      ];
      this.yRot = [
        [Math.cos(RotAngles[1]), 0, Math.sin(RotAngles[1]), 0],
        [0, 1, 0, 0],
        [-1 * Math.sin(RotAngles[1]), 0, Math.cos(RotAngles[1]), 0],
        [0, 0, 0, 1],
      ];
      this.zRot = [
        [Math.cos(RotAngles[2]), -1 * Math.sin(RotAngles[2]), 0, 0],
        [Math.sin(RotAngles[2]), Math.cos(RotAngles[2]), 0, 0],
        [0, 0, 1, 0],
        [0, 0, 0, 1],
      ];
      //this.forward = this.crossMultiply(xRot,[0,0,1,0]);
      this.forward = this.crossMultiply(
        this.zRot,
        this.crossMultiply(this.yRot, this.crossMultiply(this.xRot, [0, 0, 1, 0]))
      );
      this.right = this.crossMultiply(
        this.zRot,
        this.crossMultiply(this.yRot, this.crossMultiply(this.xRot, [1, 0, 0, 0]))
      );
      this.up = this.crossMultiply(
        this.zRot,
        this.crossMultiply(this.yRot, this.crossMultiply(this.xRot, [0, 1, 0, 0]))
      );
    }
    crossMultiply(M, V) {
      //console.log(M[0][3]);
      //console.log(V[3]);
      var temp = [
        M[0][0] * V[0] + M[0][1] * V[1] + M[0][2] * V[2] + M[0][3] * V[3],
        M[1][0] * V[0] + M[1][1] * V[1] + M[1][2] * V[2] + M[1][3] * V[3],
        M[2][0] * V[0] + M[2][1] * V[1] + M[2][2] * V[2] + M[2][3] * V[3],
        M[3][0] * V[0] + M[3][1] * V[1] + M[3][2] * V[2] + M[3][3] * V[3],
      ];
      //console.log(temp);
      return temp;
    }
  }
  