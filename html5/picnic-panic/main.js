/*
	this code is awful. there are some gems; some lovely little angelic functions that do what they're told with only reasonable verbosity... and then there are some horrific monstrosity functions that have to do with UI, the mouse, and loading things. 95% of the code here is either loading shit or performing extremely convoluted, drawn-out AABB checks on UI elements that may or may not exist in the context of the game. the most horrible part is that it's all in one file. if the basic comments separating it weren't there, i wouldn't have been able to navigate the codebase whatsoever.
	
	- load things simply using strings and foreach loops
	- make the UI code object-oriented. there's like three buttons and an options menu, just make it simpler for christs sake
	- keep main.js simple and relegate complicated code to separate files
	- and make sure there's no gross coupling
	- the game logic itself is mostly fine
*/
let gamestate = "preload";

var sfx = {
	bump: new Howl({
		src: ['sfx/bump.wav'],
		html5: true
	}),
	match: new Howl({
		src: ['sfx/match.wav'],
		html5: true
	}),
	match1: new Howl ({
		src: ['sfx/match-combo1.wav'],
		html5: true
	}),
	match2: new Howl ({
		src: ['sfx/match-combo2.wav'],
		html5: true
	}),
	match3: new Howl ({
		src: ['sfx/match-combo3.wav'],
		html5: true
	}),
	match4: new Howl ({
		src: ['sfx/match-combo4.wav'],
		html5: true
	}),
	match5: new Howl ({
		src: ['sfx/match-combo5.wav'],
		html5: true
	}),
	match10: new Howl ({
		src: ['sfx/match-combo10.wav'],
		html5: true
	}),
	swap: new Howl({
		src: ['sfx/swap.wav'],
		html5: true
	}),
	warning: new Howl({
		src: ['sfx/warning.wav'],
		html5: true
	}),
	comboLossSound: new Howl({
		src: ['sfx/combo-loss.wav'],
		html5: true
	}),
	gameOver: new Howl({
		src: ['sfx/game-over.wav'],
		html5: true
	}),
	youWin: new Howl({
		src: ['sfx/win.wav'],
		html5: true
	})
}

function showResults() {
	scores = [...ranking.scores];
	scores.push(results.playerStats.score);
	scores.sort(function (a,b) { return a - b; });
	results.playerStats.rank = scores.findIndex((score) => score == results.playerStats.score) - 1;
	if (lost) {
		gameOver.pushOut.moving = true;
	} else {
		youWin.pushOut.moving = true;
	}
	if (options.dialog.toggles.music.toggle){
		music.results.play();
	}
}

let loading = false;

// music setup
// more garbage 4/10

let music = {
	menu: new Howl({
		src: ['music/menu.ogg'],
		autoplay: false,
		loop: true
	}),
	ingame: new Howl({
		src: ['music/ingame.ogg'],
		autoplay: false,
		loop: true
	}),
	results: new Howl({
		src: ['music/results.ogg'],
		autoplay: false,
		loop: true
	})
}

function determineRank() {
	scores = [...ranking.scores];
	scores.push(results.playerStats.score);
	scores.sort(function (a,b) { return a - b; });
	results.playerStats.rank = scores.findIndex((score) => score == results.playerStats.score) - 1;
	youWin.pushOut.moving = true;
}

// canvas setup
// no problems here 10/10

const container = document.getElementById("container");
const canvas = document.getElementById("ppCanvas");
const heightRatio = 9/16;
canvas.width = 960;
canvas.height = canvas.width * heightRatio;
const ctx = canvas.getContext("2d");
ctx.font = "16px Tahoma";
gameFrame = 0;
ctx.imageSmoothingEnabled = false;
ctx.webkitImageSmoothingEnabled = false;

// background import
// little stinky 5/10

let bgFrame = 0;
let bgSprite = new Image();
bgSprite.src = "img/bg.png";

let boardBg = new Image();
boardBg.src = "img/board_bg.png";

// fruits import
// definitely could use an enum here, but it's not worth fussing over. overall okay 9/10

let fruits = new Image();
fruits.src = "img/fruits.png";

let flavors = ["Strawberry","Kiwi","Banana","Blueberries","Grapes","Air"];

// ui import
// i checked some of the ui images and they look weird. ui could use a lot of work. 4/10

let preload = new Image();
preload.src = "img/preload.png";

let hud = new Image();
hud.src = "img/hud.png";

let logo = new Image();
logo.src = "img/logo.png";

let progressBar = new Image();
progressBar.src = "img/level_progress.png";

let swapper = new Image();
swapper.src = "img/swapper.png";

let loadingSprite = new Image();
loadingSprite.src = "img/loading.png";

let basket = {
	sprite: new Image(),
	position: {
		x: 713,
		y: 225
	},
	basePosition: {
		x: 713,
		y: 225
	},
	textOffset: {
		x: 92,
		y: 96
	},
	scale: 1,
	pulsate: false
}

basket.sprite.src = "img/placeholder-basket.png";

// some of this extraneous data should be relegated to a separate json. 2/10
let ranking = {
	ranks: [
		"Pineapple Pinhead",
		"Banana Beginner",
		"Raspberry Rookie",
		"Jujube Journeyman",
		"Strawberry Specialist",
		"Papaya Professional",
		"Mango Maestro",
		"Lemon Legend"
	],
	scores: [
		-99999,
		50,
		300,
		600,
		900,
		1200,
		1500,
		2000
	],
	icons: []
}

// more of this, please! 10/10
for (i=0; i<8; i++){
	ranking.icons.push(new Image());
	ranking.icons[i].src = `img/icon/${i}.png`;
}

// jesus i want to die 1/10
let newGameButton = new Image();
newGameButton.src = "img/buttons/new_game.png";
let menuButton = new Image();
menuButton.src = "img/buttons/main_menu.png";
let resumeButton = new Image();
resumeButton.src = "img/buttons/resume.png";
let nextLevelButton = new Image();
nextLevelButton.src = "img/buttons/next_level.png";
let preloadButton = new Image();
preloadButton.src = "img/buttons/play.png";

let newGameButtonOver = new Image();
newGameButtonOver.src = "img/buttons/new_game-over.png";
let menuButtonOver = new Image();
menuButtonOver.src = "img/buttons/main_menu-over.png";
let resumeButtonOver = new Image();
resumeButtonOver.src = "img/buttons/resume-over.png";
let nextLevelButtonOver = new Image();
nextLevelButtonOver.src = "img/buttons/next_level-over.png";
let preloadButtonOver = new Image();
preloadButtonOver.src = "img/buttons/play.png";

