const canvas = document.getElementById("loot-canvas");
canvas.width = 960;
canvas.height = 540;
const ctx = document.getElementById("loot-canvas").getContext("2d",{alpha: false});
ctx.imageSmoothingEnabled = false;
ctx.textRendering = "geometricPrecision"
const mobile = !window.matchMedia('(pointer:fine)').matches;

class Mouse {
    static x;
    static y;
    static init() {
        if (mobile) {
            canvas.addEventListener("touchstart",e=>{
                Mouse.x = Math.floor((e.targetTouches[0].clientX - canvas.getBoundingClientRect().left) / (container.offsetWidth/960));
                Mouse.y = Math.floor((e.targetTouches[0].clientY - canvas.getBoundingClientRect().top) / (container.offsetHeight/540));
                Button.buttons.forEach(button=>{button.update()});
            })
        } else {
            canvas.addEventListener("mousemove", function(e) {
                Mouse.x = Math.floor((e.x - canvas.getBoundingClientRect().left) / (container.offsetWidth/960));
                Mouse.y = Math.floor((e.y - canvas.getBoundingClientRect().top) / (container.offsetHeight/540));
            });
            canvas.addEventListener("click", (e) => {
                if (!Button.selected) { return; }
                Button.selected.onclick();
            })
        }
    }
}

class Rectangle {
    constructor(x,y,width,height) {
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
    }
    over(x,y) {
        return x < this.x + this.width &&
               x > this.x &&
               y < this.y + this.height &&
               y > this.y;
    }
    aabb(rect) {
        if (typeof(rect) != "Rectangle") { return false; }
        return rect.x < this.x + this.width &&
        rect.x + rect.width > this.x &&
        rect.y < this.y + this.height &&
        rect.y + rect.height > this.y
    }
}

class Sprite extends Rectangle {
    constructor(x,y,width,height,path) {
        super(x,y,width,height);
        this.image = new Image();
        this.image.src = path;
    }
    draw() {
        ctx.drawImage(this.image,this.x,this.y,this.width,this.height);
    }
}

class Button extends Sprite {
    static buttons = [];
    static mouseoverScale = 1.1;
    static cursorPointer = false;
    //the currently selected button (null if none)
    static selected = null;
    scale = 1;
    scaledUp = false;
    selectable = true;
    isScalable = true;
    constructor(x,y,width,height,path,onclick,id,state=null) {
        super(x,y,width,height,path);
        this.onclick = onclick;
        this.id = id;
        this.state = state;
        Button.buttons[Button.buttons.length] = this;
    }
    static staticUpdate() {
        //tertiary that changes cursor to pointer if any button is selected.
        Button.cursorPointer = Button.selected?true:false;
        if (Button.cursorPointer) {
            if(document.body.style.cursor = "pointer") {return false;}
            document.body.style.cursor = "pointer";
        } else {
            if(document.body.style.cursor = "default") {return false;}
            document.body.style.cursor = "default";
        }
    }
    update() {
        if (this.selectable && this.over(Mouse.x,Mouse.y) && (this.state == null || this.state.includes(Game.state))) {
            Button.selected = this;
            if(mobile) {
                Button.selected.onclick();
                Button.selected = null;
            }
            this.scaledUp = this.isScalable;
        } else {
            if (!mobile) {
                this.scaledUp = false;
                if (Button.selected == this) {
                    Button.selected = null;
                }
            }
        }
        if (!mobile) {
            if (this.scaledUp) {
                if (this.scale < Button.mouseoverScale) {
                    this.scale += 0.02;
                }
            } else {
                if (this.scale > 1) {
                    this.scale -= 0.02;
                }
            }
            if (this.scale > Button.mouseoverScale) {
                this.scale = Button.mouseoverScale;
            }
            if (this.scale < 1) {
                this.scale = 1;
            }
        }
    }
    draw() {
        if (this.state != null) {
            if (!this.state.includes(Game.state)) {
                return;
            }
        }
        ctx.drawImage(
            this.image,
            this.x+((-(this.scale-1))*(this.width/2)),
            this.y+((-(this.scale-1))*(this.height/2)),
            this.width*this.scale,
            this.height*this.scale
        );
        ctx.fillStyle="white";
    }
}

class UIIcon extends Button {
    static image;
    constructor(x,y,onclick,num,id,state=null) {
        if (!UIIcon.image) {
            UIIcon.image = new Image();
            UIIcon.image.src = "img/icons.png";
        }
        super(x,y,64,64,"",onclick,id,state);
        this.num = num;
    }
    draw() {
        if (Game.state == RestartState || Game.state == PreloaderState) {
            this.selectable = false;
        } else if (this.state == null || this.state.includes(Game.state)) {
            this.selectable = true;
        }
        //takes the 32x32 section of icons.png and draws it to the screen @ the proper x and y @ double size
        try {
            if (this.image.src && (this.state == null || this.state.includes(Game.state)) && (Game.state != RestartState && Game.state != PreloaderState)) {
                ctx.drawImage(
                    UIIcon.image,this.num*32,0,32,32,
                    this.x+((-(this.scale-1))*(this.width/2)),
                    this.y+((-(this.scale-1))*(this.height/2)),
                    this.width*this.scale,
                    this.height*this.scale
                );
            }
        } catch (e) {
            if (e instanceof TypeError) {
                ctx.drawImage(
                    UIIcon.image,this.num*32,0,32,32,
                    this.x+((-(this.scale-1))*(this.width/2)),
                    this.y+((-(this.scale-1))*(this.height/2)),
                    this.width*this.scale,
                    this.height*this.scale
                );
            }
        }
    }
}

