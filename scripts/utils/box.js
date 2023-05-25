import { getAllNeighbor, openAllBoxes } from "./matrix.js";

const appElem = document.getElementById("app");

class Box {
  constructor(isBomb, coordinates) {
    this.isBomb = isBomb;
    this.coordinates = coordinates;
  }

  setBoxValuse(value) {
    this.value = value;
  }

  setBoxType() {
    if (this.isBomb) {
      this.setBoxValuse("💣");
      return;
    }
    const allNeighbor = getAllNeighbor(this.coordinates);
    let bombCount = 0;

    allNeighbor.forEach((neighbor) => {
      if (neighbor === 1 || neighbor.isBomb) {
        bombCount++;
      }
    });
    if (bombCount) {
      this.setBoxValuse(bombCount);
    }
  }

  showBoxValue() {
    this.boxElem.innerHTML = this.value || "";
  }

  setFlag(isFlagged) {
    this.isFlagged = isFlagged;
    this.boxElem.innerHTML = "🚩"
  }

  open() {
    this.isOpenned = true;
    this.boxElem.classList.remove("initial");
    this.showBoxValue();
  }

  onBoxClick(allowOpenNumber = false) {
    if (!this.value && !this.isOpenned) {
      this.open();
      const allNeighbor = getAllNeighbor(this.coordinates);
      allNeighbor.forEach((neighbor) => {
        if (!neighbor.isOpenned) {
          neighbor.onBoxClick(true);
        }
      });
    } else if (
      (this.value && allowOpenNumber) ||
      typeof this.value === "number"
    ) {
      this.open();
    } else if (this.isBomb) {
      openAllBoxes();
    }
    this.showBoxValue();
  }

  createBoxOnArea() {
    const boxElem = document.createElement("div");
    boxElem.classList.add("box");
    boxElem.classList.add("initial");

    if (this.value) {
      boxElem.classList.add(`bomb-count-${this.value}`);
    }

    this.boxElem = boxElem;
    this.boxElem.addEventListener("click", () => this.onBoxClick());
    this.boxElem.addEventListener("contextmenu", (e) => {
      e.preventDefault();
      if(!this.isOpenned) {
        this.setFlag(true);
      }   
    });
    appElem.appendChild(boxElem);
  }
}

export function createBox(isBomb, coordinates) {
  const newBox = new Box(isBomb, coordinates);

  newBox.setBoxType();
  newBox.createBoxOnArea();

  return newBox;
}