// NEVER, EVER, EVER WRITE CODE LIKE THIS. THIS WAS A MISTAKE. NOT EVERYTHING HAS TO BE CUSTOMIZABLE HOLY SHIT
// again, ui could use a lot of work. this could be done much easier 3/10

let options = {
	button: {
		sprites: {
			normal: new Image(),
			mouseover: new Image()
		},
		position: {
			x: 24,
			y: 462
		},
		basePosition: {
			x: 24,
			y: 462
		},
		width: 256,
		height: 64,
		scale: 1,
		mouseoverScale: 1.05,
		mouseover: false
	},
	sprites: {
		dialog: new Image(),
		toggle: new Image(),
		toggleOn: new Image()
	},
	dialog: {
		position: {
			x: 286,
			y: 540
		},
		basePosition: {
			x: 286,
			y: 173
		},
		buttons: {
			width: 153,
			height: 33,
			mainMenu: {
				scale: 1,
				mouseoverScale: 1.1,
				mouseover: false
			},
			resume: {
				scale: 1,
				mouseoverScale: 1.1,
				mouseover: false
			}
		},
		toggles: {
			movingBackground: {
				toggle: true,
				mouseover: false
			},
			music: {
				toggle: true,
				mouseover: false
			},
			sfx: {
				toggle: true,
				mouseover: false
			}
		},
		moving: false,
		speed: 0,
		acceleration: 2
	},
	elementOffsets: {
		toggles: {
			x: 285,
			y: {
				movingBackground: 47,
				music: 75,
				sfx: 103
			},
			width: 50,
			height: 24
		},
		buttons: {
			x: {
				menu: 26,
				resume: 211
			},
			y: 153
		}
	},
	drawToggle: function (toggleState, toggleOffset){
		ctx.drawImage(toggleState ? options.sprites.toggleOn : options.sprites.toggle, options.dialog.position.x + options.elementOffsets.toggles.x, Math.floor(options.dialog.position.y) + toggleOffset);
	},
	drawButton: function (button, buttonSprite, buttonSpriteOver, buttonOffset){
		ctx.drawImage(button.mouseover ? buttonSpriteOver : buttonSprite, (options.dialog.position.x + buttonOffset) - ((options.dialog.buttons.width * (button.scale - 1))/2), (Math.floor(options.dialog.position.y) + options.elementOffsets.buttons.y) - ((options.dialog.buttons.height * (button.scale - 1))/2), options.dialog.buttons.width*button.scale, options.dialog.buttons.height * button.scale);
	},
	handleToggle: function (toggle, toggleOffset){
		if (mouse.x >= options.dialog.position.x + options.elementOffsets.toggles.x &&
			mouse.x <= options.dialog.position.x + options.elementOffsets.toggles.x + options.elementOffsets.toggles.width &&
			mouse.y >= options.dialog.position.y + toggleOffset &&
			mouse.y <= options.dialog.position.y + toggleOffset + options.elementOffsets.toggles.height) {
			toggle.mouseover = true;
		} else {
			toggle.mouseover = false;
		}
	}
};

options.button.sprites.normal.src = "img/buttons/options.png";
options.button.sprites.mouseover.src = "img/buttons/options-over.png";
options.sprites.dialog.src = "img/options.png";
options.sprites.toggle.src = "img/toggle.png";
options.sprites.toggleOn.src = "img/toggle-on.png";


let results = {
	sprite: new Image(),
	countingTime: false,
	playerStats: {
		score: 0,
		time: 0,
		bestCombo: 0,
		level: 1,
		rank: 1
	},
	moving: false,
	bgOpacity: 0,
	position: {
		x: 285,
		y: 540
	},
	elementOffsets: {
		score: {x: 120, y: 55},
		time: {x: 120, y: 94},
		level: {x: 120, y: 132},
		combo: {x: 291, y: 107},
		rank: {x: 212, y: 223},
		icon: {x: 26, y: 185},
		topButton: {x: 215, y: 286},
		bottomButton: {x: 215, y: 328}
	},
	pushIn: {
		speed: 0,
		acceleration: -2
	},
	buttons: {
		top: {
			scale: 1,
			mouseover: false
		},
		bottom: {
			scale: 1,
			mouseover: false
		}
	}
}

results.sprite.src = "img/results.png";

// this is much better :)
// every object needs to be like this 8/10 i only have some minor issues

let toni = {
	//0: idle, 1: match, 2: x2, 3: x3
	state: 0,
	frameChanged: -99999,
	frameNum: 0,
	sprites: [
		new Image(),
		new Image(),
		new Image(),
		new Image()
	],
	x: 24,
	y: 197,
	width: 256,
	handle: function () {
		if (this.frameNum < 3) {
			this.frameNum += 0.4;
		}
		if (this.state != 0 && gameFrame - this.frameChanged >= comboThreshold) {
			this.changeState(0);
			if (!won && !lost && !pause && options.dialog.toggles.sfx.toggle) {
				sfx.comboLossSound.play();
			}
		}
	},
	draw: function (){
		ctx.drawImage(this.sprites[this.state],(Math.floor(this.frameNum) % 2) * this.width,(Math.floor(this.frameNum / 2)) * this.width,this.width,this.width,this.x,this.y,this.width,this.width)
	},
	changeState: function (state) {
		this.state = state;
		this.frameNum = 0;
		this.frameChanged = gameFrame;
	},
	loadImages: function (){
		let index = 0;
		this.sprites.forEach(function (sprite){
			let spriteSrcs=["img/toni/idle.png","img/toni/match.png","img/toni/x2.png","img/toni/x3.png"];
			sprite.src = spriteSrcs[index];
			index++;
		});
	}
}

toni.loadImages();


let berryBumperEmpty = new Image();
berryBumperEmpty.src = "img/berrybumper_empty2.png";

let berryBumperFull = new Image();
berryBumperFull.src = "img/berrybumper_full2.png";

let berryBumper = {
	interval: Math.max(800 - (50 * results.playerStats.level), 150),
	lastRowFrame: 0,
	progress: 0,
	position: {
		x: 301,
		y: 498
	}
}

let gameOver = {
	sprite: new Image(),
	position: {
		x: 296,
		y: 540
	},
	soundPlayed: false,
	pushOut: {
		moving: false,
		speed: 0,
		acceleration: -2
	}
}

gameOver.sprite.src = "img/game-over.png";

let youWin = {
	sprite: new Image(),
	position: {
		x: 296,
		y: 540
	},
	soundPlayed: false,
	pushOut: {
		moving: false,
		speed: 0,
		acceleration: -2
	}
}

youWin.sprite.src = "img/level-clear.png";

// we're gonna make a countdown so this is a temporary bodge
// haha really 10/10
results.countingTime = true;

// set up board
// all of this is totally fine 10/10

