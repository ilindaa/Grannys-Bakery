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
                var maxBet = 10000;
    
                if (data.money <= 0) return message.reply("you don't have money to gamble with!");
    
                if(args[0] < 0) return message.reply("you cannot gamble with negative strawberries! 🍓");
    
                if(args[0] == 0) return message.reply("you cannot gamble with 0 strawberries! 🍓");
    
                if(!args[0]) return message.reply("please specify a bet!");
    
                if(args[0].toLowerCase() == "all") args[0] = data.money;
    
                if(args[0] - Math.floor(args[0] == 0)) {
    
                    try {
                        var bet = parseInt(args[0]);
                    } catch {
                        return message.reply("you can only enter whole numbers!");
                    }
    
                }
    
                if (bet != Math.floor(bet)) return message.reply("you can only enter whole numbers!");
    
                if (data.money < bet) return message.reply("you don't have enough money to gamble with!")
    
                if (bet > maxBet) return message.reply(`the maximum bet is ${maxBet.toLocaleString()}.`); // adds commas to every thousand
    
                let chances = ["win", "lose"];
                var pick = chances[Math.floor(Math.random() * chances.length)];
    
                if (pick == "lose") {
                    data.money -= bet;
                    data.save().catch(err => console.log(err));
                    return message.reply(`you lose. \n 🍓 New Balance: ${data.money} strawberries.`);
                } else {
                    data.money += bet;
                    data.save().catch(err => console.log(err));
                    return message.reply(`you win! \n 🍓 New Balance: ${data.money} strawberries.`);
                }
    
             }
        })


    })


}

module.exports.help = {
    name: "gamble",
    aliases: ["g"]
}