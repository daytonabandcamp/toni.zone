class Recipe {
    static list = [
        new Recipe(
            [{id:0,count:2}], //2 dustbunnies
            {id:1,count:1} //1 lintblock
        ),
        new Recipe(
            [{id: 3,count: 10}], //10 splinterwoods
            {id: 27,count: 1} //1 oak tree
        ),
        new Recipe(
            [{id: 23,count:1},{id:8,count:1}], //snail shell + lettuce
            {id:32,count:1} //snail
        ),
        new Recipe(
            [{id: 7,count:5}], //5 pennies
            {id: 9,count:1} //1 nickel
        ),
        new Recipe(
            [{id: 7,count:100}], //100 pennies
            {id: 34,count:1} //1 dollar
        ),
        new Recipe(
            [{id: 39,count:1},{id:24,count:1}],
            {id: 43,count:1}
        ),
        new Recipe(
            [{id: 45,count:1},{id:43,count:1}],
            {id: 34,count:3}
        ),
        new Recipe(
            [{id: 29,count:4}],
            {id: 42,count:1}
        ),
        new Recipe(
            [{id: 12,count:1},{id: 39,count:1}],
            {id: 41,count:1}
        ),
        new Recipe(
            [{id: 4,count:100}],
            {id: 37,count:1}
        ),
        new Recipe(
            [{id: 11,count:1},{id:9,count:1}],
            {id:20,count:1}
        ),
        new Recipe(
            [{id:20,count:8}],
            {id:36,count:1}
        ),
        new Recipe(
            [{id:22,count:1},{id:24,count:1}],
            {id:31,count:1}
        ),
        new Recipe(
            [{id:10,count:4}],
            {id:30,count:1}
        ),
        new Recipe(
            [{id:30,count:4}],
            {id:39,count:1}
        ),
        new Recipe(
            [{id:50,count:1},{id:34,count:1}],
            {id:52,count:1}
        ),
        new Recipe(
            [{id:17,count:4}],
            {id:31,count:1}
        ),
        new Recipe(
            [{id:31,count:3}],
            {id:44,count:1}
        ),
        new Recipe(
            [{id:44,count:4}],
            {id:49,count:1}
        ),
        new Recipe(
            [{id:6,count:15}],
            {id:34,count:1}
        ),
        new Recipe(
            [{id:25,count:6}],
            {id:34,count:1}
        ),
        new Recipe(
            [{id:42,count:1}],
            {id:34,count:2}
        ),
        new Recipe(
            [{id:1,count:7}],
            {id:28,count:1}
        ),
        new Recipe(
            [{id:28,count:3}],
            {id:35,count:1}
        ),
        new Recipe(
            [{id:35,count:3}],
            {id:46,count:1}
        ),
        new Recipe(
            [{id:46,count:3}],
            {id:51,count:1}
        ),
        new Recipe(
            [{id:51,count:3}],
            {id:55,count:1}
        ),
        new Recipe(
            [{id:26,count:3}],
            {id:38,count:1}
        ),
        new Recipe(
            [{id:38,count:20}],
            {id:57,count:1}
        ),
        new Recipe(
            [{id:13,count:25}],
            {id:34,count:1}
        ),
        new Recipe(
            [{id:14,count:25}],
            {id:34,count:1}
        ),
        new Recipe(
            [{id:34,count:15}],
            {id:52,count:1}
        ),
        new Recipe(
            [{id:52,count:2}],
            {id:56,count:1}
        ),
        new Recipe(
            [{id:56,count:3}],
            {id:60,count:1}
        ),
        new Recipe(
            [{id:32,count:1},{id:27,count:1}],
            {id:33,count:1}
        ),
        new Recipe(
            [{id:20,count:4},{id:33,count:1}],
            {id:36,count:1}
        ),
        new Recipe(
            [{id:55,count:2}],
            {id:58,count:1}
        ),
        new Recipe(
            [{id:36,count:1},{id:58,count:1}],
            {id:59,count:1}
        ),
        new Recipe(
            [{id:2,count:4}],
            {id:21,count:1}
        ),
        new Recipe(
            [{id:21,count:4}],
            {id:39,count:1}
        ),
        new Recipe(
            [{id:39,count:1},{id:9,count:1}],
            {id:40,count:1}
        ),
        new Recipe(
            [{id:40,count:1},{id:9,count:1}],
            {id:45,count:1}
        ),
        new Recipe(
            [{id:45,count:1},{id:9,count:1}],
            {id:47,count:1}
        ),
        new Recipe(
            [{id:34,count:5},{id:45,count:1}],
            {id:54,count:1}
        ),
        new Recipe(
            [{id:34,count:5},{id:47,count:1}],
            {id:53,count:1}
        ),
        new Recipe(
            [{id:53,count:5}],
            {id:61,count:1}
        ),
        new Recipe(
            [{id:54,count:5}],
            {id:61,count:1}
        ),
        new Recipe(
            [{id:61,count:2}],
            {id:62,count:1}
        ),
        new Recipe(
            [{id:27,count:1}],
            {id:25,count:1}
        ),
        new Recipe(
            [{id:27,count:20}],
            {id:48,count:1}
        ),
        new Recipe(
            [{id:48,count:7}],
            {id:59,count:1}
        ),
        new Recipe(
            [{id:18,count:2}],
            {id:25,count:1}
        ),
        new Recipe(
            [{id:62,count:1},{id:60,count:1},{id:59,count:1},{id:57,count:1},{id:49,count:1}],
            {id:63,count:1}
        ),
        new Recipe(
            [{id:5,count:3}],
            {id:13,count:1}
        ),
        new Recipe(
            [{id:5,count:3}],
            {id:14,count:1}
        )
    ]
    constructor(elements,output){
        this.elements = elements; //array of inventory items
        this.output = output; //numeric id
    }
    canAfford() {
        var ids = [];
        var ingredientsOfRequired;
        var affordable = true;
        this.elements.forEach((element)=>ids.push(element.id));
        ingredientsOfRequired = Game.inventory.filter((item) => ids.includes(item.id));
        if (ingredientsOfRequired.length != ids.length) {
            affordable = false;
        }
        ingredientsOfRequired.forEach((element,index)=>{
            try {
                if (element.count < this.elements[index].count) {
                    affordable = false;
                }
            } catch (e) {
                affordable = false;
            }
        })
        return affordable;
    }
    combine() {
        if (!this.canAfford()) {
            SFX.play("rejected");
            return;
        } else {
            SFX.play("combine");
        }
        this.elements.forEach((element)=>{
            var ingredientID = Game.inventory.findIndex((item)=>item.id==element.id);
            var ingredient = Game.inventory[ingredientID]
            if (ingredient.count - element.count == 0){
                Game.inventory.splice(ingredientID,1);
            } else if (ingredient.count - element.count > 0) {
                Game.inventory[ingredientID].count -= element.count;
            }
        });
        var id = Game.inventory.findIndex((item)=>item.id==this.output.id);
        if (id == -1) {
            Game.inventory.push({name: Items.list.find((item)=>item.id==this.output.id).name, count: this.output.count, id: this.output.id});
        } else {
            Game.inventory[id].count+=this.output.count;
        }
        if (this.output.id==32) {
            LootState.handleAchievements("Lettuce Give Thanks");
        } else if (this.output.id==21) {
            LootState.handleAchievements("Toot Toot!");
        } else if (this.output.id==25) {
            LootState.handleAchievements("But This Delicious Nut");
        } else if (this.output.id==9) {
            LootState.handleAchievements("Another Nickel");
        } else if (this.output.id==30) {
            LootState.handleAchievements("BARGINGO.COM!!!!");
        } else if (this.output.id==27) {
            LootState.handleAchievements("Give a Hoot");
        } else if (this.output.id==37) {
            LootState.handleAchievements("Whole Lotta Nothing");
        } else if (this.output.id==38) {
            LootState.handleAchievements("Found Media");
        } else if (this.output.id==47) {
            LootState.handleAchievements("Trading Up");
        } else if (this.output.id==41) {
            LootState.handleAchievements("H2O");
        } else if (this.output.id==49) {
            LootState.handleAchievements("When In Rome");
        } else if (this.output.id==48) {
            LootState.handleAchievements("If He Cuts the Tree");
        } else if (this.output.id==57) {
            LootState.handleAchievements("To The Good Old Days");
        } else if (this.output.id==58) {
            LootState.handleAchievements("End of the Line");
        } else if (this.output.id==62) {
            LootState.handleAchievements("The Red Pill");
        } else if (this.output.id==63) {
            LootState.handleAchievements("Make Me!")
        } else if (this.output.id==44) {
            LootState.handleAchievements("How You Slice It");
        } else if (this.elements[0].id==13){
            LootState.handleAchievements("But Of Quartz!");
        } else if (this.elements[0].id==7 && this.elements[0].count==100) {
            LootState.handleAchievements("99 and One Pennies");
        } else if (this.elements[0].id==6 && this.elements[0].count==15) {
            LootState.handleAchievements("But a Tin Can")
        } else if (this.elements.length > 1) {
            if (this.elements[0].id==20 && this.elements[1].id==33) {
                LootState.handleAchievements("Ferret to Parrot");
            } else if (this.elements[0].id==22 && this.elements[1].id==24) {
                LootState.handleAchievements("Cookie Pharmacy");
            }
        }
        CombineState.init(false);
    }
}