let board = {
	offset: {
		x: 312,
		y: 54
	},
	width: 7,
	height: 9,
	content: []
}

for (let i = 0; i < board.width * board.height; i++) {
	board.content.push(i < board.width * 5 ? 5 : Math.floor(Math.random()*5));
}

let fruitsGoal = 55 + (results.playerStats.level * 20);
let inBasket = 0;

// mouse interactivity
// the mouse stuff is the worst offender here. 0/10

let mouse = {
	x: canvas.width / 2,
	y: canvas.height / 2
}

//960x540 
canvas.addEventListener('mousemove', function(e) {
	mouse.x = Math.floor((e.x - canvas.getBoundingClientRect().left) / (container.offsetWidth/960));
	mouse.y = Math.floor((e.y - canvas.getBoundingClientRect().top) / (container.offsetHeight/540));
});

canvas.addEventListener('click', function(e) {
	if (gamestate == "game") {
		let targeted = {
			x: Math.floor((mouse.x)/48)-7,
			y: Math.floor((mouse.y-6)/48)-1
		}
		if (targeted.y >= 0 && targeted.y <= board.height-1 && !lost && !won && !pause) {
			//i[j] = (i*width)+j
			if (!(board.content[targeted.y*board.width+targeted.x] !== 5 && board.content[(targeted.y*board.width+targeted.x)+board.width] == 5)) {
				if (targeted.x >= 0 && targeted.x <= board.width-2) {
					swap(targeted, false);
				} else if (targeted.x == board.width-1) {
					swap(targeted, true);
				}
			}
		}
		if (!lost && !won && !pause) {
			if (mouse.x > berryBumper.position.x &&
				mouse.x < berryBumper.position.x + 360 &&
				mouse.y > berryBumper.position.y &&
				mouse.y < berryBumper.position.y + 38) {
				if (board.content.slice(0,board.width).every(fruit => fruit==5)) {
					addNewRow(false);
					gravityFrame = gameFrame % gravityForce;
				}
			}
		}
		if (results.buttons.top.mouseover && won) {
			results.playerStats.level++;
			resetLevel();
		} else if (results.buttons.top.mouseover && lost) {
			results.playerStats.level = 1;
			results.playerStats.score = 0;
			results.playerStats.time = 0;
			displayScore = 0;
			results.playerStats.rank = 0;
			resetLevel();
		} else if (results.buttons.bottom.mouseover) {
			gamestate = "menu";
		}
		if (!pause && !lost && !won && options.button.mouseover) {
			pause = true;
			options.dialog.moving = true;
		}
		if (pause) {
			if (options.dialog.buttons.mainMenu.mouseover) {
				gamestate = "menu";
				pause = false;
				options.dialog.position.y = 540;
				results.bgOpacity = 0;
			} else if (options.dialog.buttons.resume.mouseover) {
				pause = false;
				options.dialog.position.y = 540;
				results.bgOpacity = 0;
			}
		}
		if (options.dialog.toggles.movingBackground.mouseover) {
			options.dialog.toggles.movingBackground.toggle = !options.dialog.toggles.movingBackground.toggle;
		}
		if (options.dialog.toggles.music.mouseover) {
			options.dialog.toggles.music.toggle = !options.dialog.toggles.music.toggle;
			if (options.dialog.toggles.music.toggle) {
				if (gamestate=="game"){
					if (!lost || !won) {
						if (music.results.paused) {
							music.results.play();
						}
					} else {
						if (music.ingame.paused) {
							music.ingame.play();
							loading = false;
						}
					}
				} else {
					if (music.menu.paused) {
						music.menu.play();
					}
					console.log(music.menu.paused)
				}
			} else {
				music.results.stop();
				music.menu.stop();
				music.ingame.stop();
			}
		}
		if (options.dialog.toggles.sfx.mouseover) {
			options.dialog.toggles.sfx.toggle = !options.dialog.toggles.sfx.toggle;
		}
	} else if (gamestate == "menu") {
		menuButtons.forEach(function (button) {
			if (button.mouseover) {
				button.onClick();

			}
		});
		instructions.buttons.forEach(function (button) {
			if (button.mouseover) {
				button.onClick();
			}
		});
	} else if (gamestate == "preload") {
		if (playButton.mouseover) {
			playButton.onClick();
		}
	}
});

window.addEventListener('keydown', function(e) {
	if ((e.keyCode == 32 || e.keyCode == 87) && !lost && !won && gamestate=="game") {
		if (board.content.slice(0,board.width).every(fruit => fruit==5)) {
			addNewRow(false);
			gravityFrame = gameFrame % gravityForce;
		}
	}
});

function resetLevel() {
	lost = false;
	won = false;
	gameFrame = 0;
	berryBumper.interval = Math.max(650 - (50 * results.playerStats.level), 160);
	berryBumper.lastRowFrame = 0;

	results.position.y = 540;
	results.bgOpacity = 0;
	results.moving = false;
	results.pushIn.speed = 0;

	gameOver.position.y = 540;
	gameOver.soundPlayed = false;
	gameOver.pushOut.moving = false;
	gameOver.pushOut.speed = 0;

	youWin.position.y = 540;
	youWin.soundPlayed = false;
	youWin.pushOut.moving = false;
	youWin.speed = 0;

	toni.state = 0;

	board.content = [];
	for (let i = 0; i < board.width * board.height; i++) {
		board.content.push(i < board.width * 5 ? 5 : Math.floor(Math.random()*5));
	}
	checkForImmediateMatches();

	fruitsGoal = 55 + (results.playerStats.level * 20);
	inBasket = 0;
	displayInBasket = 0;

	matchingAnimations = [];
	warnings = [];

	gravityForce = Math.max(Math.ceil(7.25 - (0.25 * results.playerStats.level)), 4);
	lastMatch = -99999;
	combo = 0;
	comboThreshold = Math.max(220 - (10 * results.playerStats.level), 90);
	newRowInQueue = false;
}

// matching animation

let fruitSheet = new Image();
fruitSheet.src = "img/fruits-sheet.png";

let matchingAnimations = [];

class MatchingAnimation {
	constructor (flavor,index) {
		this.flavor = flavor;
		this.index = index;
		this.frameNum = 1;
		this.position = {
			x: this.index % board.width * 48 + board.offset.x,
			y: Math.floor(this.index / board.width) * 48 + board.offset.y
		};
	}
}

// warnings

let warningSprite = new Image();
warningSprite.src = "img/warning.png";

let warnings = [];

class Warning {
	static frameNum = 0;
	static bounceTimer = 0;
	static bounceInterval = 60;
	constructor (column) {
		this.column = column;
		this.x = board.offset.x + (this.column * 48) + 12;
	}
}


