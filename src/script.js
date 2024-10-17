const sound = new Audio('http://127.0.0.1:5500/sounds/parry.mp3');
const startBtn = document.getElementById('start');
const resetBtn = document.getElementById('reset');
const pauseBtn = document.getElementById('pause');
const session = document.querySelector('.minutes');
const minuteDiv = document.querySelector('.minutes');
const secondDiv = document.querySelector('.seconds');
let sessionAmount = Number.parseInt(session.textContent);
let myInterval; 
let state = true;
let paused = false;
let rest = false; let count = 1 //rest time interval
let totalSeconds = sessionAmount * 60;

const updateSeconds = () => {
    totalSeconds--;

    let minuteLeft = Math.floor(totalSeconds/60);
    let secondsLeft = totalSeconds % 60;

    if(secondsLeft < 10) {
        secondDiv.textContent = `0${secondsLeft}`;
    } else {
        secondDiv.textContent = secondsLeft;
    }
    minuteDiv.textContent = `${minuteLeft}`;

    if(minuteLeft === 0 && secondsLeft === 0) {
        sound.play();
        clearInterval(myInterval);
        count++;
        count % 2 === 0 ? rest = true : rest = false;
        resetTimer();

    } 
}

const appTimer = () => {
    
    if(state) {
        state = false;
        sound.play();

        myInterval = setInterval(updateSeconds, 1000);
    } else {
        alert('Session already started.')
    }
}

const resetTimer = () => {
    pauseBtn.textContent = "pause"
    clearInterval(myInterval);
    state = true;
    paused = false;

    if(!rest){
        minuteDiv.textContent = "25";
        secondDiv.textContent = "00";
    } else if (rest && count % 6 === 0){
        minuteDiv.textContent = "30";
        secondDiv.textContent = "00";
    } else {
        minuteDiv.textContent = "5";
        secondDiv.textContent = "00";
    }

    sessionAmount = Number.parseInt(minuteDiv.textContent);
    totalSeconds = sessionAmount * 60;
    
}

const pauseTimer = () => {
    
    if(!state) {
        if(!paused){
            clearInterval(myInterval);
            pauseBtn.innerText = "resume";
            paused = true;
        } else {
            pauseBtn.innerText = "pause";
            paused = false;
            myInterval = setInterval(updateSeconds, 1000);
        }
    } else {
        alert("You must start the timer first");
    }
    
}

startBtn.addEventListener("click", appTimer);
resetBtn.addEventListener("click", resetTimer);
pauseBtn.addEventListener("click", pauseTimer)
