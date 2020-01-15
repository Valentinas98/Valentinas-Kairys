import Laukeliai from "./laukeliai";

describe("Laukeliai", () => {
  let Laukeliai;
  beforeEach(() => {
    Laukeliai = new Laukeliai(1, 1, 10, 10, 5);
  });

  describe("Laukeliai", () => {
    it("Check if coordinates found good", () => {
      expect(Laukeliai.contains(1, 1)).toBe(true);
      expect(Laukeliai.contains(2, 2)).toBe(true);
    });
    it("Check if mines count ios good", () => {
      expect(
        Laukeliai.countMines([
          [new Laukeliai(1, 1, 10, 10, 5), new Laukeliai(1, 1, 10, 10, 5)],
          [new Laukeliai(1, 1, 10, 10, 5), new Laukeliai(1, 1, 10, 10, 5)]
        ])
      ).toBe(2);
    });
    it("Check if reveals good cell", () => {
      Laukeliai.reveal([
        [new Laukeliai(1, 1, 10, 10, 5), new Laukeliai(1, 1, 10, 10, 5)],
        [new Laukeliai(1, 1, 10, 10, 5), new Laukeliai(1, 1, 10, 10, 5)]
      ]);
      expect(Laukeliai.reveal).toBe(true);
    });
  });
});