// check for immediate matches

let recursions = 0;

function toIndex(num) {
	return Math.floor(board.width*Math.floor(num % board.height)+(1/board.height)*num)
}

function checkForImmediateMatches() {

	let immediateMatches = [];
	let chainNumber = 1;
	let toCompareTo;
	let redo = true;

	// horizontal

	for (let i = 1; i < board.content.length; i++) {
		if (i % board.width != 0) {
			toCompareTo = board.content[i-1];
			if (board.content[i]==toCompareTo) {
				chainNumber++;
			} else {
				chainNumber = 1;
			}
			if (chainNumber >= 3 && toCompareTo != 5) {
				immediateMatches.push(i-1);
			}
		}
	}

	chainNumber = 1;

	//vertical

	for (let i = 0; i < board.content.length; i++) {
		toCompareTo = board.content[toIndex(i-1)];
		if (board.content[toIndex(i)]==toCompareTo) {
			chainNumber++;
		} else {
			chainNumber = 1;
		}
		if (chainNumber >= 3 && toCompareTo != 5) {
			immediateMatches.push(toIndex(i-1));
		}
	}

	if (immediateMatches.length == 0) {
		redo = false;
	}

	//fix

	immediateMatches = [...new Set(immediateMatches)];
	immediateMatches.forEach(function (index){
		let invalidColors = [board.content[index-1],board.content[index+1],board.content[index-board.width],board.content[index+board.width]];
		invalidColors = invalidColors.filter(function(shouldBeDefined){
			return shouldBeDefined !== undefined
		});
		let validColors = [0,1,2,3,4];
		validColors = validColors.filter(function(pendingElement){
			let valid = true;
			invalidColors.forEach(function(invalidElement){
				if (pendingElement == invalidElement) {
					valid = false;
				}
			});
			return valid;
		});
		board.content[index] = validColors[Math.floor(Math.random()*validColors.length)];
	});

	if (redo) {
		recursions++;
		checkForImmediateMatches();
	}

}

checkForImmediateMatches();

// swapping tiles

let gravityFrame;
let gravityForce = Math.max(Math.ceil(7.25 - (0.25 * results.playerStats.level)), 4);
function swap(targeted, edgeCase) {
	let temp = board.content[(targeted.x + (edgeCase ? -1 : 1))+targeted.y*board.width];
	board.content[(targeted.x + (edgeCase ? -1 : 1))+targeted.y*board.width] = board.content[targeted.x+targeted.y*board.width];
	board.content[targeted.x+targeted.y*board.width] = temp;
	gravityFrame = gameFrame % gravityForce;
	if (options.dialog.toggles.sfx.toggle) {
		sfx.swap.play();
	}
	checkMatch();
}

// checking matches

let matchable = true;
let combo = 0;
let comboThreshold = Math.max(220 - (10 * results.playerStats.level), 90);
let lastMatch = -99999;

function checkMatch() {
	let matches = []
	let chainNumber = 1;
	let toCompareTo;
	let log = false;
	let matchScore = 0;

	// horizontal
	for (let i = 1; i < board.content.length; i++) {
		toCompareTo = i % board.width == 0 ? -99 : board.content[i-1];
		if (board.content[i]==toCompareTo && i % board.width != 0) {
			chainNumber++;
		} else {
			chainNumber = 1;
		}
		//shitload of checks cuz a few different bugs came up with one-dimensional arrays and horizontal matches
		if (chainNumber >= 3 &&
			chainNumber <= 7 &&
			toCompareTo != 5 &&
			(i-1) % board.width !== 0 &&
			i % board.width !== 0 &&
			matchable) {
			matches.push(i-2);
			matches.push(i-1);
			matches.push(i);
		}
	}
	chainNumber = 1;
	//vertical
	for (let i = 0; i < board.content.length; i++) {
		toCompareTo = i % board.height == 0 ? -99 : board.content[toIndex(i-1)];
		if (board.content[toIndex(i)]==toCompareTo) {
			chainNumber++;
		} else {
			chainNumber = 1;
		}
		if (chainNumber >= 3 &&
			chainNumber < 7 &&
			toCompareTo != 5 &&
			matchable) {
			matches.push(toIndex(i-2));
			matches.push(toIndex(i-1));
			matches.push(toIndex(i));
		}
	}

	//delete
	matches = [...new Set(matches)];
	matches.forEach(function (index){
		matchingAnimations.push(new MatchingAnimation(board.content[index],index))
		board.content[index] = 5;
		matchScore++;
	});

	if (matches.length != 0) {
		if (gameFrame - lastMatch > comboThreshold) {
			combo = 0;
		} else {
			combo++;
		}
		if (!lost && !won && options.dialog.toggles.sfx.toggle) {
			if (combo < 5) {
				switch (combo) {
					case 0:
						sfx.match.play();
						break;
					case 1:
						sfx.match1.play();
						break;
					case 2:
						sfx.match2.play();
						break;
					case 3:
						sfx.match3.play();
						break;
					case 4:
						sfx.match4.play();
						break;
				}
				toni.changeState(1);
			} else if (combo < 10) {
				sfx.match5.play();
				toni.changeState(2);
			} else {
				if (options.dialog.toggles.sfx.toggle) {
					sfx.match10.play();
				}
				toni.changeState(3);
			}
		}
		if (combo > results.playerStats.bestCombo) {
			results.playerStats.bestCombo = combo;
		}
		lastMatch = gameFrame;
		matchScore *= (combo >= 10 ? 3 : combo >= 5 ? 2 : 1);
		results.playerStats.score += matchScore;
		inBasket += matchScore;
		basket.pulsate = true;
	}
}

//housekeeping

function gravity() {
	let goingDown = [];
	for (let i = 0; i < board.content.length-board.width; i++){
		if (board.content[i+board.width] == 5 && board.content[i] != 5) {
			goingDown.push(i);
		}
	}
	goingDown.forEach(function(index){
		board.content[index+board.width] = board.content[index]
		board.content[index] = 5;
	});
	if (goingDown.length > 0) {
		matchable = false;
	} else {
		matchable = true;
		if (!lost && !won) {
			checkMatch();
		}
	}
	warnings = warnings.filter(warning => board.content[warning.column] != 5);
}

// push the board up

let newRowInQueue = false;
let lost = false;
let won = false;
let rowsElapsed = 0;

