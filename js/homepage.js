const homepageTitles = ["home sweet home","home on the range","home plate","home fries","homer j. simpson","home movies","home of the brave","home alone 2: lost in new york","home court","homestar runner","home improvement","home shopping network","home again by oingo boingo","home for the holidays","home depot","home away from home","homecoming queen","home free","where the heart is","home-run contest","home sweet pineapple","homebrew channel","homeland security","home-osexual"]
const homepageTitle = document.getElementById("homepage-title");
function homePageNameChange(){
    homepageTitle.style.animation = "homechange 0.25s ease 1";
    homepageTitle.innerHTML = homepageTitles[Math.floor(Math.random()*homepageTitles.length)];
    setTimeout(function() {
        homepageTitle.style.animation = "none";
    }, 250);
}