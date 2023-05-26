import { createMatrix } from "./utils/matrix.js";

const newGame = document.querySelector("#new-game");
newGame.addEventListener('click', () => {
  location.reload()
})

function startGame() {
  createMatrix();
}
startGame();
