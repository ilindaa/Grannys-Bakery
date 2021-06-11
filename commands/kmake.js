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
                
                    // gb.kmake (kitchen space)0 (menu item)1
    
                    if(!args[0]) { // no kitchen space?
                        return message.reply(`to make a food item, you have to specify a kitchen space to make it in (**Oven is 1 and Drink Bar is 2**)!`)
                    }

                    if(!args[1]) { // no menu item?
                        return message.reply(`to make a food item, you have to choose a menu item first (**${guild.prefix}menu**)!`);
                    }
                
                        if(args[0] == "1") { // using the oven (pastry)
                
                            if(data.ovenInfo != "Not In Use [1]") { // is in use
                                return message.reply("you are already making a pastry in the oven, clear the oven first or wait until the pastry is ready to be delivered!");
                            } else { // if it equals that then ur gonna want to make it in use
                                if(args[1] == "5" || args[1] == "6" || args[1] == "7" || args[1] == "8") { // drinks = no
                                    return message.reply("you cannot make drinks with the oven!");
                                }
                
                                if(args[1] == "1") {
                                    let pastryItem = food.item1;
                                    data.ovenItem = pastryItem;
                                    data.ovenTime = Date.now();
                                }
                
                                if(args[1] == "2") {
                                    let pastryItem = food.item2;
                                    data.ovenItem = pastryItem;
                                    data.ovenTime = Date.now();
                                }
                
                                if(args[1] == "3") {
                                    let pastryItem = food.item3;
                                    data.ovenItem = pastryItem;
                                    data.ovenTime = Date.now();
                                }
                
                                if(args[1] == "4") {
                                    let pastryItem = food.item4
                                    data.ovenItem = pastryItem;
                                    data.ovenTime = Date.now();
                                }
                                data.save().catch(err => console.log(err));
                                return message.reply(`you have started to make ${data.ovenItem} in the oven!`);
                            }
                          }
                
                        if(args[0] == "2") { // using the drink bar (drinks)
                            if(data.barInfo != "Not In Use [2]") { // is in use
                                return message.reply("you are already making a drink in the drink bar, clear the bar first or wait until the drink is ready to be delivered!");
                            } else { // if it equals that then ur gonna want to make it in use
                
                                if(args[1] == "1" || args[1] == "2" || args[1] == "3" || args[1] == "4") { // pastries = no
                                    return message.reply("you cannot make pastries with the drink bar!");
                                } 
                
                                if(args[1] == "5") {
                                    let drinkItem = food.item5;
                                    data.barItem = drinkItem;
                                    data.barTime = Date.now();
                                }
                
                                if(args[1] == "6") {
                                    let drinkItem = food.item6;
                                    data.barItem = drinkItem;
                                    data.barTime = Date.now();
                                }
                
                                if(args[1] == "7") {
                                    let drinkItem = food.item7;
                                    data.barItem = drinkItem;
                                    data.barTime = Date.now();
                                }
                
                                if(args[1] == "8") {
                                    let drinkItem = food.item8;
                                    data.barItem = drinkItem;
                                    data.barTime = Date.now();
                                }
                                data.save().catch(err => console.log(err));
                                return message.reply(`you have started to make ${data.barItem} in the drink bar!`);
                                } 
                            } 
    
            }
        })


    })


}

module.exports.help = {
    name: "kmake",
    aliases: ["km"]
}