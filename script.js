const cells = Array.from(document.querySelectorAll(".cell"));
let pos = true;
let finish = 0; // if finish equal 9 than the result will be draw
let board = [
  [-1, -2, -3],
  [-4, -5, -6],
  [-7, -8, -9],
];

let player1 = 0;
let player2 = 0;

const modal = document.querySelector(".modal-wrapper");
// close the modal
modal.addEventListener("click", function () {
  modal.style.display = "none";
  const modalContent = document.querySelector(".modal-wrapper .modal-content");
  const modalText = document.querySelector(".modal-wrapper .modal-content h1");
  modalContent.removeChild(modalText);
});

// reset game
const reset = document.querySelector(".menu .right");
reset.addEventListener("click", function () {
  player1 = 0;
  player2 = 0;
  const score = document.querySelectorAll(".score h3 span");
  score[0].innerHTML = player1;
  score[1].innerHTML = player2;
});

cells.forEach((cell) => {
  cell.addEventListener("click", function (e) {
    const target = e.target;

    // put x or o into the cell that player clicked
    const bidak = document.createElement("h1");
    bidak.innerHTML = pos ? "X" : "O";
    target.appendChild(bidak);
    pos = pos ? false : true;

    // remove cell class and add fill class for button not be able to hover
    target.classList.add("fill");
    target.classList.remove("cell");

    // make the button disabled
    target.setAttribute("disabled", true);

    const data = target.getAttribute("data-cell");

    // player result
    if (play(data) || finish >= 9) {
      // make all button to be disable
      const disBtn = document.querySelectorAll(".fill");
      disBtn.forEach((element) => {
        element.classList.add("cell");
        element.classList.remove("fill");
        element.removeAttribute("disabled");
        element.removeChild(element.firstChild);
      });

      // show modal button
      modal.style.display = "flex";

      const winer = document.createElement("h1");
      winer.innerHTML =
        finish >= 9 ? "Draw!" : `Player ${pos ? "2" : "1"} win!`;

      document.querySelector(".modal-content").appendChild(winer);

      // the score
      player1 += finish >= 9 ? 1 : pos ? 0 : 1;
      player2 += finish >= 9 ? 1 : pos ? 1 : 0;

      // update score
      const score = document.querySelectorAll(".score h3 span");
      score[0].innerHTML = player1;
      score[1].innerHTML = player2;

      // make all to default
      finish = 0;
      board = [
        [-1, -2, -3],
        [-4, -5, -6],
        [-7, -8, -9],
      ];

      pos = pos ? false : true;
    }
  });
});

const play = (data) => {
  finish += 1;
  board[data[2]][data[0]] = pos ? 2 : 1;

  // horizontal
  if (
    (board[0][0] == board[0][1] && board[0][1] == board[0][2]) ||
    (board[1][0] == board[1][1] && board[1][1] == board[1][2]) ||
    (board[2][0] == board[2][1] && board[2][1] == board[2][2])
  ) {
    return true;
  }

  // vertical
  if (
    (board[0][0] == board[1][0] && board[1][0] == board[2][0]) ||
    (board[0][1] == board[1][1] && board[1][1] == board[2][1]) ||
    (board[0][2] == board[1][2] && board[1][2] == board[2][2])
  ) {
    return true;
  }

  // diagonal
  if (
    (board[0][0] == board[1][1] && board[1][1] == board[2][2]) ||
    (board[0][2] == board[1][1] && board[1][1] == board[2][0])
  ) {
    return true;
  }
};
