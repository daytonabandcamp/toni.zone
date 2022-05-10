let sludgeballs = document.getElementById("switcher")
let sfx = {
    sludgeSwitch: document.getElementById("sfxSwitch"),
    sludgeConfirm: document.getElementById("sfxConfirm")
};
let switchAnimInterval = 270;
let switchable = true;

document.addEventListener('keydown', handler);

function handler(e) {
    if (switchable) {
        if (e.keyCode == 38) {
            changeSludgeballs("ui/switch-up.gif");
        } else if (e.keyCode == 40) {
            changeSludgeballs("ui/switch-down.gif");
        } else if (e.keyCode == 13) {
            sfx.sludgeConfirm.play();
        };
    };
}

function changeSludgeballs(src){
    sludgeballs.src=src;
    switchable = false;
    sfx.sludgeSwitch.play();
    console.log("switchable is false!")
    setTimeout(function() {
        sludgeballs.src="ui/idle.gif";
        switchable = true;
        console.log("switchable is true!")
    },switchAnimInterval);
}