let lennymidi = new Audio("top10lennyappearances/lenny.mp3");
async function getQuotes(){
    const res = await fetch("top10lennyappearances/quotes.json");
    return res.json();
}
getQuotes().then(data => {
    document.getElementById("splash").innerHTML=data[Math.floor(Math.random()*data.length)];
});
function playMidi() {
    lennymidi.play();
}
document.getElementById("lenny").addEventListener("mouseover",function(){
    document.getElementById("lenny").src="img/lenny/lenny2.png"
})
document.getElementById("lenny").addEventListener("mouseout",function(){
    document.getElementById("lenny").src="img/lenny/leonard.png"
})