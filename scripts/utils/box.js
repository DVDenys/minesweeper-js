import { getAllNeighbor } from "./matrix.js";

class Box {
  constructor(isBomb, coordinates) {
    this.isBomb = isBomb;
    this.coordinates = coordinates;
  }

  setBoxValuse(value) {
    this.value = value;
  }

  setBoxType() {
    const all = getAllNeighbor(this.coordinates);
    let bombCount = 0;

    getAllNeighbor.forEach((neighbor) => {
      if (neighbor === 1 || neighbor.isBomb) {
        bombCount++;
      }
    });
    if (bombCount) {
      this.setBoxValuse(bombCount);
    }
  }
}

export function createBox(isBomb, coordinates) {
  const newBox = new Box(isBomb, coordinates);

  newBox.setBoxType();

  return newBox;
}
