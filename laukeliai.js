class Laukeliai extends ParentClass {
  constructor(i, j, width, height, w) {
    super(width, height, w);

    this.i = i;
    this.j = j;
    this.x = i * w;
    this.y = j * w;
    this.neighborCount = 0;

    this.mine = false;
    this.revealed = false; //Pakeitus "true" rodo viska
  }

  // Si dalis reikalinga minu ir skaiciuku padeciu langeliuose nustatymui
  show() {
    stroke(0);
    noFill();
    rect(this.x, this.y, this.w, this.w);
    if (this.revealed) {
      if (this.mine) {
        fill(127); // Minos spalva
        ellipse(this.x + this.w * 0.5, this.y + this.w * 0.5, this.w * 0.5); // Minos padeti laukely
      } else {
        fill(200); // Skaiciuku fono spalvos
        rect(this.x, this.y, this.w, this.w);
        if (this.neighborCount > 0) {
          textAlign(CENTER);
          fill(0);
          text(this.neighborCount, this.x + this.w * 0.5, this.y + this.w - 6); // Skaicius padetis laukely
        }
      }
    }
  }

  countMines(laukeliai) {
    if (this.mine) {
      this.neighborCount = -1;
      return;
    }
    var total = 0;
    for (var xo = -1; xo <= 1; xo++) {
      var i = this.i + xo;
      if (i < 0 || i >= this.cols) continue;

      for (var yo = -1; yo <= 1; yo++) {
        var j = this.j + yo;
        if (j < 0 || j >= this.rows) continue;

        var neighbor = laukeliai[i][j];
        if (neighbor.mine) {
          total++;
        }
      }
    }
    this.neighborCount = total;
  }

  contains(x, y) {
    return (
      x > this.x && x < this.x + this.w && y > this.y && y < this.y + this.w
    );
  }

  reveal(laukeliai) {
    this.revealed = true;
    if (this.neighborCount == 0) {
      // flood fill time
      this.floodFill(laukeliai);
    }
  }

  floodFill(laukeliai) {
    for (var xoff = -1; xoff <= 1; xoff++) {
      var i = this.i + xoff;
      if (i < 0 || i >= this.cols) continue;

      for (var yoff = -1; yoff <= 1; yoff++) {
        var j = this.j + yoff;
        if (j < 0 || j >= this.rows) continue;

        var neighbor = laukeliai[i][j];
        if (!neighbor.revealed) {
          neighbor.reveal(laukeliai);
        }
      }
    }
  }
}
