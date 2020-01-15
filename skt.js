class Grid extends ParentClass {
  constructor(width, height, w, totalMines) {
    super(width, height, w);
    this.totalMines = totalMines;
    this.Laukeliai = this.make2DArray();

    // Creational patern https://designpatternsgame.com/patterns/singleton singletone
    if (typeof Grid.instance === "object") {
      return Grid.instance;
    }

    Grid.instance = this;

    return this;
    // -------------------------------------------------------------------
  }

  make2DArray() {
    var arr = new Array(this.cols);
    for (var i = 0; i < arr.length; i++) {
      arr[i] = new Array(this.rows);
    }
    return arr;
  }
  draw() {
    for (var i = 0; i < grid.cols; i++) {
      for (var j = 0; j < grid.rows; j++) {
        this.Laukeliai[i][j].show();
      }
    }
  }
}

let gird;

function setup() {
  createCanvas(401, 401); // Reikia +1, praplatina galine ir apatine linija vienu pikseliu
  grid = new Grid(width, height, 20, 30);

  for (var i = 0; i < grid.cols; i++) {
    for (var j = 0; j < grid.rows; j++) {
      grid.Laukeliai[i][j] = new Laukeliai(i, j, width, height, 20); // SKirta numeriu skaiciavimui langeliuose
    }
  }

  var options = [];
  for (var i = 0; i < grid.cols; i++) {
    for (var j = 0; j < grid.rows; j++) {
      options.push([i, j]);
    }
  }

  for (var n = 0; n < grid.totalMines; n++) {
    var index = floor(random(options.length));
    var choice = options[index];
    var i = choice[0];
    var j = choice[1];
    options.splice(index, 1);
    grid.Laukeliai[i][j].mine = true;
  }

  for (var i = 0; i < grid.cols; i++) {
    for (var j = 0; j < grid.rows; j++) {
      grid.Laukeliai[i][j].countMines(grid.Laukeliai);
    }
  }
}

function gameOver() {
  for (var i = 0; i < grid.cols; i++) {
    for (var j = 0; j < grid.rows; j++) {
      grid.Laukeliai[i][j].revealed = true;
    }
  }
}

function mousePressed() {
  for (var i = 0; i < grid.cols; i++) {
    for (var j = 0; j < grid.rows; j++) {
      if (grid.Laukeliai[i][j].contains(mouseX, mouseY)) {
        grid.Laukeliai[i][j].reveal(grid.Laukeliai);

        if (grid.Laukeliai[i][j].mine) {
          gameOver();
        }
      }
    }
  }
}

function draw() {
  background(255);
  grid.draw();
}