class ItemDisplay extends Sprite {
    static image;
    static width = 32;
    constructor(x,y,scale,id) {
        super(x,y);
        this.id = id;
        this.width = this.height = ItemDisplay.width * scale;
        this.scale = scale;
        if (!ItemDisplay.image) {
            ItemDisplay.image = new Image();
            ItemDisplay.image.src = "img/looty.png"
        }
    }
    draw() {
        if (ItemDisplay.image.src) {
            ctx.drawImage(
                ItemDisplay.image,
                (this.id%8)*32, //column X
                Math.floor(this.id/8)*32, //row Y
                32,32,this.x,this.y,
                ItemDisplay.width*this.scale,
                ItemDisplay.width*this.scale
            );
        }
    }
}

class Toast extends Button{ //it just extends it for the click functionality.
    static name;
    static desc;
    static src;
    static targetX;
    static image = new Image();
    static iconOffset = {x:14,y:11};
    static icon;
    static dx;
    static dy;
    static onScreen = false;
    static onScreenLength = 4000;
    static onScreenTimer = Toast.onScreenLength;
    static imgWidth = 408;
    static imgHeight = 88;
    static onScreenX = canvas.width-Toast.imgWidth-2; //i dont know either
    static offScreenX = canvas.width;
    constructor(){
        super(Toast.offScreenX,canvas.height-Toast.imgHeight,Toast.imgWidth,Toast.imgHeight,"img/toast.png",function(){},"toast");
        this.selectable = false;
        this.isScalable = false;
    }
    static adjust(name,desc,src,dx,dy,onclick) {
        Toast.name = name;
        Toast.desc = desc;
        Toast.src = src;
        Toast.dx = dx;
        Toast.dy = dy;
        Game.toast.onclick = onclick; //oh this is so fucked up jesus christ come on
        Toast.onScreen = true;
        Toast.icon = new Image();
        Toast.icon.src = Toast.src;
        Toast.onScreenTimer = Toast.onScreenLength;
        Game.toast.x = 960;
    }
    static init() {
        if (!Toast.image.src) {
            Toast.image.src = "img/toast.png";
        }
    }
    animate(dt) {
        if (Toast.onScreen) {
            if (!this.selectable) {
                this.selectable = true;
            }
            Toast.onScreenTimer -= dt;
            if (Toast.onScreenTimer < Toast.onScreenLength-1 && Toast.onScreenTimer > 300) {
                Toast.targetX = Toast.onScreenX;
            } else if (Toast.onScreenTimer < 300) {
                Toast.targetX = Toast.offScreenX;
            }
            this.x = Math.ceil((this.x+this.x+Toast.targetX)/3);
        }
        if (Toast.onScreenTimer <= 0) {
            Toast.onScreen = false;
            Toast.onScreenTimer = Toast.onScreenLength;
            this.selectable = false;
        }
        if (Toast.icon) {
            ctx.drawImage(Toast.icon,Toast.dx,Toast.dy,32,32,this.x+Toast.iconOffset.x,this.y+Toast.iconOffset.y,64,64);
        }
        ctx.fillStyle = "black";
        ctx.font = "36px germar";
        ctx.fillText(Toast.name,this.x+88,this.y+40,304);
        ctx.font = "24px germar";
        ctx.fillText(Toast.desc,this.x+88,this.y+66,304);
        ctx.fillStyle = "white";
    }
    static hardReset() {
        Toast.onScreenTimer = 0;
        Toast.targetX = Toast.offScreenX;
        Game.toast.x = Toast.offScreenX;
    }
}

class SFX {
    static list = ["combine","crate-open","rare1","rare2","rare3","rare4","rare5","rare6","rare7","rare8","sell","rejected","achievement"];
    static library = {};
    static load() {
        SFX.list.forEach((sound)=>{
            SFX.library[sound]= new Audio(`sfx/${sound}.wav`);
            SFX.library[sound].load();
            SFX.library[sound].preload = "auto";
        })
    }
    static play(sound) {
        if (!SettingsState.sfx){return;}
        const origAudio = SFX.library[sound];
        const newAudio = origAudio.cloneNode();
        newAudio.play();
    }
}

