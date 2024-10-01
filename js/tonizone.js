let splashes=['Trans rights!','Professionals have standards.','Trans rights are human rights!','Modern websites don\'t have to suck!','Too bi for the naked eye!','Twitter is unnecessary!','Time is a construct!',"I should've stayed in the boat!",'My child is fine!',"What's the significance of Mr. Bean?","sus","Why would I make a carrd now?","Spunch bop took 40 benadryls!","All hail the dark lord of the twin moons!","You chose money, not my love!","Stay hydrated!","Eat healthy and often!","Get 8 hours of sleep!","Take care of yourself!","I wanna merge without looking!","Give us the cum!","Free Palestine!","Black lives matter!","Indev!","sqrt(-1) love you!","YouTube, do better!","Testificates!","Witty comment!","Check back on Christmas!","Check back on Halloween!","I did a really, really, really good job formatting this speech bubble, didn't I?","See you around, Tony Hawk Underground!","Clean your room!","No strong feelings on taxes!","There's no Cars 2!","I'll be in a guy-mono!","Stupid Nintendo games!","FlingSmash!","It's a fuckin' sponge!","No matter how good I am at design, I'll never be proud!","Billie Joe Armstrong!","Moe is here. Here is Moe.","THIS IS AWESOME ALEXA PLAY TARZAN BOY BY BALTIMORA","BOW-WOW-YO-YIPPEE-YO, HERE WE GO!!!","I need to look in the guidebook for a hotel!","Get your product phat!","by october 2023!","anger! mayhem! chaos! piss!","it go!","and the tijuana brass!","the benefit of the doubt!","whatever happened to my transylvania twist?","what da dog doin?","i don't hate taylor swift!","i want to know if i can live with what i know, and only that!","straight from the oven!","d'ya want a choccy biccy, luuuuv?","this shit ain't nothin' to me, man!",`<span style="font-size: 28px;">go big or go home!</span>`,"not cringe or ohio at all!","where the skies are not cloudy all day!","i guess we doin toni.zone now!","not s&p approved!","let me get my shoes!","stand with animation!","full of country goodness and green pea-ness!","exit stage left!","it's never lupus!","they're trying to build a prison!","gouging expletives into vehicles with an unlocking tool!","a series of tubes!","spring break cancun!","i write splashes so you don't have to!","you should own toys! they're fun!","the eight winds cannot move me!","i failed the maths test! i got an f!","everybody do the wenis! the wenis is a dance!","ceci n'est pas une site internet!","monkeys spinning monkeys!","obamna!","all that glitters is not gold!","cool laser meeces!","i'm here to make 15 cents come true!","squeeze me! i squeak! (turn your phone to landscape!)","best viewed on desktop!","mason jars of sweetness!","it's not a &nbsp;<span style=\"font-size: 20px\">too</span>mah!","you want a blade? i'll show you a blade!","they shall sample my blade!",'&lt;div id="splash" class="splash"&gt;&lt;/div&gt;!','<span style="font-size: 28px">☭!</span>',"take it back now, y'all!",'mc-199804?',"i respectfully disagree with people who don't want to vote!","more than -1 sold!","such a valiant desire!","where having smarts is more important than being pretty!","6.3% lua!","the best thing since status.cafe!","i was jekyll jekyll hyde jekyll hyde hyde jekyll!","smarter than the average bear!","it's cold and it's fresh and it's all homemade!","we'll have halloween on christmas!"]

splash.innerHTML = splashes[Math.floor(Math.random()*splashes.length)];
let now = new Date(Date.now());
let months = ["jan","feb","mar","apr","may","jun","jul","aug","sep","oct","nov","dec"];
let days = ["sunday","monday","tuesday","wednesday","thursday","friday","saturday"];
let squeaky = document.getElementById('squeaky')
let squeaks = 0;
let buttonsShow = document.getElementById('buttons-show');
let buttonsList = document.getElementById('buttons-list');
let buttonsShown = false;
let mobileClock = document.getElementById('mobile-clock');

let uiSounds = [
    new Audio("/sfx/ui01.mp3"),
    new Audio("/sfx/ui02.mp3"),
    new Audio("/sfx/ui03.mp3"),
    new Audio("/sfx/ui04.mp3"),
]
let squeakSound;

// number to string, pluginized from http://stackoverflow.com/questions/5529934/javascript-numbers-to-words

window.num2str = function (num) {
    return window.num2str.convert(num);
}

window.num2str.ones=['','one','two','three','four','five','six','seven','eight','nine'];
window.num2str.tens=['','','twenty','thirty','forty','fifty','sixty','seventy','eighty','ninety'];
window.num2str.teens=['ten','eleven','twelve','thirteen','fourteen','fifteen','sixteen','seventeen','eighteen','nineteen'];