function addNewRow(onTimer) {
	let pushable = true;
	let playWarningSound = false;
	for (let i = 0; i < board.width; i++) {
		if (board.content[i] != 5) {
			pushable = false;
		}
	}
	if (matchable && pushable) {
		for (let i = board.width; i < board.content.length; i++){
			board.content[i-board.width] = board.content[i];
		}
		for (let i = board.content.length - board.width; i < board.content.length; i++){
			board.content[i] = Math.floor(Math.random()*5)
		}
		newRowInQueue = false;
		checkMatch();
		for (let i = 0; i < board.width; i++) {
			if (board.content[i] != 5) {
				warnings.push(new Warning(i));
				Warning.frameNum = 0;
				Warning.bounceTimer = 0;
				playWarningSound = true;
			}
		}
		if (survival) {
			rowsElapsed++;
			if (onTimer) {
				berryBumper.interval = Math.max(berryBumper.interval - (berryBumper.interval < 300 ? 10 : 20),90);
				berryBumper.lastRowFrame = gameFrame;
			}
			comboThreshold = Math.max(comboThreshold - 2, 90);
			if (rowsElapsed % 25 == 0 && rowsElapsed != 0) {
				gravityForce = Math.max(gravityForce-1,4)
			}
			console.log(onTimer, berryBumper.interval);
		}
	} else {
		for (let i = 0; i < board.width; i++) {
			if (board.content[i] != 5) {
				lost = true;
			}
		}
		newRowInQueue = true;
	}
	if (!newRowInQueue && options.dialog.toggles.sfx.toggle) {
		if (playWarningSound) {
				sfx.warning.play();
		} else {
			sfx.bump.play();
		}
	}
}

// gameloop

let displayScore = 0;
let displayInBasket = 0;
let pause = false;
let survival;

function tickGame() {

	if ((music.menu.playing() || music.results.playing()) && !lost && !won){
		music.menu.stop();
		music.results.stop();
		if (options.dialog.toggles.music.toggle) {
			music.ingame.play();
		}
	}
	if (music.ingame.playing() && loading) {
		loading = false;
	}

	results.countingTime = !pause;

	if (results.countingTime) {
		gameFrame++;
	}

	//animate bg

	bgFrame += 0.5;
	if (bgFrame >= 8) {
		bgFrame = 0;
	}

	if (gameFrame % gravityForce == gravityFrame) {
		gravity();
	}

	if (survival) {
		if ((gameFrame - berryBumper.lastRowFrame == berryBumper.interval || newRowInQueue) && !lost) {
			addNewRow(true);
		}
	} else {
		if (((gameFrame % berryBumper.interval == 0 && gameFrame != 0) || newRowInQueue) && !lost && !won) {
			addNewRow(true);
		}
	}

	if (results.countingTime && gameFrame % 60 == 0 && !lost && !won) {
		results.playerStats.time++;
	}

	berryBumper.progress = !survival ? ((gameFrame % berryBumper.interval) / berryBumper.interval) * 360 : ((gameFrame - berryBumper.lastRowFrame) / berryBumper.interval) * 360;

	matchingAnimations.forEach(function (matchingAnim){
		matchingAnim.frameNum += 0.5;
		if (matchingAnim.frameNum > 5) {
			matchingAnimations.splice(matchingAnimations.indexOf(matchingAnim), 1);
		}
	});

	if (warnings.length != 0) {
		Warning.frameNum += 0.25;
		Warning.bounceTimer++;
	}

	if (Warning.frameNum > 6) {
		Warning.frameNum = 6;
	}

	if (Warning.bounceTimer > Warning.bounceInterval && !lost && !won && options.dialog.toggles.sfx.toggle && warnings.length > 0) {
		Warning.frameNum = 3;
		Warning.bounceTimer = 0;
		sfx.warning.play();
	}

	if (basket.pulsate) {
		if (basket.scale < 1.09) {
			basket.scale = ((basket.scale * 3) + 1.1) / 4;
		} else {
			basket.pulsate = false;
		}
	}

	if (!basket.pulsate && basket.scale > 1) {
		basket.scale = ((basket.scale * 3) + 1) / 4;
	}

	basket.position.x = basket.basePosition.x - (192 * ((basket.scale-1)/2))
	basket.position.y = basket.basePosition.y - (128 * ((basket.scale-1)/2))

	if (Math.floor(displayScore) != results.playerStats.score) {
		displayScore = ((displayScore * 9) + results.playerStats.score) / 10;
	}

	if (Math.floor(displayInBasket) != inBasket) {
		displayInBasket = ((displayInBasket * 9) + inBasket) / 10;
	}

	if (lost && !gameOver.soundPlayed) {
		music.ingame.stop();
		if(options.dialog.toggles.sfx.toggle) {
			sfx.gameOver.play();
		}
		gameOver.soundPlayed = true;
		setTimeout(showResults,1846);
	}

	if (!gameOver.pushOut.moving) {
		if (lost && gameOver.position.y > 148.5) {
			gameOver.position.y = ((gameOver.position.y*3) + 148)/4;
		}
	} else {
		if (lost && gameOver.position.y > -244) {
			gameOver.position.y += gameOver.pushOut.speed;
			gameOver.pushOut.speed += gameOver.pushOut.acceleration;
		} else {
			results.moving = lost;
		}
	}

	if (Math.floor(results.position.y) == 82 &&
		mouse.x >= 500 &&
		mouse.y >= 368 &&
		mouse.x <= 653 &&
		mouse.y <= 401) {
		results.buttons.top.mouseover = true;
		results.buttons.top.scale = (results.buttons.top.scale + 1.1) / 2;
	} else {
		results.buttons.top.mouseover = false;
		results.buttons.top.scale = (results.buttons.top.scale + 1) / 2;
	}

	if (Math.floor(results.position.y) == 82 &&
		mouse.x >= 500 &&
		mouse.y >= 410 &&
		mouse.x <= 653 &&
		mouse.y <= 443) {
		results.buttons.bottom.mouseover = true;
 		results.buttons.bottom.scale = (results.buttons.bottom.scale + 1.1) / 2;
	} else {
		results.buttons.bottom.mouseover = false;
		results.buttons.bottom.scale = (results.buttons.bottom.scale + 1) / 2;
	}

	if (mouse.x >= options.dialog.position.x + options.elementOffsets.buttons.x.menu &&
		mouse.x <= options.dialog.position.x + options.elementOffsets.buttons.x.menu + options.dialog.buttons.width &&
		mouse.y >= options.dialog.position.y + options.elementOffsets.buttons.y &&
		mouse.y <= options.dialog.position.y + options.elementOffsets.buttons.y + options.dialog.buttons.height &&
		pause
		) {
		options.dialog.buttons.mainMenu.mouseover = true;
		options.dialog.buttons.mainMenu.scale = (options.dialog.buttons.mainMenu.scale + options.dialog.buttons.mainMenu.mouseoverScale) / 2;
	} else {
		options.dialog.buttons.mainMenu.mouseover = false;
		options.dialog.buttons.mainMenu.scale = (options.dialog.buttons.mainMenu.scale + 1) / 2;
	}

	if (mouse.x >= options.dialog.position.x + options.elementOffsets.buttons.x.resume &&
		mouse.x <= options.dialog.position.x + options.elementOffsets.buttons.x.resume + options.dialog.buttons.width &&
		mouse.y >= options.dialog.position.y + options.elementOffsets.buttons.y &&
		mouse.y <= options.dialog.position.y + options.elementOffsets.buttons.y + options.dialog.buttons.height &&
		pause
		) {
		options.dialog.buttons.resume.mouseover = true;
		options.dialog.buttons.resume.scale = (options.dialog.buttons.resume.scale + options.dialog.buttons.resume.mouseoverScale) / 2;
	} else {
		options.dialog.buttons.resume.mouseover = false;
		options.dialog.buttons.resume.scale = (options.dialog.buttons.resume.scale + 1) / 2;
	}

	if (mouse.x >= options.button.position.x && mouse.x <= options.button.position.x + options.button.width && mouse.y >= options.button.position.y && mouse.y <= options.button.position.y + options.button.height && !pause && !lost && !won) {
		options.button.mouseover = true;
		options.button.scale = (options.button.scale + options.button.mouseoverScale) / 2;
	} else {
		options.button.mouseover = false;
		options.button.scale = (options.button.scale + 1) / 2;
	}

	options.handleToggle(options.dialog.toggles.movingBackground, options.elementOffsets.toggles.y.movingBackground);
	options.handleToggle(options.dialog.toggles.music, options.elementOffsets.toggles.y.music);
	options.handleToggle(options.dialog.toggles.sfx, options.elementOffsets.toggles.y.sfx);

	toni.handle();

	results.elementOffsets.topButton = {x: 215 - (153 * ((results.buttons.top.scale - 1) / 2)), y: 286 - (33 * ((results.buttons.top.scale - 1) / 2))}
	results.elementOffsets.bottomButton = {x: 215 - (153 * ((results.buttons.bottom.scale - 1) / 2)), y: 328 - (33 * ((results.buttons.bottom.scale - 1) / 2))}

	if (won && !youWin.soundPlayed) {
		if(options.dialog.toggles.sfx.toggle) {
			sfx.youWin.play();
		}
		music.ingame.stop();
		youWin.soundPlayed = true;
		setTimeout(showResults,2550);
	}

	if (!youWin.pushOut.moving) {
		if (won && youWin.position.y > 148.5) {
			youWin.position.y = ((youWin.position.y*3) + 148)/4;
		}
	} else {
		if (won && youWin.position.y > -244) {
			youWin.position.y += youWin.pushOut.speed;
			youWin.pushOut.speed += youWin.pushOut.acceleration;
		} else {
			results.moving = won;
		}
	}

	if (options.dialog.moving) {
		if (results.bgOpacity < 0.5) {
			results.bgOpacity += 0.03;
		}
		if (options.dialog.position.y > options.dialog.basePosition.y + 0.5) {
			options.dialog.position.y = ((options.dialog.position.y*3)+options.dialog.basePosition.y)/4;
		} else {
			options.dialog.moving = false;
		}
	}

	if (results.moving) {
		if (results.bgOpacity < 0.5) {
			results.bgOpacity += 0.03;
		}
		if (results.position.y > 82.5) {
			results.position.y = ((results.position.y*3) + 82)/4;
		}
	}

	if (inBasket >= fruitsGoal && !survival) {
		won = true;
	}
}

