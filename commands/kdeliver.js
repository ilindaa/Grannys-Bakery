const ms = require("parse-ms");
const mongoose = require("mongoose");
const botconfig = require("../botconfig.json");
const food = require("../food.json");

// CONNECT TO DATABASE
mongoose.connect(botconfig.mongoPass, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

// MODELS
const Data = require("../models/data.js");
const Guild = require("../models/guild.js");

module.exports.run = async (bot, message, args) => {

    let timeout1 = 10000; // same as time in kmake
    let timeout2 = 10000; 
    let maxDays = 5;


    Guild.findOne({
        guildID: message.guild.id
    }, (err, guild) => {
        if(err) console.log(err);
        if(!guild) {
            return message.reply(`please do the command **${guild.prefix}start** and **${guild.prefix}help** first!`);
        }


        Data.findOne({
            userID: message.author.id
        }, (err, data) => {
            if(err) console.log(err);
            if(!data) {
                return message.reply(`please do the command **${guild.prefix}start** and **${guild.prefix}help** first!`);
            } else {
                
                    // gb.kdeliver (kitchen space - item)0 (customer)1 resets hearts, oven info, and adds strawberries
                    if(!args[0]) {
                        return message.reply("to deliver a food item, you have to include the k space first (**Oven is 1 and Drink Bar is 2**)!");
                    }
                
                    if(!args[1]) {
                        return message.reply(`to deliver a food item, you have to include the customer (#) first. Use **${guild.prefix}customer** to find the number of the customer!`);
                    }
                
    
                    // space PASTRY
    
                
                    if(args[0] == "1") { // pastry delivery
                        if(timeout1 - (Date.now() - data.ovenTime) < 0) { // ready to be delivered
                
                        if(data.ovenItem != data.currentOrderPastry) { // checks if baked pastry = order
                            return message.reply(`the pastry baked, **${data.ovenItem}** is not the same as the pastry ordered, **${data.currentOrderPastry}**.\n*(You think to yourself) I have to clean the oven and remake it again.*`);
                        }
                
                        let customer = args[1];
    
                        if(args[1] != "1") {
                            if(args[1] != "2") {
                                if(args[1] != "3") {
                                    if(args[1] != "4") {
                                        return message.reply(`you cannot deliver to customer **${customer}** (**The available customer numbers are 1-4**)`);
                                    }
                                }
                            }
                        }
    
                
                        if(data.currentOrder == customer) { // give strawberries for fulfilling order
                            let fi;
                            let fp;
                            let hmoney;
                            let hp;
                
                            if(data.currentOrderPastry == food.item1) {
                                fi = food.item1;
                                fp = food.price1;
                                data.money += food.price1;
                            }
                
                            if(data.currentOrderPastry == food.item2) {
                                fi = food.item2;
                                fp = food.price2;
                                data.money += food.price2;
                            }
                
                            if(data.currentOrderPastry == food.item3) {
                                fi = food.item3;
                                fp = food.price3;
                                data.money += food.price3;
                            }
                
                            if(data.currentOrderPastry == food.item4) {
                                fi = food.item4;
                                fp = food.price4;
                                data.money += food.price4;
                            }
    
                            // hearts
                            if(data.ovenHearts == "❤️🖤🖤🖤🖤") {
                                hp = data.ovenHearts;
                                hmoney = Math.ceil(fp*0.15);
                                data.money += hmoney;
                            }
    
                            if(data.ovenHearts == "❤️❤️🖤🖤🖤") {
                                hp = data.ovenHearts;
                                hmoney = Math.ceil(fp*0.2375);
                                data.money += hmoney;
                            }
    
                            if(data.ovenHearts == "❤️❤️❤️🖤🖤") {
                                hp = data.ovenHearts;
                                hmoney = Math.ceil(fp*0.325);
                                data.money += hmoney;
                            }
    
                            if(data.ovenHearts == "❤️❤️❤️❤️🖤") {
                                hp = data.ovenHearts;
                                hmoney = Math.ceil(fp*0.4125);
                                data.money += hmoney;
                            }
    
                            if(data.ovenHearts == "❤️❤️❤️❤️❤️") {
                                hp = data.ovenHearts;
                                hmoney = Math.ceil(fp*0.4125);
                                data.money += hmoney;
                            }
    
                            if(data.ovenHearts != "🖤🖤🖤🖤🖤") {
                                message.reply(`you have delivered **${fi}** to **customer ${data.currentOrder}** from the oven!\nYou have been given **${fp} 🍓** along with a **tip, ${hmoney} 🍓** for adding **${hp}** to your pastry!`);
                            } else {
                                message.reply(`you have delivered **${fi}** to **customer ${data.currentOrder}** from the oven!\nYou have been given **${fp} 🍓!**`);
                            }
                
                            // reset food item, reset hearts, reset oven info
                            // pastry - reset pastry & check if drink is reset too - then update current order to none - to accept next!
                            let foodReset = "none";
                            let heartsReset = "🖤🖤🖤🖤🖤";
                            let ovenInfoReset = "Not In Use [1]";
                            let ovenTimeReset = 0;
                
                            data.ovenItem = foodReset;
                            data.ovenHearts = heartsReset;
                            data.ovenInfo = ovenInfoReset;
                            data.currentOrderPastry = foodReset;
                            data.ovenTime = ovenTimeReset;
                
                            if(data.currentOrderDrink == foodReset && data.currentOrderPastry == foodReset) {
                                if(data.currentOrder == "1") {
                                    data.customer1Time = Date.now();
                                    if(data.customer1Count <= maxDays) {
                                        data.customer1Count++;
                                    }
                                }
                
                                if(data.currentOrder == "2") {
                                    data.customer2Time = Date.now();
                                    if(data.customer2Count <= maxDays) {
                                        data.customer2Count++;
                                    }
                                }
                
                                if(data.currentOrder == "3") {
                                    data.customer3Time = Date.now();
                                    if(data.customer3Count <= maxDays) {
                                        data.customer3Count++;
                                    }
                                }
                
                                if(data.currentOrder == "4") {
                                    data.customer4Time = Date.now();
                                    if(data.customer4Count <= maxDays) {
                                        data.customer4Count++;
                                    }
                                }
                                
                                data.currentOrder = foodReset;
                            }
    
                            return data.save().catch(err => console.log(err));
    
                        } else {
                             return message.reply(`this order is not for this customer! Check your order again with **${guild.prefix}order**`);
                        }
                           
                
                        } else { // not ready to be delivered
                            return message.reply(`you cannot deliver a pastry that is still baking in the oven!`);
                        }
                    } // pastry delivery
                
    
    
    
    
                    // space DRINK
    
    
                    if(args[0] == "2") { // drink delivery
                        if(timeout2 - (Date.now() - data.barTime) < 0) { // ready to be delivered
                
                        if(data.barItem != data.currentOrderDrink) { // checks if drink = order
                            return message.reply(`the drink made, **${data.barItem}** is not the same as the drink ordered, **${data.currentOrderDrink}**.\n*(You think to yourself) I have to clean the drink bar and remake it again.*`);
                        }
                
                        let customer = args[1];
    
                        if(args[1] != "1") {
                            if(args[1] != "2") {
                                if(args[1] != "3") {
                                    if(args[1] != "4") {
                                        return message.reply(`you cannot deliver to customer **${customer}** (**The available customer numbers are 1-4**)`);
                                    }
                                }
                            }
                        }
                
                            if(data.currentOrder == customer) { // give strawberries for fulfilling order
                            let fi;
                            let fp;
                            let hmoney;
                            let hp;
                
                            if(data.currentOrderDrink == food.item5) {
                                fi = food.item5;
                                fp = food.price5;
                                data.money += food.price5;
                            }
                
                            if(data.currentOrderDrink == food.item6) {
                                fi = food.item6;
                                fp = food.price6;
                                data.money += food.price6;
                            }
                
                            if(data.currentOrderDrink == food.item7) {
                                fi = food.item7;
                                fp = food.price7;
                                data.money += food.price7;
                            }
                
                            if(data.currentOrderDrink == food.item8) {
                                fi = food.item8;
                                fp = food.price8;
                                data.money += food.price8;
                            }
                
                            // hearts
                            if(data.barHearts == "❤️🖤🖤🖤🖤") {
                                hp = data.barHearts;
                                hmoney = Math.ceil(fp*0.15);
                                data.money += hmoney;
                            }
    
                            if(data.barHearts == "❤️❤️🖤🖤🖤") {
                                hp = data.barHearts;
                                hmoney = Math.ceil(fp*0.2375);
                                data.money += hmoney;
                            }
    
                            if(data.barHearts == "❤️❤️❤️🖤🖤") {
                                hp = data.barHearts;
                                hmoney = Math.ceil(fp*0.325);
                                data.money += hmoney;
                            }
    
                            if(data.barHearts == "❤️❤️❤️❤️🖤") {
                                hp = data.barHearts;
                                hmoney = Math.ceil(fp*0.4125);
                                data.money += hmoney;
                            }
    
                            if(data.barHearts == "❤️❤️❤️❤️❤️") {
                                hp = data.barHearts;
                                hmoney = Math.ceil(fp*0.4125);
                                data.money += hmoney;
                            }
    
                            if(data.barHearts != "🖤🖤🖤🖤🖤") {
                                message.reply(`you have delivered **${fi}** to **customer ${data.currentOrder}** from the oven!\nYou have been given **${fp} 🍓** along with a **tip, ${hmoney} 🍓** for adding **${hp}** to your pastry!`);
                            } else {
                                message.reply(`you have delivered **${fi}** to **customer ${data.currentOrder}** from the oven!\nYou have been given **${fp} 🍓!**`);
                            }
    
                            // reset food item, reset hearts, reset oven info
                            // drink - reset drink & check if pastry is reset too - then update current order to none - to accept next!
                            // already had food/heart reset up top
                            let foodReset = "none";
                            let heartsReset = "🖤🖤🖤🖤🖤";
                            let barInfoReset = "Not In Use [2]";
                            let barTimeReset = 0;
                
                            data.barItem = foodReset;
                            data.barHearts = heartsReset;
                            data.barInfo = barInfoReset;
                            data.currentOrderDrink = foodReset;
                            data.barTime = barTimeReset;
                
                            if(data.currentOrderPastry == foodReset && data.currentOrderDrink == foodReset ) {
                                if(data.currentOrder == "1") {
                                    data.customer1Time = Date.now();
                                    if(data.customer1Count <= maxDays) {
                                        data.customer1Count++;
                                    }
                                }
                
                                if(data.currentOrder == "2") {
                                    data.customer2Time = Date.now();
                                    if(data.customer2Count <= maxDays) {
                                        data.customer2Count++;
                                    }
                                }
                
                                if(data.currentOrder == "3") {
                                    data.customer3Time = Date.now();
                                    if(data.customer3Count <= maxDays) {
                                        data.customer3Count++;
                                    }
                                }
                
                                if(data.currentOrder == "4") {
                                    data.customer4Time = Date.now();
                                    if(data.customer4Count <= maxDays) {
                                        data.customer4Count++;
                                    }
                                }
                
                                data.currentOrder = foodReset;
                            }
    
                            return data.save().catch(err => console.log(err));
    
                        } else {
                             return message.reply(`this order is not for this customer! Check your order again with **${guild.prefix}order**`);
                        }
                           
                
                    } else { // not ready to be delivered
                        return message.reply(`you cannot deliver a drink that is still being made in the drink bar!`);
                    }
                } // drink delivery
    
            }
        })


    })


}

module.exports.help = {
    name: "kdeliver",
    aliases: ["kd"]
}