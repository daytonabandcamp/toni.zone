class Achievement {
    static list = [
        {name: "Toot Toot!",desc:"It's your first toy truck!",col:5,row:2},
        {name: "But This Delicious Nut",desc:"...is not a nut!",col:1,row:3},
        {name: "Another Nickel",desc:"It's not that funny.",col:1,row:1},
        {name: "BARGINGO.COM!!!!",desc:"You'll get the flimdzies!",col:6,row:3},
        {name: "Cookie Pharmacy",desc:"Put a pill in your cookie!",col:0,row:3},
        {name: "Give a Hoot",desc:"Be green and plant a tree!",col:3,row:3},
        {name: "Lettuce Give Thanks",desc:"Have you seen this snail?",col:0,row:1},
        {name: "Boss Gets a Dollar",desc:"I get a dime.",col:2,row:4},
        {name: "But Of Quartz!",desc:"Make a dollar mining quartz.",col:5,row:1},
        {name: "99 and One Pennies",desc:"I needed CHANGE for this DOLLAR.",col:7,row:0},
        {name: "But a Tin Can",desc:"Reduce, reuse & recycle! Cha!",col:6,row:0},
        {name: "Ferret to Parrot",desc:"Transmogrify an animal!",col:1,row:4},
        {name: "Whole Lotta Nothing",desc:"Magically form a clover!",col:5,row:4},
        {name: "Found Media",desc:"Repair a cool comic!",col:6,row:4},
        {name: "Trading Up",desc:"Trade nickels for an hPhone 16!",col:7,row:5},
        {name: "H2O",desc:"Just add water!",col:1,row:5},
        {name: "When In Rome",desc:"Let them eat cake.",col:1,row:6},
        {name: "If He Cuts the Tree",desc:"He gets the fruit free!",col:0,row:6},
        {name: "To The Good Old Days",desc:"Restore a comic completely!",col:1,row:7},
        {name: "End of the Line",desc:"The fashion line, that is!",col:2,row:7},
        {name: "The Red Pill",desc:"Make a Bayer Matrix Cube!",col:6,row:7},
        {name: "Make Me!",desc:"Make the programmer!",col:7,row:7},
        {name: "Lootcreate",desc:"Open 1 crate.",col:7,row:0},
        {name: "Pierce Your Skin",desc:"Open 100 crates.",col:2,row:4},
        {name: "With Crate Power",desc:"Open 1,000 crates.",col:5,row:5},
        {name: "The Crate Beyond",desc:"Open 10,000 crates.",col:2,row:7},
        {name: "Me First Dollar",desc:"Hoard 100 credits!",col:2,row:4},
        {name: "That's Rich, I'll Say.",desc:"Hoard 10,000 credits!",col:0,row:7},
        {name: "Who Wants to Be",desc:"Hoard 1,000,000 credits!",col:7,row:6},
        {name: "Shady Dealings",desc:"Sell an unknown pill...",col:0,row:3},
        {name: "The Rabbit Hole",desc:"Procure 100 dustbunnies!",col:0,row:0},
        {name: "Steak Your Claim",desc:"Find some rare loot!",col:7,row:3},
        {name: "Not Bummer",desc:"Find some mega rare loot!",col:7,row:5},
        {name: "Next to Cleanliness",desc:"Find some godly loot!",col:2,row:6},
        {name: "Where U Goin' 2",desc:"Cheat ethically!",col:7,row:1},
        {name: "Take a Penny",desc:"Leave a penny.",col:7,row:0},
        {name: "Your Lucky Day",desc:"Find a four-leaf clover!",col:5,row:4},
        {name: "How You Slice It",desc:"Find a chocolate cake slice!",col:4,row:5},
        {name: "I've Wasted My Life",desc:"Have every item at once.",col:7,row:7}
    ]
    static unlock(id){
        if(Game.achievements.includes(id)){ return; }
        Toast.adjust(Achievement.list[id].name,Achievement.list[id].desc,Achievement.list[id].src||"img/looty.png",32*Achievement.list[id].col,32*Achievement.list[id].row,function(){console.log("Awesome");}); 
        Game.achievements.push(id);
        Game.saveGame(false,true);
        SFX.play("achievement");
    }
}