let hudOffset = 16;

function drawGame() {

	// cls

	ctx.font = "16px Tahoma";
	ctx.textAlign = "left";
	ctx.fillStyle = "#000000";
	ctx.fillRect(0,0,960,540);

	// draw bg

	ctx.fillStyle = '#ffffff';
	for (let i = 0; i < 8; i++) {
		for (let j = 0; j < 5; j++) {
			ctx.drawImage(bgSprite, options.dialog.toggles.movingBackground.toggle ? 128*(Math.floor(bgFrame) % 4) : 0, options.dialog.toggles.movingBackground.toggle ? 128*(Math.floor(bgFrame/4)) : 0, 128, 128, i*128,j*128, 128, 128);
		}
	}
	ctx.drawImage(hud, 0, 0);

	// draw board
	ctx.drawImage(boardBg, board.offset.x-8, board.offset.y-8);
	matchingAnimations.forEach(function (matchingAnim){
		ctx.drawImage(fruitSheet, 48*matchingAnim.flavor, 48*(Math.floor(matchingAnim.frameNum)), 48, 48, matchingAnim.position.x, matchingAnim.position.y, 48, 48);
	});
	for (let i = 0; i < board.content.length; i++) {
		ctx.drawImage(fruits, 48*board.content[i], 0, 48, 48, ((i % board.width)*48)+board.offset.x, (Math.floor(i/board.width)*48)+board.offset.y, 48, 48);
	}
	ctx.strokeStyle = 'white';
	ctx.lineWidth = 4;
	if (mouse.y >= board.offset.y && mouse.y < board.offset.y+board.height*48 && !lost && !won && !pause) {
		if (mouse.x >= 336 && mouse.x < 624) {
			ctx.drawImage(swapper,48*Math.floor((mouse.x-48)/48)+24,48*Math.floor((mouse.y-6)/48)+6);
		}
	}

	// berry bumper

	ctx.drawImage(berryBumperEmpty, berryBumper.position.x, berryBumper.position.y);
	if (!lost && !won) {
		ctx.drawImage(berryBumperFull, 0, 0, berryBumper.progress, 38, berryBumper.position.x, berryBumper.position.y, berryBumper.progress, 38);
	}

	// warnings

	warnings.forEach(function (warning) {
		ctx.drawImage(warningSprite, 24*(Math.floor(Warning.frameNum)%4), 24*(Math.floor(Warning.frameNum/4)), 24, 24, warning.x, 12, 24, 24);
	});

	// holy fuck do you see how simple this can be past me???

	toni.draw();

	// options

	ctx.drawImage(
		options.button.mouseover ? options.button.sprites.mouseover : options.button.sprites.normal,
		options.button.position.x-((options.button.width*(options.button.scale-1))/2),
		options.button.position.y-((options.button.height*(options.button.scale-1))/2),
		options.button.width * options.button.scale,
		options.button.height * options.button.scale
	);

	// level progress

	ctx.drawImage(progressBar, 0, 0, survival ? 288 : 288*Math.min(displayInBasket/fruitsGoal, 1), 16, 666, 189, survival ? 288 : 288*Math.min(displayInBasket/fruitsGoal, 1), 16);

	ctx.textAlign = "center";
	ctx.strokeStyle = "#000000";
	ctx.lineWidth = 1.5;

	ctx.font = `bold ${32*basket.scale}px Tahoma`;
	ctx.fillText(survival ? `${Math.floor(results.playerStats.time/60)}:${(results.playerStats.time % 60) < 10 ? "0" : ""}${results.playerStats.time % 60}` : `Lvl. ${results.playerStats.level}`, 810, 207+(10*(basket.scale-1)));
	ctx.strokeText(survival ? `${Math.floor(results.playerStats.time/60)}:${(results.playerStats.time % 60) < 10 ? "0" : ""}${results.playerStats.time % 60}` : `Lvl. ${results.playerStats.level}`, 810, 207+(10*(basket.scale-1)));

	// score

	ctx.lineWidth = 2;
	ctx.font = `bold ${48*basket.scale}px Tahoma`;
	ctx.fillText(Math.ceil(displayScore), 810, 130+(20*(basket.scale-1)));
	ctx.strokeText(Math.ceil(displayScore), 810, 130+(20*(basket.scale-1)));

	// basket

	ctx.drawImage(basket.sprite, basket.position.x, basket.position.y, 192*basket.scale, 128*basket.scale);
	ctx.fillText(survival ? `Rows: ${rowsElapsed}` : `${Math.ceil(displayInBasket)}/${fruitsGoal}`, basket.basePosition.x+basket.textOffset.x, basket.basePosition.y+basket.textOffset.y+(10*(basket.scale-1)));
	ctx.strokeText(survival ? `Rows: ${rowsElapsed}` : `${Math.ceil(displayInBasket)}/${fruitsGoal}`, basket.basePosition.x+basket.textOffset.x, basket.basePosition.y+basket.textOffset.y+(10*(basket.scale-1)));

	ctx.strokeStyle = "#ffffff";
	ctx.textAlign = "left";
	ctx.lineWidth = 4;
	
	ctx.font = "bold 32px Tahoma";
	/*	score: {x: 124, y: 55},
		time: {x: 124, y: 94},
		level: {x: 124, y: 132},
		combo: {x: 286, y: 97},
		rank: {x: 215, y: 228},
		icon: {x: 27, y: 186},
		newGame: {x: 215, y: 286},
		menu: {x: 215, y: 328}
	*/
	if (pause) {
		ctx.fillStyle = `rgba(0, 0, 0, ${results.bgOpacity}`;
		ctx.fillRect(0,0,960,540);
		ctx.drawImage(options.sprites.dialog, options.dialog.position.x, Math.floor(options.dialog.position.y));
		options.drawToggle(options.dialog.toggles.movingBackground.toggle, options.elementOffsets.toggles.y.movingBackground);
		options.drawToggle(options.dialog.toggles.music.toggle, options.elementOffsets.toggles.y.music);
		options.drawToggle(options.dialog.toggles.sfx.toggle, options.elementOffsets.toggles.y.sfx);
		options.drawButton(options.dialog.buttons.mainMenu, menuButton, menuButtonOver, options.elementOffsets.buttons.x.menu);
		options.drawButton(options.dialog.buttons.resume, resumeButton, resumeButtonOver, options.elementOffsets.buttons.x.resume);
	}

	if (lost || won) {
		let lineIndex = 1;
		ctx.drawImage(won ? youWin.sprite : gameOver.sprite,won ? youWin.position.x : gameOver.position.x,Math.floor(won ? youWin.position.y : gameOver.position.y));
		ctx.fillStyle = `rgba(0, 0, 0, ${results.bgOpacity}`;
		ctx.fillRect(0,0,960,540);
		ctx.fillStyle = "#ffffff";
		ctx.drawImage(results.sprite,results.position.x,Math.floor(results.position.y));
		ctx.fillText(results.playerStats.score, results.position.x+results.elementOffsets.score.x, Math.floor(results.position.y)+results.elementOffsets.score.y+22);
		ctx.fillText(`${Math.floor(results.playerStats.time/60)}:${(results.playerStats.time % 60) < 10 ? "0" : ""}${results.playerStats.time % 60}`, results.position.x+results.elementOffsets.time.x, Math.floor(results.position.y)+results.elementOffsets.time.y+22);
		ctx.fillText(survival ? "Surv." : results.playerStats.level, results.position.x+results.elementOffsets.level.x, Math.floor(results.position.y)+results.elementOffsets.level.y+22);
		ctx.textAlign = "center";
		ctx.font = "bold 72px Tahoma";
		ctx.fillText(`${results.playerStats.bestCombo}x`, results.position.x+results.elementOffsets.combo.x, Math.floor(results.position.y)+results.elementOffsets.combo.y+32);
		ctx.textAlign = "left";
		ctx.font = "bold 24px Tahoma";
		ranking.ranks[results.playerStats.rank].split(" ").forEach(function (line) {
			ctx.fillText(ranking.ranks[results.playerStats.rank].split(" ")[lineIndex-1], results.position.x+results.elementOffsets.rank.x, Math.floor(results.position.y)+results.elementOffsets.rank.y+lineIndex*22);
			lineIndex++;
		});
		ctx.drawImage(ranking.icons[results.playerStats.rank], results.position.x+results.elementOffsets.icon.x, Math.floor(results.position.y)+results.elementOffsets.icon.y);
		ctx.drawImage(results.buttons.top.mouseover ? (won ? nextLevelButtonOver : newGameButtonOver) : (won ? nextLevelButton : newGameButton), results.position.x+results.elementOffsets.topButton.x, Math.floor(results.position.y)+results.elementOffsets.topButton.y, 153*results.buttons.top.scale, 33*results.buttons.top.scale);
		ctx.drawImage(results.buttons.bottom.mouseover ? menuButtonOver : menuButton, results.position.x+results.elementOffsets.bottomButton.x, Math.floor(results.position.y)+results.elementOffsets.bottomButton.y, 153*results.buttons.bottom.scale, 33*results.buttons.bottom.scale);
	}
}

