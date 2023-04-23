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
const playersProgress = document.querySelector(".players");

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
    InitPlayers();
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
function Player(number, color) {
  this.number = number;
  this.color = color;
  this.heldScore = 0;
  this.currentScore = 0;
  this.isActive = false;
  this.view = this.initView();
}

Player.prototype.initView = function () {
  let player = document.createElement("div");
  let playerInfo = document.createElement("div");
  player.className = "player";
  playerInfo.className = "player_info";
  playerInfo.innerHTML = `<h5>Player${this.number}</h5><p>${this.currentScore}</p>`;
  player.appendChild(playerInfo);

  let progressContainer = document.createElement("div");
  progressContainer.className = "progress progress_container";
  progressContainer.innerHTML =
    '<div class="progress progress_current"></div><div class="progress progress_held"></div>';
  player.appendChild(progressContainer);

  return player;
};

Player.prototype.renderView = function () {
  playersProgress.appendChild(this.view);
  this.view.querySelector("h5").style.color = this.color;
  this.view.querySelector(".progress_current").style.backgroundColor =
    this.color;
};

const players = [];
const colors = ["#663399", "#e32b69", "#287194", "#1a9990", "#b61b43"];
//Game Functionality
function InitPlayers() {
  for (let i = 1; i <= numOfPlayers; i++) {
    let p = new Player(i, colors[i - 1]);
    p.renderView();
  }
}
