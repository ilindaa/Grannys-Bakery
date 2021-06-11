const ms = require("parse-ms");
const mongoose = require("mongoose");
const Discord = require("discord.js");
const colors = require("../colors.json");
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
                
                    // gb.kclean (kitchen space)
                    if(!args[0]) {
                        message.reply("you have to specify the k space you want to clean (**Oven is 1 and Drink Bar is 2**)!");
                    }
    
                    if(args[0] == "1") {
                        if(data.ovenItem == "none") {
                            message.reply("you don't have anything to clean!");
                        } else { // you have smth to clean - subtract strawberries
                            let fi;
                            let fp;
    
                            if(data.ovenItem == food.item1) {
                                fi = food.item1;
                                fp = food.price1;
                                data.money -= food.price1;
                            }
    
                            if(data.ovenItem == food.item2) {
                                fi = food.item2;
                                fp = food.price2;
                                data.money -= food.price2;
                            }
    
                            if(data.ovenItem == food.item3) {
                                fi = food.item3;
                                fp = food.price3;
                                data.money -= food.price3;
                            }
    
                            if(data.ovenItem == food.item4) {
                                fi = food.item4;
                                fp = food.price4;
                                data.money -= food.price4;
                            }
    
                            // reset food item, reset hearts, reset oven info
                            let foodReset = "none";
                            let heartsReset = "🖤🖤🖤🖤🖤";
                            let ovenInfoReset = "Not In Use [1]";
                            let ovenTimeReset = 0;
    
                            data.ovenItem = foodReset;
                            data.ovenHearts = heartsReset;
                            data.ovenInfo = ovenInfoReset;
                            data.ovenTime = ovenTimeReset;
    
                            data.save().catch(err => console.log(err));
                            return message.reply(`The oven has been cleaned! **Make sure you check your order first** and make the pastry again!\n Since you have wasted a **${fi}**, **${fp} 🍓 has been deducted from your strawberries!**\nNote: The deduction is based on ${fi}'s price on menu!`);
                        }
                    }
    
                    if(args[0] == "2") {
                        if(data.barItem == "none") {
                            message.reply("you don't have anything to clean!");
                        } else { // you have smth to clean - subtract strawberries
                            let fi;
                            let fp;
    
                            if(data.barItem == food.item5) {
                                fi = food.item5;
                                fp = food.price5;
                                data.money -= food.price5;
                            }
    
                            if(data.barItem == food.item6) {
                                fi = food.item6;
                                fp = food.price6;
                                data.money -= food.price6;
                            }
    
                            if(data.barItem == food.item7) {
                                fi = food.item7;
                                fp = food.price7;
                                data.money -= food.price7;
                            }
    
                            if(data.barItem == food.item8) {
                                fi = food.item8;
                                fp = food.price8;
                                data.money -= food.price8;
                            }
    
                            // reset food item, reset hearts, reset oven info
                            let drinkReset = "none";
                            let heartsReset = "🖤🖤🖤🖤🖤";
                            let barInfoReset = "Not In Use [2]";
                            let barTimeReset = 0;
    
                            data.barItem = drinkReset;
                            data.barHearts = heartsReset;
                            data.barInfo = barInfoReset;
                            data.barTime = barTimeReset;
    
                            data.save().catch(err => console.log(err));
                            return message.reply(`The drink bar has been cleaned! **Make sure you check your order first** and make the drink again!\n Since you have wasted the **${fi}**, **${fp} 🍓 has been deducted from your strawberries!**\nNote: The deduction is based on ${fi}'s price on menu!`);
                        } // else
                    }
    
            }
        })


    })


}

module.exports.help = {
    name: "kclean",
    aliases: ["kc"]
}