//i'm starting to see the benefits of these static classes...

class Button {
	static mouseoverScale = 1.1;
	constructor (width,height,x,y,sprite,onClick) {
		this.x = x;
		this.y = y;
		this.base = {
			x: x,
			y: y
		}
		this.width = width;
		this.height = height;
		this.sprite = new Image();
		this.sprite.src = sprite + ".png";
		this.mouseoverSprite = new Image();
		this.mouseoverSprite.src = sprite + "-over.png";
		this.scale = 1;
		this.mouseover = false;
		this.onClick = onClick;
	}
	handle () {
		this.mouseover = mouse.x >= this.x && mouse.x <= this.x + this.width && mouse.y >= this.y && mouse.y <= this.y + this.height;
		this.scale = (this.scale + (this.mouseover ? Button.mouseoverScale : 1)) / 2;
		this.x = this.base.x - (this.width * (this.scale-1)) / 2
		this.y = this.base.y - (this.height * (this.scale-1)) / 2
	}
	draw () {
		ctx.drawImage(this.mouseover ? this.mouseoverSprite : this.sprite, this.x, this.y, this.width * this.scale, this.height * this.scale);
	}
}

class MenuButton extends Button {
	constructor (y,sprite,onClick) {
		super(153,33,404,y,sprite,onClick);
	}
}

