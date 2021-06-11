const mongoose = require("mongoose");
const botconfig = require("../botconfig.json");
const colors = require("../colors.json");
const Discord = require("discord.js");

// CONNECT TO DATABASE
mongoose.connect(botconfig.mongoPass, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

// MODELS
const Data = require("../models/data.js");
const Guild = require("../models/guild.js");

module.exports.run = async (bot, message, args) => {

    // create them database stuff if they don't have one and then start the story :)


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
                const newData = new Data ({
                    name: message.author.username,
                    userID: message.author.id,
                    lb: "all",
                    money: 0,
                    heartMoney: 0,
                    daily: 0,
                    hourlyTip: 0,
                    numDay: 0,
                    numTotalDays: 0,
                    bakeryName: "Granny's Bakery",
                    ovenTime: 0,
                    barTime: 0,
                    ovenInfo: "Not In Use [1]",
                    barInfo: "Not In Use [2]",
                    ovenHearts: "🖤🖤🖤🖤🖤",
                    barHearts: "🖤🖤🖤🖤🖤",
                    shopItem: "none",
                    ovenItem: "none",
                    barItem: "none",
                    customer1Time: 0,
                    customer2Time: 0,
                    customer3Time: 0,
                    customer4Time: 0,
                    customer1Count: 0,
                    customer2Count: 0,
                    customer3Count: 0,
                    customer4Count: 0,
                    grannyCount: 0,
                    currentOrder: "none",
                    currentOrderPastry: "none",
                    currentOrderDrink: "none",
                    adviceC1: "???",
                    adviceC2: "???",
                    adviceC3: "???",
                    adviceC4: "???",
                    chooseAdvice: "no advice",
                    timesCompleted: 0,
                })
                newData.save().catch(err => console.log(err));
                
                let embed1 = new Discord.MessageEmbed();
    
                embed1.setDescription(`🍓 You have begun your story with ${bot.user.username}! \n🍓 Use **${guild.prefix}setbname** to choose your bakery name! \n🍓 Use **${guild.prefix}help** for a list of commands!`);
                embed1.setColor(colors.darkgray);
    
                message.channel.send(embed1);
    
            } else {
                let embed2 = new Discord.MessageEmbed();
    
                embed2.setDescription(`❌ You already started your story!`);
                embed2.setColor(colors.darkgray);
    
                message.channel.send(embed2);
            }
        })


    })
    

}

module.exports.help = {
    name: "start",
    aliases: []
}