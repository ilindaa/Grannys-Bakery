const ms = require("parse-ms");
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

    let tip = Math.floor(Math.random() * (269 - 69 + 1)) + 69; // 69-269 inclusive of min/max
    let timeout = Math.floor(Math.random() * (10800000 - 3600000 + 1)) + 3600000; // 1-3 inclusive of min/max (3600000 - 1 hrs, 10800000 - 3 hrs)


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
            } else { // if there is data
                if(timeout - (Date.now() - data.hourlyTip) > 0) { // check if timeout is not equal to 0 (not 24 hr)
                    let time = ms(timeout - (Date.now() - data.hourlyTip));
    
                    let embed2 = new Discord.MessageEmbed();
    
                    embed2.setDescription(`❌ The tip jar has been emptied and checked recently! \n \n ⏲️ Check again in **${time.hours} hours, ${time.minutes} minutes, and ${time.seconds} seconds.**`);
                    embed2.setColor(colors.darkgray);
                    message.channel.send(embed2);
                }
                else { // if time is equal to 0 (3 hours)
    
                    data.money += tip;
                    data.hourlyTip = Date.now();
                    data.save().catch(err => console.log(err));
    
                    let embed3 = new Discord.MessageEmbed();
    
                    embed3.setDescription(`🍓 You collected **${tip} strawberries** from the tip jar.`);
                    embed3.setColor(colors.darkgray);
                    message.channel.send(embed3);
                }
             
            }
        })


    })
    
    
}

module.exports.help = {
    name: "tips",
    aliases: ["tip", "tj"]
}