class InstructionsButton extends Button {
	constructor (init,offset,sprite,onClick) {
		super(48,48,init.x,init.y,sprite,onClick);
		this.offset = {
			x: offset.x,
			y: offset.y
		}
	}
	handle () {
		super.handle();
		this.x = (instructions.x + this.offset.x) - (this.width * (this.scale - 1))/2;
		this.y = instructions.y + this.offset.y - (this.width * (this.scale - 1))/2;
	}
}

class MenuFruit {
	static speed = 2;
	constructor (x, kind, top) {
		this.x = x;
		this.kind = kind;
		this.top = top;
	}
	handle () {
		this.x += !this.top ? MenuFruit.speed : -MenuFruit.speed;
		if (this.x < -64) {
			this.x = 960+64;
			this.kind = Math.floor(Math.random()*5);
		}
		if (this.x > 960+64) {
			this.x = -64;
			this.kind = Math.floor(Math.random()*5);
		}
	}
	draw () {
		ctx.drawImage(fruits, this.kind*48, 0, 48, 48, this.x, this.top ? 24 : 480, 48, 48);
	}
}

menuFruit = [];

for (i=0; i<34; i++) {
	menuFruit.push(new MenuFruit((i%17-1) * 64, Math.floor(Math.random()*5),i<17));
}

instructions = {
	moving: false,
	pushOut: false,
	x: 120,
	y: 540,
	buttons: [],
	speed: 0,
	acceleration: -10,
	bgOpacity: 0,
	pages: [],
	page: 1,
	handle () {
		if (this.moving && Math.floor(this.y) > 67) {
			this.y = (this.y + 67) /2;
		} else {
			this.moving = false;
		}
		if (this.pushOut) {
			if (this.y > -405) {
				this.y += this.speed;
				this.speed += this.acceleration;
				this.bgOpacity -= 0.1;
			} else {
				this.y = 540;
				this.pushOut = false;
				this.bgOpacity = 0;
				this.page = 1;
				this.speed = 0;
			}
		}

		this.buttons.forEach(function (button){
			button.handle();
		});
		if (this.y < 540 && this.bgOpacity < 0.5) {
			this.bgOpacity += 0.03;
		}
	},
	draw () {
		ctx.fillStyle = `rgba(0, 0, 0, ${this.bgOpacity}`;
		ctx.fillRect(0,0,960,540);
		ctx.drawImage(this.pages[this.page-1],this.x,this.y);
		this.buttons.forEach(function (button){
			button.draw();
		});
	}
}

for (i=1; i<4; i++){
	instructions.pages.push(new Image());
	instructions.pages[i-1].src=`img/instructions/page${i}.png`;
}

instructions.buttons = [
	new InstructionsButton({x: instructions.x+9, y: instructions.y+350},{x: 9, y: 350},"img/buttons/previous",function () {
		instructions.pushOut = instructions.page == 1;
		instructions.page += instructions.page == 1 ? 0 : -1;
	}),
	new InstructionsButton({x: instructions.x+665, y: instructions.y+350},{x: 665, y: 350},"img/buttons/next",function() {
		instructions.pushOut = instructions.page == 3;
		instructions.page += instructions.page == 3 ? 0 : 1;
	})
];

let menuButtons = [
	new MenuButton(301,"img/buttons/classic",function(){
		gamestate = "game";
		loading = true;
		results.playerStats.level = 1;
		results.playerStats.score = 0;
		results.playerStats.time = 0;
		displayScore = 0;
		results.playerStats.rank = 0;
		resetLevel();
		survival = false;
	}),
	new MenuButton(342,"img/buttons/survival",function(){
		gamestate = "game";
		loading = true;
		results.playerStats.level = 1;
		results.playerStats.score = 0;
		results.playerStats.time = 0;
		displayScore = 0;
		results.playerStats.rank = 0;
		resetLevel();
		survival = true;
	}),
	new MenuButton(385,"img/buttons/instructions",function(){
		instructions.moving = true;
	})
];

let playButton = new Button(153,33,32,153,"img/buttons/play",function(){
	loading = true;
	gamestate = "menu";
}) 

function tickMenu() {
	if (!music.menu.playing()) {
		music.results.stop();
		music.ingame.stop();
		
		if (options.dialog.toggles.music.toggle) {
			music.menu.stop(); //preventing super-loudness (hopefully)
			music.menu.play();
		}
	} else {
		if (loading) {
			loading = false;
		}
	}
	bgFrame += 0.5;
	if (bgFrame >= 8) {
		bgFrame = 0;
	}
	if (!instructions.bgOpacity > 0) {
		menuButtons.forEach((button) => button.handle());
	}
	menuFruit.forEach((menuFruit) => menuFruit.handle());
	instructions.handle();
}

function drawMenu() {
	// cls

	ctx.font = "16px Tahoma";
	ctx.textAlign = "left";
	ctx.fillStyle = "#000000";
	ctx.fillRect(0,0,960,540);

	// background

	ctx.fillStyle = '#ffffff';
	for (let i = 0; i < 8; i++) {
		for (let j = 0; j < 5; j++) {
			ctx.drawImage(bgSprite, 128*(Math.floor(bgFrame) % 4), 128*(Math.floor(bgFrame/4)), 128, 128, i*128,j*128, 128, 128);
		}
	}

	ctx.drawImage(logo,340,103);
	menuButtons.forEach((button) => button.draw());
	menuFruit.forEach((menuFruit) => menuFruit.draw());
	instructions.draw();
}

function tickPreload() {
	playButton.handle();
}

function drawPreload() {
	ctx.drawImage(preload,0,0);
	playButton.draw();
}

function tick() {
	if (gamestate == "preload") {
		tickPreload();
	} else if (gamestate == "menu") {
		tickMenu();
	} else {
		tickGame();
	}
	requestAnimationFrame(tick);
}

function draw() {
	if (gamestate == "preload") {
		drawPreload();
	} else if (gamestate == "menu") {
		drawMenu();
	} else {
		drawGame();
	}
	if (loading) {
		ctx.drawImage(loadingSprite,0,0);
	}
	requestAnimationFrame(draw);
}

tick();
draw();