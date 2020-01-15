// Behavior patern https://designpatternsgame.com/patterns/template
class ParentClass {
  constructor(width, height, w) {
    if (this.constructor == ParentClass) {
      throw new Error("Abstract classes can't be instantiated.");
    }
    this.cols = floor(width / w);
    this.rows = floor(height / w);
    this.w = w;
  }
}
