class Item {
    constructor(tier,name,desc,id,price){
        this.tier = tier; //number
        this.name = name; //string
        this.desc = desc; //string
        this.id = id; //number
        this.price = price; //number
    }
}

class Items {
    static tiers = [
        {name: "also quite stupid",rarity: -99,id:-2},
        {name: "Common",rarity: 0,id:0},
        {name: "Unremarkable",rarity: 0.8,id:1},
        {name: "Uncommon",rarity: 0.95,id:2}, //sfx1
        {name: "Rare",rarity: 0.99,id:3}, //sfx2 
        {name: "Very Rare",rarity: 0.995,id:4}, //sfx3
        {name: "Ultra Rare",rarity: 0.999,id:5}, //sfx4
        {name: "Mega Rare",rarity: 0.9995,id:6}, //sfx5
        {name: "Godly",rarity: 0.9998,id:7}, //sfx6
        {name: "Very Godly",rarity: 0.9999,id:8}, //sfx7
        {name: "Ultra Godly",rarity: 0.99995,id:9}, //sfx8
        {name: "Mega Godly",rarity: 0.99998,id:10}, //sfx8
        {name: "stupid",rarity: 99,id:11}
    ];
    static list = [
        new Item(0,"Dustbunny","The most common of all dusty lagomorphs!",0,0),
        new Item(0,"Block of Lint","Stop forgetting to clean the lint trap! Jeez!",1,0),
        new Item(0,"Broken Glass","Opa!",2,0),
        new Item(0,"Splinterwood","Wood you believe it?",3,1),
        new Item(0,"Nothing","Impressive!",4,0),
        new Item(0,"Pebble","Are you stoned right now?",5,0),
        new Item(0,"Tin Can","Actually, it's worse at boxing than a match!",6,2),
        new Item(0,"Penny","Ahh, yes! Rusty and dull!",7,1),
        new Item(1,"Lettuce","...We can clean that off, right?",8,3),
        new Item(1,"Nickel","Made of 25% nickel, guaranteed!",9,5),
        new Item(1,"Pickle","The funniest thing I've ever seen!",10,5),
        new Item(1,"Feather","Pretty! Pretty useless.",11,0),
        new Item(1,"Water Bottle","So let's all take a drink!",12,6),
        new Item(1,"Quartz",'Who likes "quartz" pangrams? Fox cubs do, jovially!',13,3),
        new Item(1,"Feldspar","It's like your own little canyon-looking thing!",14,2),
        new Item(1,"Crab Shell","Arrr-ar-ar-ar-ar-ar!",15,10),
        new Item(1,"Dandelion","Make a wish! If it's 11:11, it'll come true!",16,1),
        new Item(1,"Chocolate Chip","Now all you need is chocolate dip.",17,4),
        new Item(1,"Citrus Slice","Is it an orange? A lemon? It's up to yuzu!",18,10),
        new Item(1,"Ice Cube","Straight from the underground!",19,6),
        new Item(2,"Rainbow Feather","Must've dropped from some kind of a queer duck.",20,10),
        new Item(2,"Toy Truck","One can never know the kind of trucky happiness that awaits with one.",21,12),
        new Item(2,"Infected Cookie","Yuck!",22,0),
        new Item(2,"Snail Shell","Sell, sell, sell all these shell, shell, shells!",23,7),
        new Item(2,"Unknown Pill","Oh barnacles, I hate the pill!",24,15),
        new Item(2,"Citrus Fruit","Yum! Round, yellowy-orange... ambiguous goodness.",25,25),
        new Item(2,"Torn-Up Cool Comic","It's old, it's rare, but nobody cares.",26,2),
        new Item(2,"Citrus Tree","Oxygen and timber. What more could you ever want?",27,13),
        new Item(2,"Beanie","The lowest-maintenance hat! Just put it on and go!",28,30),
        new Item(3,"Berry Pie Slice","Careful! It's hard to tell boysenberries from poison-berries!",29,40),
        new Item(3,"Bargingo","Is it a flimdi or a flingy?",30,16),
        new Item(3,"Chocolate Chip Cookie","You bake them! Unlike bacon, which you cook.",31,20),
        new Item(3,"Snail","It seems to have covered the box in a distinct shade of slime!",32,35),
        new Item(3,"Exotic Ferret","The longest loot in the game!",33,50),
        new Item(4,"Dollar","Usually worth less than the euro, but always exactly 100 credits!",34,100),
        new Item(4,"Snapback","You gotta go to chapter every week to see your brothers.",35,75),
        new Item(4,"Parrot",'It sounds like "pirate," but the two are just tangentially related!',36,120),
        new Item(4,"Clover","Some people say I look like me dad. (YOUR LUCK HAS IMPROVED!)",37,100),
        new Item(4,"Cool Comic","Probably about Lion-Man or Super-Dog or something. Quite valuable!",38,100),
        new Item(5,"Video Game Toy","If his name were \"Bo,\" he'd say \"It's a-me, Bo!\"",39,100),
        new Item(5,"Retro Handheld","It's so lovable, even if the battery is corroded and unusubale!",40,250),
        new Item(5,"Fictional Squid Figurine","Vee-my!",41,140),
        new Item(5,"Berry Pie","The whole enchilada! ...That expression might not be very fitting.",42,160),
        new Item(5,"Antivirus Software","Protects against adware, most of which is just built-in nowadays!",43,250),
        new Item(5,"Chocolate Cake Slice","One is just never enough...",44,200),
        new Item(6,"Laptop Computer","Weighs in at an extremely portable 42 pounds!",45,300),
        new Item(6,"Fedora","Be-bop-ba-bodda-bope, bop-ba-bodda-bope!",46,400),
        new Item(6,"hPhone 16","Made to break after a year or two so it's easier to peddle the next one!",47,500),
        new Item(6,"Palm Tree","Can you believe some people have never seen one of these before?",48,750),
        new Item(7,"Chocolate Cake","Desserts like this tend to be dishonest, but this one's the whole truth!",49,1000),
        new Item(7,"Motorcycle","Very popular among circus clowns inside cramped metal globes!",50,4000),
        new Item(7,"Beret","Mais oui, Paris, fromage, baguette! Mercredi!",51,2000),
        new Item(7,"Sapphire","Tough to spell, but not as hard as \"padparascha.\" Jeez.",52,6000),
        new Item(7,"hPhone Pro","Couldn't you just have bought a camera?",53,5000),
        new Item(7,"Desktop Computer","Slowly ruin your life by staying in one place constantly!",54,5000),
        new Item(8,"Top Hat","Mmmmmmyeeees, myaahahaaaah, why yes, quite, mmm, quite, hahaah.",55,15000),
        new Item(8,"Emerald","It's worth its weight in sticks!",56,20000),
        new Item(8,"Mint Condition Cool Comic","Actually, it tastes more like cherry.",57,25000),
        new Item(9,"Astronaut Helmet","Anyone else feel kind of spiritual and adventurous?",58,40000),
        new Item(9,"Golden Lemur","If it weren't a metal statue, it'd like to move it, move it!",59,50000),
        new Item(9,"Platinum","You must have gone platinum for pressing Z a million times!",60,75000),
        new Item(9,"Floyd Cube","Or should it be called the Steinberg Cube?",61,100000),
        new Item(10,"Bayer Matrix Cube","And I show you how deep the rabbit hole goes!",62,1000000),
        new Item(10,"The Programmer","Items.list.forEach((item)=>{this.describe(item)});",63,9999999)
    ];
}