class LootState {
    static luck = 0;
    static cloverTurnsLeft = 0;
    static isCrateMovingUp = false;
    static itemSeed = (Math.random() + LootState.luck)/(LootState.luck+1);
    static itemTier = LootState.getItemTier(LootState.itemSeed);
    static item = LootState.getItem(LootState.itemTier);
    static itemDisplay = new ItemDisplay(canvas.width/2-96,canvas.height/2-96,6,LootState.item.id);
    static crateMoveSpeed = 20;
    static crate = new Button(canvas.width/2 - 96, canvas.height/2 - 96, 192, 192, "img/crate.png",
        function() {
            this.selectable = false;
            LootState.isCrateMovingUp = true;
            Game.crates++;
            if (LootState.cloverTurnsLeft > 0) { LootState.cloverTurnsLeft--; } else { LootState.luck = 0; }
            if (LootState.item.name == "Clover") {
                LootState.cloverTurnsLeft = 15;
                if (Math.random()>0.98) {
                    LootState.luck = 777;
                } else {
                    LootState.luck = 25;
                }
            } else if (LootState.item.name == "Dandelion") {
                if ((new Date(Date.now()).getMinutes())==11 && (((new Date(Date.now()).getHours())==11) || ((new Date(Date.now()).getHours())==23))) { // checks if time = 11:11pm or 11:11am
                    LootState.luck = 777;
                    LootState.cloverTurnsLeft = 1;
                }
            }
            LootState.handleAchievements();
            ctx.font = "36px germar";
            LootState.textWidths.name = ctx.measureText(`${LootState.item.name} (${LootState.itemTier.name})`).width;
            ctx.font = "24px germar";
            LootState.textWidths.desc = ctx.measureText(`${LootState.item.desc} (${LootState.item.price})`).width;
            Game.credits--;
            SFX.play("crate-open");
            if (LootState.itemTier.id > 1) {
                SFX.play(`rare${Math.min(LootState.itemTier.id-1,8)}`)
            }
        },
        "crate",[LootState]
    );
    static textWidths = {name: 0,desc: 0};
    static init() {
        if (Game.credits < 1) {
            LootState.crate.selectable = false;
        } else {
            LootState.crate.selectable = true;
        }
    }
    static update() {
        LootState.itemDisplay.draw();
        ctx.globalCompositeOperation = "source-over";
        LootState.crate.draw(); 
        if (LootState.isCrateMovingUp) {
            LootState.crate.y -= LootState.crateMoveSpeed;
            ctx.fillStyle = "black";
            ctx.font = "36px germar";
            ctx.fillText(`${LootState.item.name} (${LootState.itemTier.name})`,
            canvas.width/2-Math.floor(LootState.textWidths.name/2),410);
            ctx.font = "24px germar";
            ctx.fillText(`${LootState.item.desc} (${LootState.item.price})`,
            canvas.width/2-Math.floor(LootState.textWidths.desc/2),438);
        }
    }
    static resetCrate() {
        LootState.crate.y = canvas.height/2 - 96;
        LootState.isCrateMovingUp = false;
        if (LootState.luck != 0 && LootState.cloverTurnsLeft == 0) { LootState.luck = 0; }
        LootState.itemSeed = (Math.random() + LootState.luck)/(LootState.luck+1);
        LootState.itemTier = LootState.getItemTier(LootState.itemSeed);
        LootState.item = LootState.getItem(LootState.itemTier);
        LootState.itemDisplay = new ItemDisplay(canvas.width/2-96,canvas.height/2-96,6,LootState.item.id);
        ctx.font = "36px germar"; 
        LootState.textWidths.name = ctx.measureText(`${LootState.item.name} (${LootState.itemTier.name})`).width;
        ctx.font = "24px germar";
        LootState.textWidths.desc = ctx.measureText(`${LootState.item.desc} (${LootState.item.price})`).width;
        if (Game.credits >= 1) { LootState.crate.selectable = true; }
    }
    static sell() {
        if (!LootState.isCrateMovingUp) {
            SFX.play("rejected");
            return;
        }
        Game.credits += LootState.item.price;
        if (LootState.luck != 0 && LootState.cloverTurnsLeft == 0) { LootState.luck = 0; }
        LootState.resetCrate();
        SFX.play("sell");
        LootState.handleAchievements();
    }
    static keep() {
        var id = Game.inventory.findIndex((item)=>item.name==LootState.item.name);
        if (id == -1) {
            Game.inventory.push({name: LootState.item.name, count: 1, id: LootState.item.id});
        } else {
            Game.inventory[id].count++;
        }
        if (Game.inventory.findIndex((item)=>item.name == "Dustbunny" && item.count == 100) != -1){
            LootState.handleAchievements("The Rabbit Hole");
        }
        if (Game.inventory.length == 64) {
            LootState.handleAchievements("I've Wasted My Life");
        }
        LootState.resetCrate();
    }
    //takes the item seed (0 to 1) and converts it into an item tier using the Items.tiers lookup table
    static getItemTier(seed) {
        var tier = Items.tiers.findIndex((tier) => seed < tier.rarity)-1;
        try {
            if (Game.cheats.everyRare && LootState.luck == 0){ return Items.tiers[5]; }
        } catch (e) {
            if (e instanceof ReferenceError) {
                return Items.tiers[tier];
            }
        }
        try {
            if (Game.cheats.topTiers) {
                return Items.tiers[Math.min(tier+7,10)];
            }
        } catch (e) {
            if (e instanceof ReferenceError) {
                return Items.tiers[tier];
            }
        }
        return Items.tiers[tier];
    }
    //takes a list of all items of the given tier and returns a random one
    static getItem(tier) {
        var filtered = Items.list.filter((item) => item.tier == tier.id);
        var item = filtered[Math.floor(Math.random()*filtered.length)];
        return item;
    }
    static keydown (e) {
        if (!LootState.isCrateMovingUp) { return; }
        if (e.repeat && !SettingsState.repeat) { return; }
        if (e.key === "z") {
            LootState.sell();
        } else if (e.key === "x") {
            LootState.keep();
        }
    }
    static handleAchievements(achievement=null) {
        if (achievement){
            Achievement.unlock(Game.findAchievement(achievement));
        }
        if (LootState.isCrateMovingUp){
            if (LootState.itemTier.id>=3) {
                Achievement.unlock(Game.findAchievement("Steak Your Claim"));
            }
            if (LootState.itemTier.id>=6) { 
                Achievement.unlock(Game.findAchievement("Not Bummer"));
            }
            if (LootState.itemTier.id>=7) {
                Achievement.unlock(Game.findAchievement("Next to Cleanliness"));
            }
            switch (LootState.item.name) {
                case "Toy Truck":
                    Achievement.unlock(Game.findAchievement("Toot Toot!"));
                    break;
                case "Snail":
                    Achievement.unlock(Game.findAchievement("Lettuce Give Thanks"));
                    break;
                case "Chocolate Cake":
                    Achievement.unlock(Game.findAchievement("When In Rome"));
                    break;
                case "Chocolate Cake Slice":
                    Achievement.unlock(Game.findAchievement("How You Slice It"));
                    break;
                case "Clover":
                    Achievement.unlock(Game.findAchievement("Your Lucky Day"));
                    break;
                case "Dollar":
                    Achievement.unlock(Game.findAchievement("Boss Gets a Dollar"));
                default:
                    break;
            }
        }
        if (Game.credits >= 100) {
            Achievement.unlock(Game.findAchievement("Me First Dollar"));
        }
        if (Game.credits >= 10000) {
            Achievement.unlock(Game.findAchievement("That's Rich, I'll Say."));
        }
        if (Game.credits >= 1000000) {
            Achievement.unlock(Game.findAchievement("Who Wants to Be"));
        }
        if (Game.crates == 1) {
            Achievement.unlock(Game.findAchievement("Lootcreate"));
        }
        if (Game.crates == 100) {
            Achievement.unlock(Game.findAchievement("Pierce Your Skin"));
        }
        if (Game.crates == 1000) {
            Achievement.unlock(Game.findAchievement("With Crate Power"));
        }
        if (Game.crates == 10000) {
            Achievement.unlock(Game.findAchievement("The Crate Beyond"));
        }
    }
}

