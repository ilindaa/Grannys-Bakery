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
                
                    let timeout = 4800000; // 1 hr 20 mins
                    let time;
    
                    //gb.order (num)
    
                    let embed2 = new Discord.MessageEmbed();
        
                    if(!args[0]) {
                        if(data.currentOrder == "none") {
                        return message.reply("you must specify which customer's order you will be accepting!");
                        } else {
                            return message.reply(`the order is **${data.currentOrderPastry}** and a **${data.currentOrderDrink}** for **customer ${data.currentOrder}!**`);
                        }
                    }
        
                    if(args[0] == "1") {
                        if(data.currentOrder == "none") {
                            if(timeout - (Date.now() - data.customer1Time) <= 0) {
                                let order = "1";
                                data.currentOrder = order;
            
                                let pastries = [food.item1, food.item2, food.item3, food.item4];
                                var pick1 = pastries[Math.floor(Math.random() * pastries.length)];
            
                                let drinks = [food.item7, food.item8];
                                var pick2 = drinks[Math.floor(Math.random() * drinks.length)];
            
                                data.currentOrderPastry = pick1;
                                data.currentOrderDrink = pick2;
                            } else {
                                time = ms(timeout - (Date.now() - data.customer1Time));
                                return message.reply(`you must wait **${time.hours} hours, ${time.minutes} minutes, and ${time.seconds} seconds** before you accept **customer 1's** order again!`);   
                            }
        
                        } else { // current order data is not none
                            return message.reply(`you already accepted customer **${data.currentOrder}'s order!** Please **finish that order first** before you accept this order!`);
                        }
                    }
        
                    if(args[0] == "2") {
                        if(data.currentOrder == "none") {
                            if(timeout - (Date.now() - data.customer2Time) <= 0) {
                                let order = "2";
                                data.currentOrder = order;
            
                                let pastries = [food.item1, food.item2, food.item3];
                                var pick1 = pastries[Math.floor(Math.random() * pastries.length)];
            
                                let drinks = [food.item5];
                                var pick2 = drinks[Math.floor(Math.random() * drinks.length)];
            
                                data.currentOrderPastry = pick1;
                                data.currentOrderDrink = pick2;
                            }
                            else {
                                time = ms(timeout - (Date.now() - data.customer2Time));
                                return message.reply(`you must wait **${time.hours} hours, ${time.minutes} minutes, and ${time.seconds} seconds** before you accept **customer 2's** order again!`);
                            }
                        } else { // current order data is not none
                            return message.reply(`you already accepted customer **${data.currentOrder}'s order!** Please **finish that order first** before you accept this order!`);
                        }
                    }
        
                    if(args[0] == "3") {
                        if(data.currentOrder == "none") {
                            if(timeout - (Date.now() - data.customer3Time) <= 0) {
                                let order = "3";
                                data.currentOrder = order;
            
                                let pastries = [food.item2, food.item3];
                                var pick1 = pastries[Math.floor(Math.random() * pastries.length)];
            
                                let drinks = [food.item5, food.item6];
                                var pick2 = drinks[Math.floor(Math.random() * drinks.length)];
            
                                data.currentOrderPastry = pick1;
                                data.currentOrderDrink = pick2;
                            } else {
                                time = ms(timeout - (Date.now() - data.customer3Time));
                                return message.reply(`you must wait **${time.hours} hours, ${time.minutes} minutes, and ${time.seconds} seconds** before you accept **customer 3's** order again!`);
                            }
        
                        } else { // current order data is not none
                            return message.reply(`you already accepted customer **${data.currentOrder}'s order!** Please **finish that order first** before you accept this order!`);
                        }
                    }
        
                    if(args[0] == "4") {
                        if(data.currentOrder == "none") {
                            if(timeout - (Date.now() - data.customer4Time) <= 0) {
                                let order = "4";
                                data.currentOrder = order;
            
                                let pastries = [food.item4];
                                var pick1 = pastries[Math.floor(Math.random() * pastries.length)];
            
                                let drinks = [food.item5, food.item6, food.item7, food.item8];
                                var pick2 = drinks[Math.floor(Math.random() * drinks.length)];
            
                                data.currentOrderPastry = pick1;
                                data.currentOrderDrink = pick2;
                            } else {
                                time = ms(timeout - (Date.now() - data.customer4Time));
                                return message.reply(`you must wait **${time.hours} hours, ${time.minutes} minutes, and ${time.seconds} seconds** before you accept **customer 4's** order again!`);
                            }
        
                        } else { // current order data is not none
                            return message.reply(`you already accepted customer **${data.currentOrder}'s order!** Please **finish that order first** before you accept this order!`);
                        }
                    }
        
                    data.save().catch(err => console.log(err));
    
                    embed2.setDescription(`The order will be a **${data.currentOrderPastry}** and a **${data.currentOrderDrink}** for **customer ${data.currentOrder}!**`);
                    embed2.setColor(colors.darkgray);
                    message.channel.send(embed2);
    
            }
        })


    })


}

module.exports.help = {
    name: "order",
    aliases: ["o"]
}