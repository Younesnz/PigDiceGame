//DOM settings elements
const btns_risk = document.querySelectorAll(".risk-group button");
const btns_player = document.querySelectorAll(".select_player");
const btn_startGame = document.querySelector(".start_pannel>button");
const pnl_start = document.querySelector(".start_pannel");
const pnl_game = document.querySelector(".game_pannel");
// DOM elements
const dice = document.querySelector(".dice");
const btn_roll = document.querySelector(".btn_roll");
const roll_result = document.querySelector(".roll_result");
const body = document.querySelector("body");

//colors
const color_red = "#f63330";
const color_background_light = "#eee";

//Setting Variables
let difficulty = 0;
let numOfPlayers = 1;

//Game Variables
let rollSum = 0;

//Listeners
for (btn of btns_risk) btn.addEventListener("click", SelectRisk);
for (btn of btns_player) btn.addEventListener("click", SelectNumberOfPlayers);
btn_startGame.addEventListener("click", StartGame);
btn_roll.addEventListener("click", Roll);

//Settings functionality
function SelectRisk(e) {
  e.preventDefault();
  for (btn of btns_risk) {
    if (btn === e.target) difficulty = [...btns_risk].indexOf(btn);
    btn.className = "";
  }
  e.target.className = "selected";
}

function SelectNumberOfPlayers(e) {
  e.preventDefault();
  for (btn of btns_player)
    if (btn === e.target) numOfPlayers = e.target.innerText;
  for (let i = 0; i < 5; i++) {
    if (i < numOfPlayers) btns_player[i].className = "select_player active";
    else btns_player[i].className = "select_player";
  }
  e.target.className += " active";
}

function StartGame(e) {
  e.preventDefault();
  pnl_start.style.opacity = "0";
  pnl_start.style.pointerEvents = "none";
  setTimeout(() => {
    pnl_start.style.display = "none";
    pnl_game.style.display = "flex";
    setTimeout(() => {
      pnl_game.style.opacity = "1";
    }, 100);
  }, 600);
}

//Dice Roll functionality
function Roll(e) {
  e.preventDefault();
  let diceNum = Math.floor(Math.random() * 6) + 1;
  rotateDice(0);
  setTimeout(() => {
    rotateDice(diceNum);
  }, 1000);

  if (diceNum === 1) {
    rollSum = 0;
  } else {
    rollSum += diceNum;
  }
  setTimeout(SetRollResult, 2000);
}

function SetRollResult() {
  roll_result.innerText = rollSum;
  if (rollSum === 0) {
    body.style.background = color_red;
    setTimeout(() => {
      body.style.background = color_background_light;
    }, 300);
  }
}

function rotateDice(toNum) {
  dice.style.scale = "1";
  switch (toNum) {
    case 0:
      let randDegree = Math.floor(Math.random() * 180) + 180;
      dice.style.transform = `rotateX(${randDegree}deg) rotateY(${randDegree}deg)`;
      dice.style.scale = "1.8";
      break;
    case 1:
      dice.style.transform = `rotateX(${0}deg) rotateY(${0}deg)`;
      break;
    case 6:
      dice.style.transform = `rotateX(${180}deg) rotateY(${0}deg)`;
      break;
    case 2:
      dice.style.transform = `rotateX(${-90}deg) rotateY(${0}deg)`;
      break;
    case 5:
      dice.style.transform = `rotateX(${90}deg) rotateY(${0}deg)`;
      break;
    case 3:
      dice.style.transform = `rotateX(${0}deg) rotateY(${90}deg)`;
      break;
    case 4:
      dice.style.transform = `rotateX(${0}deg) rotateY(${-90}deg)`;
      break;
    default:
      break;
  }
}

//Players Model
function Player(name, color) {
  this.name = name;
  this.color = color;
  this.heldScore = 0;
  this.currentScore = 0;
  this.isActive = false;
}