class CombineState {
    static selectedRecipe = 0;
    static currentRecipe;
    static currentRecipeDisplay;
    static usableList = [];
    static showUsableOnly = false;
    static textWidths = {};
    static nameText;
    static descText = "";
    static lock = new Sprite(canvas.width/2-96,canvas.height/2-96,192,192,"img/lock.png");
    static init(isReturning) {
        if (CombineState.showUsableOnly) {
            CombineState.usableList = Recipe.list.filter((recipe)=>recipe.canAfford())
        } else {
            if (CombineState.selectedRecipe<0) {
                CombineState.selectedRecipe=0;
            }
        }
        CombineState.selectedRecipe=isReturning?0:(CombineState.showUsableOnly?Math.min(Math.max(CombineState.selectedRecipe,0),CombineState.usableList.length-1):CombineState.selectedRecipe);
        CombineState.currentRecipe = (CombineState.showUsableOnly?CombineState.usableList:Recipe.list)[CombineState.selectedRecipe];
        try {
            CombineState.currentRecipeDisplay = new ItemDisplay(canvas.width/2-96,canvas.height/2-96,6,CombineState.currentRecipe.output.id);
        } catch (e) {
            if (e instanceof TypeError) {
                CombineState.currentRecipeDisplay = new ItemDisplay(canvas.width/2-96,canvas.height/2-96,6,4);
            }
        }
        try {
            CombineState.nameText = `${Items.list.find((item)=>item.id == CombineState.currentRecipe.output.id).name}${CombineState.currentRecipe.output.count>1?` (x${CombineState.currentRecipe.output.count})`:""}`
        } catch (e) {
            if (e instanceof TypeError) {
                CombineState.nameText = "No usable recipes!";
            }
        }
        ctx.font = "36px germar";
        CombineState.textWidths.name = ctx.measureText(CombineState.nameText).width;
        CombineState.descText="";
        try {
            CombineState.currentRecipe.elements.forEach((ingredient,index)=>{
                CombineState.descText += `${Items.list.find((item)=>item.id == ingredient.id).name}${ingredient.count==1?"":` (x${ingredient.count})`}${(index == CombineState.currentRecipe.elements.length-1)?"":" + "}`;
            })
        } catch (e) {
            if (e instanceof TypeError) {
                CombineState.descText = "Click on the crate and press X to gather loot to combine!";
            }
        }
        ctx.font = "24px germar";
        CombineState.textWidths.desc = ctx.measureText(CombineState.descText).width;
        InvState.prev.selectable = CombineState.selectedRecipe > 0;
        InvState.next.selectable = !(CombineState.selectedRecipe + 1 >= (CombineState.showUsableOnly?CombineState.usableList:Recipe.list).length);
    }
    static update() {
        ctx.fillStyle = "black";
        ctx.font = "36px germar";
        ctx.fillText(CombineState.nameText, canvas.width/2-Math.floor(CombineState.textWidths.name/2),410)
        CombineState.currentRecipeDisplay.draw();
        if (CombineState.usableList.length || !CombineState.showUsableOnly) {
            if (!CombineState.currentRecipe.canAfford()) {
                CombineState.lock.draw();
            }
        }
        ctx.font = "24px germar";
        if (CombineState.usableList.length || !CombineState.showUsableOnly) {
            ctx.fillStyle = CombineState.currentRecipe.canAfford()?"black":"red";
        }
        ctx.fillText(CombineState.descText, canvas.width/2-Math.floor(CombineState.textWidths.desc/2),438)
        ctx.fillStyle = "white";
        InvState.prev.draw();
        InvState.next.draw();
    }
    static toggleUsableOnly() {
        CombineState.showUsableOnly = !CombineState.showUsableOnly;
        CombineState.init(false);
    }
}

