const ms = require("parse-ms");
const mongoose = require("mongoose");
const Discord = require("discord.js");
const colors = require("../colors.json");
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
                let embed = new Discord.MessageEmbed();

                if(!args[0]) {
                    embed.setTitle(`Diary | ${bot.user.username}`);
                    embed.setDescription(`In your diary that you have brought with you, you decide to jot down a few interesting things you learned in the time you have spent at the bakery.\n*Advices given will automatically be added here through storyline progressions!*\n\nUse **${guild.prefix}diary choose <# or \"no advice\">** to select the advice you wish to follow\n*This can be changed up until you choose to end the story.*\n\n**Notes**\n*[1] **${data.adviceC1}** (Gil)\n[2] **${data.adviceC2}** (Nea)\n[3] **${data.adviceC3}** (Mo)\n[4] **${data.adviceC4}** (Darina)*\n\n🍓 The advice you chose to follow: **${data.chooseAdvice}**`);
                    embed.setColor(colors.darkgray);
                    message.channel.send(embed);
                }

                let advice;
                if(args[0] == "choose") {
                    if(args[1] == "1") {
                        advice = data.adviceC1;
                    }
    
                    if(args[1] == "2") {
                        advice = data.adviceC2;
                    }
    
                    if(args[1] == "3") {
                        advice = data.adviceC3;
                    }
    
                    if(args[1] == "4") {
                        advice = data.adviceC4;
                    }
    
                    if(args[1] == "no" && args[2] == "advice") {
                        advice = args[1] + " " + args[2];
                    }
    
                    if(advice != "???") {
                        data.chooseAdvice = advice;
                        data.save().catch(err => console.log(err));
                        return message.reply(`you have chosen to follow \"${data.chooseAdvice}\"\n**${guild.prefix}diary** has been updated!`); 
                    } else {
                        return message.reply("you cannot follow an advice that you have not discovered in the story!");
                    }
                }
            }
        })


    })

    
}

module.exports.help = {
    name: "diary",
    aliases: []
}