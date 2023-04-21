// DOM elements
const dice = document.querySelector(".dice");
const btn_roll = document.querySelector(".btn_roll");
const roll_result = document.querySelector(".roll_result");
const body = document.querySelector('body');

//colors
const color_red = "#f63330";
const color_background_light = "#eee";

//Global Variables
let rollSum = 0;

//Listeners
btn_roll.addEventListener('click',Roll);

//Dice Roll functionality
function Roll(e){
    e.preventDefault();
    let diceNum = Math.floor(Math.random()*6)+1;
    rotateDice(0);
    setTimeout(() => {
        rotateDice(diceNum);
    }, 1000); 

    if(diceNum===1){
        rollSum = 0;
    }else{
        rollSum += diceNum;
    }
    setTimeout(SetRollResult, 2000);
}

function SetRollResult(){
    roll_result.innerText = rollSum;
    if(rollSum === 0){
        body.style.background = color_red;
        setTimeout(() => {
            body.style.background = color_background_light;
        }, 300);
    }
}

function rotateDice(toNum){
    dice.style.scale = '1';
        switch (toNum) {
            case 0:
                let randDegree = Math.floor(Math.random()*180)+180;
                dice.style.transform = `rotateX(${randDegree}deg) rotateY(${randDegree}deg)`;
                dice.style.scale = '1.8';
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
function Player(name,color){
    this.name = name;
    this.color = color;
    this.heldScore = 0;
    this.currentScore = 0;
    this.isActive = false;
}