class InvState {
    static selectedIndex = 0;
    static currentItem;
    static currentItemDisplay;
    static adjacentItemDisplays = [];
    static itemName;
    static itemNameWidth;
    static itemDesc;
    static itemDescWidth;
    static next = new Button(891,canvas.height/2-32,64,64,"img/next.png",function() {
        if (Game.state == InvState) {
            if (InvState.selectedIndex+1==Game.inventory.length) { return; }
            InvState.selectedIndex++;
        } else if (Game.state == CombineState) {
            if (CombineState.selectedRecipe+1==Recipe.list.length) { return; }
            CombineState.selectedRecipe++;
        }
        Game.state.init(false);
    },"invNext",[InvState,CombineState]);
    static prev = new Button(5,canvas.height/2-32,64,64,"img/previous.png",function() {
        if (Game.state == InvState) {
            if (InvState.selectedIndex == 0) { return; }
            InvState.selectedIndex--;
        } else if (Game.state == CombineState) {
            if (CombineState.selectedRecipe == 0) { return; }
            CombineState.selectedRecipe--;
        }
        Game.state.init(false);
    },"invPrev",[InvState,CombineState]);
    static init(isReturning) {
        InvState.selectedIndex=isReturning?0:Math.min(Math.max(InvState.selectedIndex,0),Game.inventory.length-1);
        InvState.adjacentItemDisplays = [];
        if (Game.inventory.length) {
            var hardCodedPos = [142,246,0,614,718]
            InvState.currentItem = Items.list[Game.inventory[InvState.selectedIndex].id];
            InvState.currentItemDisplay = new ItemDisplay(canvas.width/2-96,canvas.height/2-96,6,InvState.currentItem.id);
            for (let i = -2; i <= 2; i++) {
                if (i == 0) { continue; }
                if (Game.inventory[InvState.selectedIndex+i]) {
                    var loopItem = Items.list[Game.inventory[InvState.selectedIndex+i].id];
                    InvState.adjacentItemDisplays.push(new ItemDisplay(hardCodedPos[i+2],canvas.height/2-48,3,loopItem.id));
                } else {
                    InvState.adjacentItemDisplays.push(new ItemDisplay(hardCodedPos[i+2],100,3,4));
                }
            }
        } else {
            InvState.currentItem = null;
            InvState.currentItemDisplay = new ItemDisplay(canvas.width/2-96,canvas.height/2-96,6,4);
        }
        if (Game.state == InvState) {
            InvState.prev.selectable = InvState.selectedIndex > 0;
            InvState.next.selectable = !(InvState.selectedIndex + 1 >= Game.inventory.length);
        } else if (Game.state == CombineState) {
            InvState.prev.selectable = CombineState.selectedRecipe > 0;
            InvState.next.selectable = !(CombineState.selectedRecipe + 1 >= Recipe.list.length);
        }
    }
    static update() {
        ctx.fillStyle = "black";
        if (Game.inventory.length){
            InvState.itemName = `${InvState.currentItem.name} (x${Game.inventory[InvState.selectedIndex].count})`;
            InvState.itemDesc = `${InvState.currentItem.desc} (${InvState.currentItem.price} credit${InvState.currentItem.price==1?"":"s"}) `;
        } else {
            InvState.itemName = "Inventory empty!";
            InvState.itemDesc = "Click on the crate and press X to keep some loot in your inventory!";
        }
        InvState.currentItemDisplay.draw();
        InvState.adjacentItemDisplays.forEach((display)=>display.draw());
        if (LootState.cloverTurnsLeft == 0) {
            ctx.globalCompositeOperation = "lighter";
            ctx.fillStyle="#888";
            ctx.fillRect(119,196,251,155);
            ctx.fillRect(600,197,236,149);
            ctx.fillStyle="black";
            ctx.globalCompositeOperation = "source-over";
        }
        ctx.font = "36px germar";
        InvState.itemNameWidth = ctx.measureText(InvState.itemName).width;
        ctx.fillText(InvState.itemName,Math.floor(canvas.width/2-InvState.itemNameWidth/2),410);
        ctx.font = "24px germar";
        InvState.itemDescWidth = ctx.measureText(InvState.itemDesc).width;
        ctx.fillText(InvState.itemDesc,Math.floor(canvas.width/2-InvState.itemDescWidth/2),438);
        InvState.prev.draw();
        InvState.next.draw();
    }
    static sell() {
        if (!Game.inventory.length) { return; }
        Game.credits += InvState.currentItem.price;
        if (InvState.currentItem.name == "Unknown Pill") {
            LootState.handleAchievements("Shady Dealings");
        } else if (InvState.currentItem.name == "Penny") {
            LootState.handleAchievements("Take a Penny");
        }
        if (Game.inventory[InvState.selectedIndex].count-1==0) {
            Game.inventory.splice(InvState.selectedIndex,1);
            if (InvState.selectedIndex==Game.inventory.length) {
                InvState.selectedIndex--;
            }
        } else {
            Game.inventory[InvState.selectedIndex].count--;
        } 
        InvState.init(false);
        SFX.play("sell");
        LootState.handleAchievements();
    }
    static keydown (e) {
        if (e.key === "z" && !(e.repeat && !SettingsState.repeat)) {
            InvState.sell();
        }
    }
}

