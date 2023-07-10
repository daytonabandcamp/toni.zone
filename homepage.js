console.log("Woah, hey! Didn't expect you to show up to my humble suspiciously-javascript-console-shaped abode. Well, now that you're here, try not to touch anything. At least try not to touch anything important.");
console.log("-Toni");

let sludgeballs = document.getElementById("switcher");
sludgeballs.src="ui/idle.gif";
let sfx = {
    sludgeSwitch: document.getElementById("sfxSwitch"),
    sludgeConfirm: document.getElementById("sfxConfirm")
};
let switchAnimInterval = 270;
let switchable = true;
let focused = 0;
class Zonelink {
    constructor(icon,title,description,url){
        this.icon = icon;
        this.title = title;
        this.description = description;
        this.url = url;
    }
}
let zonelinks = [
    new Zonelink("music","music","updates on daytona's upcoming albums and EPs, release announcements, and urlfest performances!","/blogs/music/"),
    new Zonelink("bandcamp","bandcamp","stream or download daytona's free underground electronica music on her bandcamp page!","https://daytona.bandcamp.com"),
    new Zonelink("art","art","visit toni's art gallery to see drawings and animations of hers that are either recent or from the archives!","/blogs/art/"),
    new Zonelink("text","text","check out toni's random little thoughts, tiny opinions, miniscule jokes and would-be tweets!","/blogs/text/"),
    new Zonelink("writingprojects","writing","read through toni's longer thoughts, including reviews, essays, ranked lists and more!","/blogs/writing/"),
    new Zonelink("aboutme","about me","wondering about the webmaster herself? check out this collection of fun facts and other information about her!","/blogs/aboutme/"),
    new Zonelink("contact","contact","wanna talk to toni about a bug with the website, content suggestions, or a burning question? check here!","/blogs/contact/")
];
let uf1 = document.getElementById("uf1");
let uf2 = document.getElementById("uf2");
let focus = document.getElementById("focus");
let mobileUp = document.getElementById("mobile-up");
let mobileDown = document.getElementById("mobile-down");
let mobileIcon = document.getElementById("mobile-icon");
let mobileCategory = document.getElementById("mobile-category");
let uf3 = document.getElementById("uf3");
let uf4 = document.getElementById("uf4");
let title = document.getElementById("link-title");
let desc = document.getElementById("link-description");

let innards = document.getElementById("focused-innards");
let icons = document.getElementById("icons");

let portrait = window.matchMedia("(orientation: portrait)");
let orientationWarning = document.getElementById("warning");

document.addEventListener('keydown', handler);

document.addEventListener( 'visibilitychange' , function() {
    if (!document.hidden) {
        location.reload();
    }
}, false );

portrait.addEventListener("change", function(e) {
    if (e.matches) {
        orientationWarning.style.display = "none";
        console.log("portrait!");
    } else {
        if (window.innerWidth < 600 || window.innerHeight < 600) {
            orientationWarning.style.display = "flex";
        }
        console.log("landscape!");
    }
});

function handler(e) {
    if (switchable) {
        if (e.keyCode == 38) {
            switchUp(false);
        } else if (e.keyCode == 40) {
            switchDown(false);
        } else if (e.keyCode == 13) {
            sfx.sludgeConfirm.play();
            setTimeout(function() { window.location.href = zonelinks[focused].url },376);
        };
    };
}

function switchUp(mobile) {
    changeSludgeballs("ui/switch-up.gif");
    focused=focused<=0?6:focused-1;
    mobileUpAnim();
}

function switchDown(mobile) {
    changeSludgeballs("ui/switch-down.gif");
    focused=focused>=6?0:focused+1;
    mobileDownAnim();
}

function mobileUpAnim() {
    mobileUp.src = "ui/up/click.gif"+"?a="+Math.random();
    setTimeout(function() {
        mobileUp.src = "ui/up/idle.gif"+"?a="+Math.random();
    },300);
}

function mobileDownAnim() {
    mobileDown.src = "ui/down/click.gif";
    setTimeout(function() {
        mobileDown.src = "ui/down/idle.gif"+"?a="+Math.random();
    },300);
}

function changeSludgeballs(src){
    console.log("cool");
    sludgeballs.src=src;
    switchable = false;
    sfx.sludgeSwitch.play();
    innards.style.opacity = 0;
    icons.style.opacity = 0;
    mobileIcon.style.opacity = 0;
    mobileCategory.style.opacity = 0;
    innards.classList.remove("idle-innards");
    uf1.classList.remove("idle-uf1");
    uf2.classList.remove("idle-uf2");
    focus.classList.remove("idle-focus");
    uf3.classList.remove("idle-uf3");
    uf4.classList.remove("idle-uf4");
    setTimeout(function() {
        sludgeballs.src="ui/idle.gif";
        switchable = true;
        innards.style.opacity = 1;
        icons.style.opacity = 1;
        mobileIcon.style.opacity = 1;
        mobileCategory.style.opacity = 1;
        resetLinkStuff();
    },switchAnimInterval);
}

function resetLinkStuff(){
    if (focused<2){
        uf1.src=`icon/${zonelinks[(focused-2+7)%7].icon}.png`;
        uf2.src=`icon/${zonelinks[(focused-1+7)%7].icon}.png`;
    } else {
        uf1.src=`icon/${zonelinks[(focused-2)%7].icon}.png`;
        uf2.src=`icon/${zonelinks[(focused-1)%7].icon}.png`;
    }
    focus.src=`icon/${zonelinks[(focused)%7].icon}.png`;
    mobileIcon.src=`icon/${zonelinks[(focused)%7].icon}.png`;
    uf3.src=`icon/${zonelinks[(focused+1)%7].icon}.png`;
    uf4.src=`icon/${zonelinks[(focused+2)%7].icon}.png`;
    innards.classList.add("idle-innards")
    uf1.classList.add("idle-uf1")
    uf2.classList.add("idle-uf2")
    focus.classList.add("idle-focus");
    uf3.classList.add("idle-uf3")
    uf4.classList.add("idle-uf4")
    title.innerHTML=`<a style="color: white" href="${zonelinks[focused].url}">${zonelinks[focused].title}</a>`;
    desc.innerHTML=zonelinks[focused].description;
    mobileCategory.innerHTML=`<a style="color: white" href="${zonelinks[focused].url}">${zonelinks[focused].title}</a>`;
}

let _time = document.getElementById("time");
let _meridiem = document.getElementById("meridiem");
let _date = document.getElementById("date");
let _timezone = document.getElementById("timezone");
_timezone.innerHTML = Intl.DateTimeFormat().resolvedOptions().timeZone
    .replace("Europe/","")
    .replace("Asia/","")
    .replace("Antarctica/","")
    .replace("Pacific/","")
    .replace("America/","")
    .replace("Indian/","")
    .replace("Africa/","")
    .replace("Australia/","")
    .replace("Atlantic/","");

function startTime() {
    const today = new Date();
    let y = today.getFullYear();
    let n = today.getMonth();
    let d = today.getDate();
    let h = today.getHours()>12?today.getHours()%12:today.getHours();
    if (today.getHours() == 0 ){
        h = 12;
    }
    let m = today.getMinutes();
    let s = today.getSeconds();
    _time.innerHTML = `${h}:${checkTime(m)}:${checkTime(s)}`;
    _meridiem.innerHTML = `${today.getHours()>11?"PM":"AM"}`;
    _date.innerHTML = `${checkTime(n+1)}-${checkTime(d)}-${y}`;
    setTimeout(startTime,1000);
}

function checkTime(i) {
    if (i<10) {i = "0" + i}; // add zero in front of numbers < 10
    return i;
}