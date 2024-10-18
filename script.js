let boxes = document.querySelectorAll('.box');
let resetBtn  = document.querySelector('#reset-btn');
let newGameBtn  = document.querySelector('#new-btn');
let msg = document.querySelector('.msg');
let msgContainer = document.querySelector('.msg-container');

const winPatterns = [
    [0,1,2],
    [0,3,6],
    [0,4,8],
    [1,4,7],
    [2,5,8],
    [2,4,6],
    [3,4,5],
    [6,7,8]
];
let turn0 = true; //playerX, player0

const resetGame  = () => {
    turn0 = true;
    enableBoxes();
    msgContainer.classList.add('hide');
    resetBtn.disabled = false;

}

const enableBoxes = () => {
    for(let box of boxes) {
        box.disabled = false;
        box.innerText = "";
    }
}

const disableBoxes = () => {
    for(let box of boxes) {
        box.disabled = true;
    }

}
// Random color ()
const getRandomColor = () =>  {
    const letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  }

boxes.forEach((box) => {
    box.addEventListener("click", () => {
        if(turn0) {
            box.style.color = getRandomColor();
            box.innerText = "0";
            turn0 = false;
        } else {
            box.innerText = "X";
            box.style.color = getRandomColor();
            turn0 = true;
        }
        box.disabled = true;
        checkWinner();
    });
});

const checkWinner = () => {
    for(let pattern of winPatterns) {
        let pos1Val = boxes[pattern[0]].innerText;
        let pos2Val = boxes[pattern[1]].innerText;
        let pos3Val = boxes[pattern[2]].innerText;

        if(pos1Val != "" && pos2Val != "" && pos3Val != "") {
            if(pos1Val === pos2Val && pos2Val === pos3Val ) {
                showWinner(pos1Val);
            }
        }
    }
}

const showWinner = (winner) => {
    disableBoxes();
    msg.innerText = `Congratulation, winner is ${winner}`;
    msgContainer.classList.remove('hide');
    resetBtn.disabled = true;

}

newGameBtn.addEventListener("click", resetGame);
resetBtn.addEventListener("click", resetGame);