class CheatingState {
    static cheatcode = "";
    static mobileWarning = [
        "I tried adding functionality for cheat codes on mobile, I genuinely did,",
        "I swear... but it's just too difficult for me. I'm done trying. If you",
        "want to cheat, and I wholeheartedly recommend it, please just load this",
        "website up on a PC and play the game there. I really hope you understand!"
    ];
    static init() {
        CheatingState.cheatcode = "";
    }
    static update() {
        ctx.fillStyle = "black";
        ctx.textAlign = "center"; 
        if (!mobile) {
            ctx.font="36px germar"
            ctx.fillText("Insert Cheat Code!",canvas.width/2,238);
            ctx.fillText(CheatingState.cheatcode,canvas.width/2,282);
            ctx.strokeStyle="black";
            ctx.lineWidth = 2;
            ctx.strokeRect(Math.floor(canvas.width/2-(ctx.measureText(CheatingState.cheatcode).width/2)-8),250,Math.floor(ctx.measureText(CheatingState.cheatcode).width+16),40);
            ctx.strokeStyle="white";
            ctx.lineWidth = 1;
        } else {
            CheatingState.mobileWarning.forEach((line,i)=>{
                ctx.fillText(line,canvas.width/2,225+i*30);
            })
        }
        ctx.textAlign = "left";
        ctx.font="24px germar"
        ctx.fillStyle="white";
    }
    static keydown (e) {
        if (e.key.length==1 && e.key.charCodeAt(0) >= 97 && e.key.charCodeAt(0) <= 122) {
            CheatingState.cheatcode+=e.key.toString();
            ctx.font="36px germar"
            CheatingState.cheatcodeWidth=ctx.measureText(CheatingState.cheatcode).width;
            ctx.font="24px germar"
        }
        if (e.key === "Enter") {
            if (CheatingState.cheatcode === "alandwhereitrainsmoney") {
                Game.state = LootState;
                Game.credits += 1000000;
                LootState.init();
            } else if (CheatingState.cheatcode === "luckyluckyluckyluckyluckyluckboy") {
                Game.state = LootState;
                Game.cheats.topTiers = true;
                LootState.init();
                LootState.resetCrate();
            } else if (CheatingState.cheatcode === "ethically") {
                Game.state = LootState;
                Achievement.unlock(34);
                LootState.init();
            } else if (CheatingState.cheatcode === "everyrare") {
                Game.state = LootState;
                Game.cheats.everyRare = true;
                LootState.init();
                LootState.resetCrate();
            } else if (CheatingState.cheatcode === "seventhcommandment") {
                Game.state = LootState;
                for (const [key,cheat] of Object.entries(Game.cheats)) {
                    Game.cheats[key]=false;
                }
                LootState.init();
                LootState.resetCrate();
            }
        }
        if (e.key === "Backspace") {
            e.preventDefault();
            CheatingState.cheatcode = CheatingState.cheatcode.substring(0,CheatingState.cheatcode.length-1);
        }
    }
}

class RestartState {
    static restartWarning = "Wipe your progress and restart? (y/n)"
    static restartWarningWidth;
    static confirmRestart = new Button(canvas.width/2 - 188,canvas.height/2,128,128,"img/confirm.png",function(){
        RestartState.restart();
        Game.state = LootState;
    },"confirmRestart",[RestartState]);
    static cancelRestart = new Button (canvas.width/2 + 60,canvas.height/2,128,128,"img/cancel.png",function(){
        Game.state = LootState;
    },"cancelRestart",[RestartState]);
    static init() {
        ctx.font = "36px germar";
        RestartState.restartWarningWidth = ctx.measureText(RestartState.restartWarning).width;
        ctx.font = "24px germar";
    }
    static restart() {
        Game.credits = 15;
        Game.crates = 0;
        Game.inventory = [];
        //thank you gurvinder372
        Object.keys(Game.cheats).forEach(function(cheat){Game.cheats[cheat]=false});
        Game.achievements = [];
        LootState.init();
        LootState.resetCrate();
    }
    static update() {
        ctx.font = "36px germar";
        ctx.fillStyle = "black";
        ctx.fillText(RestartState.restartWarning,Math.floor((canvas.width/2)-(RestartState.restartWarningWidth/2)),166);
        ctx.fillStyle = "white";
        RestartState.confirmRestart.draw();
        RestartState.cancelRestart.draw();
        ctx.font = "24px germar";
    }
}

class PreloaderState {
    static acceptCookies = new Button(canvas.width/2-210,canvas.height/2+36,192,72,"img/cookies.png",function(){
        localStorage.setItem("lootcreate_CookiesAccepted","yes");
        Game.autosave = true;
        Game.state = LootState;
        LootState.init();
        SettingsState.load();
    },"cookies",[PreloaderState]);
    static declineCookies = new Button(canvas.width/2+10,canvas.height/2+36,192,72,"img/cookies2.png",function() {
        Game.autosave = false;
        Game.state = LootState;
        LootState.init();
        SettingsState.load();
    },"declinecookies",[PreloaderState])
    static cookieNoticeLines = ["This game uses cookies to save game progress when indicated.","Cookies are only used if you consent to them by pressing \"Accept.\"","Otherwise, cookies will not be used and your progress will not be saved.","You can also manage cookie preferences through settings in-game."]
    static cookieNoticeY = canvas.height/2 - 60;
    static lineWidths = [];
    static init() {
        ctx.font = "24px germar";
        PreloaderState.cookieNoticeLines.forEach((line,i)=>{
            PreloaderState.lineWidths[i]=ctx.measureText(line).width;
        })
    }
    static update() {
        ctx.font = "24px germar";
        ctx.fillStyle = "black";
        PreloaderState.cookieNoticeLines.forEach((line,i)=>{
            ctx.fillText(line,canvas.width/2-PreloaderState.lineWidths[i]/2,PreloaderState.cookieNoticeY+(24*i));
        })
        ctx.fillStyle = "white";
        PreloaderState.acceptCookies.draw();
        PreloaderState.declineCookies.draw();
    }
}

