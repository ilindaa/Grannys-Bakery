const mongoose = require("mongoose");
const botconfig = require("../botconfig.json");

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
                
                    // gb.kuse (kitchen space)0 (hearts)1
                    if(data.heartMoney <= 0) {
                        return message.reply(`you do not have any hearts, use **${guild.prefix}granny** to interact with granny or **${guild.prefix}daily** to get hearts!`);
                    }
    
                    if(!args[0]) {
                        return message.reply("you have to include which k space you will be using your hearts on!");
                    }
    
                    if(args[0] != "1") {
                        if(args[0] != "2") {
                            return message.reply("you can only use your hearts on the two available k spaces (**Oven is 1 and Drink Bar is 2**)!");
                        }
                    }
    
                    if(!args[1]) {
                        return message.reply("you have to include how many hearts you are going to use (1-5) on the food item!");
                    }
    
                    if(args[0] == "1") { // haven't enhanced & selected to enhance a pastry - oven
                        if(data.ovenHearts == "🖤🖤🖤🖤🖤") {
                            if(data.ovenInfo == "Not In Use [1]") {
                                return message.reply("please make a pastry first before you enhance it!");
                            } else {
    
                                if(args[1] >= 6 || args[1] <= 0) { // keeps # in check of 1-5
                                    let hearts = args[1];
                                    return message.reply(`you cannot enhance a pastry with ${hearts} hearts, please use 1-5 hearts!`);
                                }
            
                                if(args[1] == "1" && data.heartMoney >= 1) {
                                    let hearts = 1;
                                    data.heartMoney -= hearts;
            
                                    let oHearts = "❤️🖤🖤🖤🖤";
                                    data.ovenHearts = oHearts;
                                }
            
                                if(args[1] == "2" && data.heartMoney >= 2) {
                                    let hearts = 2;
                                    data.heartMoney -= hearts;
            
                                    let oHearts = "❤️❤️🖤🖤🖤";
                                    data.ovenHearts = oHearts;
                                }
            
                                if(args[1] == "3" && data.heartMoney >= 3) {
                                    let hearts = 3;
                                    data.heartMoney -= hearts;
            
                                    let oHearts = "❤️❤️❤️🖤🖤";
                                    data.ovenHearts = oHearts;
                                }
            
                                if(args[1] == "4" && data.heartMoney >= 4) {
                                    let hearts = 4;
                                    data.heartMoney -= hearts;
            
                                    let oHearts = "❤️❤️❤️❤️🖤";
                                    data.ovenHearts = oHearts;
                                }
            
                                if(args[1] == "5" && data.heartMoney >= 5) {
                                    let hearts = 5;
                                    data.heartMoney -= hearts;
            
                                    let oHearts = "❤️❤️❤️❤️❤️";
                                    data.ovenHearts = oHearts;
                                }
                                data.save().catch(err => console.log(err));
                                return message.reply(`you have successfully enhanced ${data.ovenItem}! You now have ${data.heartMoney} hearts!`);
                                } // else
                        } else {  // oven hearts
                            return message.reply(`you have already enhanced ${data.ovenItem}!`)
                        }
                    }
    
    
                    if(args[0] == "2") { // haven't enhanced & selected to enhance a drink
                        if(data.barHearts == "🖤🖤🖤🖤🖤") {
                            if(data.barInfo == "Not In Use [2]") {
                                return message.reply("please make a drink first before you enhance it!");
                            } else {
    
                                if(args[1] >= 6 || args[1] <= 0) { // keeps # in check of 1-5
                                    let hearts = args[1];
                                    return message.reply(`you cannot enhance a drink with ${hearts} hearts, please use 1-5 hearts!`);
                                }
            
                                if(args[1] == "1" && data.heartMoney >= 1) {
                                    let hearts = 1;
                                    data.heartMoney -= hearts;
            
                                    let bHearts = "❤️🖤🖤🖤🖤";
                                    data.barHearts = bHearts;
                                }
            
                                if(args[1] == "2" && data.heartMoney >= 2) {
                                    let hearts = 2;
                                    data.heartMoney -= hearts;
            
                                    let bHearts = "❤️❤️🖤🖤🖤";
                                    data.barHearts = bHearts;
                                }
            
                                if(args[1] == "3" && data.heartMoney >= 3) {
                                    let hearts = 3;
                                    data.heartMoney -= hearts;
            
                                    let bHearts = "❤️❤️❤️🖤🖤";
                                    data.barHearts = bHearts;
                                }
            
                                if(args[1] == "4" && data.heartMoney >= 4) {
                                    let hearts = 4;
                                    data.heartMoney -= hearts;
            
                                    let bHearts = "❤️❤️❤️❤️🖤";
                                    data.barHearts = bHearts;
                                }
            
                                if(args[1] == "5" && data.heartMoney >= 5) {
                                    let hearts = 5;
                                    data.heartMoney -= hearts;
            
                                    let bHearts = "❤️❤️❤️❤️❤️";
                                    data.barHearts = bHearts;
                                }
                                data.save().catch(err => console.log(err));
                                return message.reply(`you have successfully enhanced ${data.barItem}! You now have ${data.heartMoney} hearts!`);
                            } // else
                        } else { // bar hearts
                            return message.reply(`you have already enhanced ${data.barItem}!`)
                        }
                    } 
    
            }
        })


    })


}

module.exports.help = {
    name: "kuse",
    aliases: ["ku"]
}