window.num2str.convert_millions = function(num) {
    if (num >= 1000000) {
        return this.convert_millions(Math.floor(num / 1000000)) + " million " + this.convert_thousands(num % 1000000);
    }
    else {
        return this.convert_thousands(num);
    }
}

window.num2str.convert_thousands = function(num) {
    if (num >= 1000) {
        return this.convert_hundreds(Math.floor(num / 1000)) + " thousand " + this.convert_hundreds(num % 1000);
    }
    else {
        return this.convert_hundreds(num);
    }
}

window.num2str.convert_hundreds = function(num) {
    if (num > 99) {
        return this.ones[Math.floor(num / 100)] + " hundred " + this.convert_tens(num % 100);
    }
    else {
        return this.convert_tens(num);
    }
}

window.num2str.convert_tens = function(num) {
    if (num < 10) return this.ones[num];
    else if (num >= 10 && num < 20) return this.teens[num - 10];
    else {
        return this.tens[Math.floor(num / 10)] + " " + this.ones[num % 10];
    }
}

window.num2str.convert = function(num) {
    if (num == 0) return "zero";
    else return this.convert_millions(num);
}

function showButtons() {
    buttonsShown = !buttonsShown;
    buttonsShow.innerHTML=`${buttonsShown?"▴":"▾"} show all buttons`
    buttonsList.style.display = buttonsList.style.display=='flex'?'none':'flex';
}

function squeak(){
    //shoutout to @prid on sciter.com you are a legend
    if (squeaks < 1) {
        squeakSound = new Audio("/sfx/squeak.mp3");
        squeakSound.load();
        squeakSound.preload = 'auto';
    }
    if(squeaky.style.animationName == "bounce1"){
        squeaky.style.animation = "bounce2 0.5s ease 1";
    } else {
        squeaky.style.animation = "bounce1 0.5s ease 1";
    }
    squeaks++;
    splash.innerHTML = window.num2str.convert(squeaks).trim() + "!";
    if (squeaks > 99 && document.getElementById("logo-img").src != "/img/toni-dizzy.gif") {
        document.getElementById("logo-img").src = "/img/toni-dizzy.gif"
        squeakSound = new Audio("/sfx/squeak-tired.mp3");
    }
    const origAudio = squeakSound;
    const newAudio = origAudio.cloneNode();
    newAudio.play();
}
squeaky.addEventListener("click", function() {
    squeak();
});

squeaky.addEventListener("keydown", function(e) {
    if (e.key === "Enter") {
        squeak();
    }
});

ui01.addEventListener("mouseover", (e) => {
    uiSounds[0].currentTime = 0;
    uiSounds[0].play();
})

ui02.addEventListener("mouseover", (e) => {
    uiSounds[1].currentTime = 0;
    uiSounds[1].play();
})

ui03.addEventListener("mouseover", (e) => {
    uiSounds[2].currentTime = 0;
    uiSounds[2].play();
})

ui04.addEventListener("mouseover", (e) => {
    uiSounds[3].currentTime = 0;
    uiSounds[3].play();
})

function getCurrentTime(now) {
    return `${now.getHours()%12==0?12:now.getHours()%12}:${now.getMinutes().toString().padStart(2,"0")}${now.getHours()>11?"pm":"am"} &nbsp;&nbsp;•&nbsp;&nbsp; ${days[now.getDay()]}, ${months[now.getMonth()]}. ${now.getDate()}`
}
function updateDate(){
    dateNow = new Date(Date.now())
    now = getCurrentTime(dateNow)
    clock.innerHTML = now;
    mobileClock.innerHTML = now;
}

updateDate();
var clockIntervalId = setInterval(updateDate, 1000)
setTimeout(()=>{
    if (document.getElementById("mobile-statuscafe").innerHTML == 'loading...<br><small>powered by <a href="https://status.cafe">status.cafe</a></small>') {
        document.getElementById("mobile-statuscafe").innerHTML = document.getElementById("statuscafe").innerHTML;
    }
},1000);

var search = document.getElementById("gay_search");
search.addEventListener("keydown", (event) => {
    if (event.code == "Enter") {
        window.location.href=`/search.html?q=${document.getElementById('gay_search').value}`;
    }
})

var mobileSearch = document.getElementById("mobile_search");
mobileSearch.addEventListener("keydown", (event) => {
    if (event.code == "Enter") {
        window.location.href=`/search.html?q=${document.getElementById('mobile_search').value}`;
    }
})