class Toggle extends Button {
    static x = canvas.width/2 + 20;
    value;
    constructor(y,id,state,onclick,initialValue) {
        super(Toggle.x,y,128,64,`img/toggle-${initialValue}.png`,function() {
            this.value = !this.value;
            this.image.src = `img/toggle-${this.value}.png`;
            onclick();
            Game.saveGame(false,false);
        },id,state);
        this.value = initialValue;
    }
}

class SettingsState {
    static sfx = true;
    static repeat = false;
    static cookies;
    static optionNames = ["SFX","Repeat Keystrokes","Cookies"]
    static optionNamesYMargin = 32;
    static toggleOffsets = [-106,-32,42];
    static toggles = {};
    static load() {
        SettingsState.toggles = {
            sfx: new Toggle(canvas.height/2+this.toggleOffsets[0],"sfx",[SettingsState],function() {
                SettingsState.sfx = !SettingsState.sfx;
            },SettingsState.sfx),
            repeat: new Toggle(canvas.height/2+this.toggleOffsets[1],"repeat",[SettingsState],function() {
                SettingsState.repeat = !SettingsState.repeat;
            },SettingsState.repeat)
        };
        SettingsState.cookies = Game.autosave;
        SettingsState.toggles.cookies = new Toggle(canvas.height/2+this.toggleOffsets[2],"cookiesIG",[SettingsState],function() {
            SettingsState.cookies = !SettingsState.cookies;
            if (SettingsState.cookies) {
                localStorage.setItem("lootcreate_CookiesAccepted","yes");
                Game.autosave = true;
            } else {
                localStorage.clear();
                Game.autosave = false;
            }
        },Game.autosave)
    }
    static update() {
        for (const [key,toggle] of Object.entries(SettingsState.toggles)){
            toggle.draw();
        }
        SettingsState.optionNames.forEach((name,i)=>{
            // this was RIGHT at the end of dev when i found out you could use textAlign and textBaseline.
            // FINALLY!!
            ctx.fillStyle = "black";
            ctx.textBaseline = "middle";
            ctx.textAlign="right";
            ctx.fillText(name,canvas.width/2-20,canvas.height/2+this.toggleOffsets[i]+this.optionNamesYMargin);
            ctx.textAlign="left";
            ctx.fillStyle = "white";
            ctx.textBaseline="alphabetic";
        })
        ctx.fillStyle="black";
        ctx.textAlign="center";
        ctx.font = "24px germar";
        ctx.fillText("Settings",Math.ceil(canvas.width/2),125);
        ctx.fillText("WARNING: Turning off cookies will wipe game progress unless",canvas.width/2,410);
        ctx.fillText("you turn them back on and save the game before returning!",canvas.width/2,438);
        ctx.textAlign="left";
        ctx.fillStyle="white";
    }
}

class AchievementState {
    static selected = 0;
    static image = new Image();
    static lock = new Sprite(554,150,192,192,"img/lock.png");
    static up = new Button(118,65,164,46,"img/up.png",function(){
        AchievementState.selected = AchievementState.selected==0?Achievement.list.length-1:AchievementState.selected-1
    },"achievementUp",[AchievementState]);
    static down = new Button(118,406,164,46,"img/down.png",function(){
        AchievementState.selected = AchievementState.selected==Achievement.list.length-1?0:AchievementState.selected+1
    },"achievementDown",[AchievementState])
    static init() {
        AchievementState.image.src = "img/looty.png";
    }
    static update() {
        ctx.fillStyle="black";
        for (let i=this.selected-4; i<=this.selected+4; i++) {
            var index = (i<0?Achievement.list.length+i:i)%Achievement.list.length;
            ctx.font = i==this.selected?"36px germar":"24px germar";
            ctx.textAlign = "center";
            ctx.fillText((!Game.achievements.includes(index)?"🔒 ":"")+Achievement.list[index].name,200,(i==this.selected?149:(i<this.selected?139:154))+(30*(i-this.selected+4)));
            ctx.textAlign = "left";
        }
        ctx.fillStyle="white";
        this.up.draw();
        this.down.draw();
        ctx.textAlign = "center";
        ctx.fillStyle="black";
        ctx.fillText(Achievement.list[this.selected].desc,650,400);
        ctx.font = "36px germar";
        ctx.fillText(Game.achievements.includes(this.selected)?"(UNLOCKED)":"(LOCKED)",650,436);
        ctx.drawImage(AchievementState.image,32*Achievement.list[this.selected].col,32*Achievement.list[this.selected].row,32,32,554,150,192,192);
        if(!Game.achievements.includes(this.selected)){
            this.lock.draw();
        }
        ctx.fillStyle="white";
        ctx.textAlign = "left";
        ctx.font = "24px germar";
    }
    static keydown(e) {
        if (e.key==="ArrowUp") {
            this.selected = this.selected==0?Achievement.list.length-1:this.selected-1
        } else if (e.key==="ArrowDown") {
            this.selected = this.selected==Achievement.list.length-1?0:this.selected+1
        }
    }
}

