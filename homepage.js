let sludgeballs = document.getElementById("switcher")
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
    new Zonelink("music","music","updates on daytona's upcoming albums and EPs, release announcements, and urlfest performances!","/music.html"),
    new Zonelink("bandcamp","bandcamp","stream or download daytona's free underground hyperpop and electronica music on her bandcamp page!","https://daytona.bandcamp.com"),
    new Zonelink("art","art","visit toni's art gallery to see drawings and animations of hers that are either recent or from the archives!","/art.html"),
    new Zonelink("text","text","check out toni's random little thoughts, tiny opinions, miniscule jokes and would-be tweets!","/text.html"),
    new Zonelink("writingprojects","writing","read through toni's longer thoughts, including reviews, essays, ranked lists and more!","/writing-projects.html"),
    new Zonelink("aboutme","about me","wondering about the webmaster herself? check out this collection of fun facts and other information about her!","/about-me.html"),
    new Zonelink("contact","contact","wanna talk to toni about a bug with the website, content suggestions, or a burning question? check here!","/contact.html")
];
let uf1 = document.getElementById("uf1");
let uf2 = document.getElementById("uf2");
let focus = document.getElementById("focus");
let uf3 = document.getElementById("uf3");
let uf4 = document.getElementById("uf4");
let title = document.getElementById("link-title");
let desc = document.getElementById("link-description");

let innards = document.getElementById("focused-innards");
let icons = document.getElementById("icons");

document.addEventListener('keydown', handler);

function handler(e) {
    if (switchable) {
        if (e.keyCode == 38) {
            changeSludgeballs("ui/switch-up.gif");
            focused=focused<=0?6:focused-1;
        } else if (e.keyCode == 40) {
            changeSludgeballs("ui/switch-down.gif");
            focused=focused>=6?0:focused+1;
        } else if (e.keyCode == 13) {
            sfx.sludgeConfirm.play();
        };
    };
}

function changeSludgeballs(src){
    sludgeballs.src=src;
    switchable = false;
    sfx.sludgeSwitch.play();
    innards.style.opacity = 0;
    icons.style.opacity = 0;
    console.log("switchable is false!")
    setTimeout(function() {
        sludgeballs.src="ui/idle.gif";
        switchable = true;
        console.log("switchable is true!");
        innards.style.opacity = 1;
        icons.style.opacity = 1;
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
    uf3.src=`icon/${zonelinks[(focused+1)%7].icon}.png`;
    uf4.src=`icon/${zonelinks[(focused+2)%7].icon}.png`;
    title.innerHTML=zonelinks[focused].title;
    desc.innerHTML=zonelinks[focused].description;
}