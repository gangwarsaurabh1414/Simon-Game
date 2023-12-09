const h2 = document.querySelector('h2')
const span = document.querySelector('.score-span');


let gameSeq = [];
let userSeq = [];
let btns = ["btn1", "btn2", "btn3", "btn4"];

let started = false;
let level = 0;
let highestScore = 0;

document.addEventListener('keypress', function () {
    if (started == false) {
        started = true;
        // console.log("game started");
        levelUp();
    }
})
document.addEventListener('click', function () {
    if (started == false) {
        started = true;
        // console.log("game started");
        levelUp();
    }
})

function gameFlash(btn) {
    btn.classList.add("flash")
    setTimeout(function () {
        btn.classList.remove("flash");
    }, 100);
}
function userFlash(btn) {
    btn.classList.add("green")
    setTimeout(function () {
        btn.classList.remove("green");
    }, 100);
}
function levelUp() {
    userSeq = [];

    level++;
    h2.innerText = `Level : ${level}`;

    //random button choose
    let random = Math.floor(Math.random() * 4);
    let randomButton = btns[random];
    let randomBtn = document.querySelector(`.${randomButton}`);
    // console.log(randomCol);
    // console.log(random);
    // console.log(randomBtn);
    gameSeq.push(randomButton);
    console.log(gameSeq);
    gameFlash(randomBtn);
}

function checkAns(idx) {
    // console.log("curr level = ", level);
    // let idx = level - 1;
    if (userSeq[idx] === gameSeq[idx]) {
        if (userSeq.length == gameSeq.length) {
            setTimeout(levelUp, 500)
            // levelUp();
        }
    } else {
        h2.innerHTML = `Game Over! your score was <b>${level}</b><br/>Press any key to restart`

        document.querySelector('body').style.backgroundColor = "red"
        setTimeout(function () {
            document.querySelector('body').style.backgroundColor = "white"

        }, 200);
        reset();
    }
}

function btnPress() {
    // console.log(this);
    let btn = this;
    userFlash(btn);

    userColor = btn.getAttribute("id");
    userSeq.push(userColor);
    checkAns(userSeq.length - 1);
}
const buttons = document.querySelectorAll('button')
for (const btn of buttons) {
    btn.addEventListener('click', btnPress);

}

function reset() {
    started = false;
    userSeq = []
    gameSeq = []
    if (level >= highestScore) {
        highestScore = level;
        span.innerText = `Previous Highest Score : ${highestScore}`
    }
    level = 0;
}