let sfx = {
    stepReveal: new Audio("/sfx/step-reveal.mp3"),
    fullReveal: new Audio("/sfx/step-reveal-2.mp3")
};
let stepOne = document.getElementById("findThePassword");
let gamePassword404 = document.getElementById("gamePassword404");
let arithmetic = document.getElementById("arithmetic");
let gameComboLock = document.getElementById("gameComboLock");
let setTheClock = document.getElementById("setTheClock");
let license = document.getElementById("license");
let logoImg = document.getElementById("logo-img");
let finalStep = document.getElementById("finalStep");
let time;
let step = 0;

function stepOne404(){
    if (step == 0) {
        stepOne.style.display = "block"; //obsolete
        step++;
        sfx.stepReveal.play();
        license.innerHTML = 'This work is aneaxqfq under a creative commons <a href="https://creativecommons.org/licenses/by/4.0/deed.en">CC BY 4.0</a> license. | <a href="#">privacy policy';
    }
}
function stepTwo404() {
    if (gamePassword404.value.trim() == "obsolete" && step == 1) {
        arithmetic.style.display = "block"; //807
        logoImg.src="/img/toni-arithmetic.png";
        sfx.stepReveal.play();
        step++;
    }
}
function stepThree404() {
    if (gameComboLock.value == 807 && step == 2) {
        setTheClock.style.display = "block"; //4:04
        clearInterval(clockIntervalId);
        sfx.stepReveal.play();
        time = clock.innerHTML.split(" &nbsp;&nbsp;•&nbsp;&nbsp; ")[0];
        console.log(time);
        step++;
    }
    if (clock.innerHTML.substring(0,4) == "4:04"){
        setTimeout(checkClock,1500);
    }
}
function setHour() {
    hour = parseInt(clock.innerHTML.split(":")[0]);
    if (hour < 12) {
        hour++;
    } else {
        hour = 1;
    }
    clock.innerHTML = hour.toString() +":"+ clock.innerHTML.split(":")[1];
    checkClock();
}
function setMinute() {
    let clockSplit = clock.innerHTML.split(":");
    clockSplit.forEach((str) => {console.log(str);});
    minute = parseInt(clock.innerHTML.split(":")[1].substring(0,2));
    if (minute < 59) {
        minute++;
    } else {
        minute = 1;
    }
    clockSplit.forEach((str) => {console.log(str);});
    clock.innerHTML = clockSplit[0] + ":" + minute.toString().padStart(2,'0') + clockSplit[1].substring(2,999);
    checkClock();
}
function checkClock() {
    if (clock.innerHTML.substring(0,4) == "4:04" && step == 3){
        finalStep.style.display = "block";
        sfx.fullReveal.play();
        step++;
    }
}