class Game {
    static state = localStorage.getItem("lootcreate_CookiesAccepted")=="yes"?LootState:PreloaderState;
    static autosave = localStorage.getItem("lootcreate_CookiesAccepted")=="yes";
    static cheats = {
        topTiers: false,
        everyRare: false
    }
    static achievements = [];
    static inventory = [];
    static uiIcons = {
        loot: new UIIcon(5,471,function() {
            Game.state = LootState;
            LootState.init();
        },0,"loot"),
        inventory: new UIIcon(75,471,function() {
            Game.state = InvState;
            InvState.init(true);
        },1,"inventory"),
        combine: new UIIcon(145,471,function() {
            Game.state = CombineState;
            CombineState.init(true);
        },2,"combine"),
        sell: new UIIcon(215,471,function() {
            if (Game.state == LootState) {
                LootState.sell();
            } else if (Game.state == InvState) {
                InvState.sell();
            }
        },3,"sell",[LootState,InvState]),
        keep: new UIIcon(285,471,function() {
            if (Game.state == LootState) {
                LootState.keep();
            }
        },4,"keep",[LootState]),
        restart: new UIIcon(5,401,function() {
            Game.state = RestartState;
            RestartState.init();
        },5,"restart",[LootState]),
        cheat: new UIIcon(5,335,function() {
            Game.state = CheatingState;
            CheatingState.init();
        },6,"cheat",[LootState]),
        combineItems: new UIIcon(211,471,function() {
            CombineState.currentRecipe.combine();
        },7,"combineItems",[CombineState]),
        usableOnly: new UIIcon(281,471,function() {
            this.num=(this.num==8)?9:8; // switch texture
            CombineState.toggleUsableOnly();
        },8,"usableOnly",[CombineState]),
        settings: new UIIcon(5,271,function() {
            Game.state = SettingsState;
        },10,"settings",[LootState]),
        save: new UIIcon(215,471,function(){Game.saveGame(true,false)},11,"save",[SettingsState]),
        achievements: new UIIcon(5,200,function() {
            Game.state = AchievementState;
            AchievementState.init();
        },12,"achievements",[LootState])
    }
    static credits = 15;
    static crates = 0;
    static toast = new Toast();
    static last;
    static dt;
    static autoSaveInterval = 30000;
    static update() {
        for (const [key,icon] of Object.entries(Game.uiIcons)){
            icon.draw();
        }
        Game.state.update();
    }
    static resetScreen() {
        ctx.globalCompositeOperation = "source-over";
        ctx.fillStyle = "white";
        ctx.fillRect(0,0,960,540)
        ctx.font = "24px germar";
        ctx.fillStyle = "black"
        if (Game.state != RestartState && Game.state != PreloaderState) {
            ctx.fillText(`Credits: ${Game.credits}`,5,24);
            ctx.fillText("Lootcreate 1.4.02",5,48);
            if (LootState.cloverTurnsLeft>0) {
                ctx.fillText(`${LootState.luck==777?"Godly":"Lucky"} Turns Left: ${LootState.cloverTurnsLeft}`,5,72);
            }
        }
        if (LootState.cloverTurnsLeft>0) {
            ctx.globalCompositeOperation = "multiply";
            ctx.fillStyle = LootState.luck==777?"#ff0":"#0f0";
            ctx.fillRect(0,0,960,540)
        }
        ctx.fillStyle = "white";
    }
    static setState(state) {
        //guard clause in the case where state isn't a class
        if (typeof(state) != "function") { return; }
        Game.state = state;
    }
    static saveGame(indicate,auto) {
        if (!Game.autosave) { return; }
        if (!SettingsState.cookies) { return; }
        var saveData = {
            inventory: Game.inventory,
            credits: Game.credits,
            crates: Game.crates,
            settings: {
                sfx: SettingsState.sfx,
                repeat: SettingsState.repeat
            },
            cheats: Game.cheats,
            achievements: Game.achievements
        }
        var expire = new Date();
        expire.setDate(expire.getDate()+30);
        localStorage.setItem("saveData", JSON.stringify(saveData));
        if (indicate && !Toast.onScreen) {
            Toast.adjust("Saved Game",`${auto?"Auto-s":"S"}aved your progress!`,"img/crate.png",0,0,null);
        }
    }
    static loadGame() {
        try {
            var loadData = JSON.parse(localStorage.getItem("saveData"));
            Game.inventory = loadData.inventory;
            Game.credits = loadData.credits;
            Game.crates = loadData.crates;
            Game.cheats = loadData.cheats;
            SettingsState.sfx = loadData.settings.sfx;
            SettingsState.repeat = loadData.settings.repeat;
            Game.achievements = loadData.achievements;
        } catch (e) {
            if (e instanceof TypeError) {
                console.log("No savedata!");
            }
        }
    }
    static findAchievement(name){
        return Achievement.list.findIndex((achievement)=>achievement.name==name);
    }
    static arrayEquals(a, b) { //thanks flexiple.com
        return Array.isArray(a) &&
            Array.isArray(b) &&
            a.length === b.length &&
            a.every((val, index) => val === b[index]);
    }    
}

function update() {
    Game.resetScreen();
    Game.update();
    Game.dt = Date.now() - Game.last;
    if (!mobile) {
        Button.buttons.forEach((button) => {button.update();});
        Button.staticUpdate();
    }
    Game.toast.update();
    Game.toast.draw();
    Game.toast.animate(Game.dt);
    Game.last = Date.now();
}

function init() {
    Mouse.init();
    document.addEventListener("keydown", (e) => Game.state.keydown(e));
    PreloaderState.init();
    document.addEventListener("blur", (e)=>{
        Toast.hardReset();
    })
    Recipe.list.sort((a,b)=>a.output.id - b.output.id)
    SFX.load();
    Game.loadGame();
    LootState.resetCrate();
    if (Game.autosave) { SettingsState.load(); }
    setInterval(update);
    if (Game.state == LootState) { LootState.init(); }
    // starts saving game every 30 seconds after 30 seconds
    setTimeout(setInterval(function() {
        if(document.hasFocus() && Game.autosave) {
            Game.saveGame(true,true);
        }
    },Game.autoSaveInterval),Game.autoSaveInterval);
}

init();