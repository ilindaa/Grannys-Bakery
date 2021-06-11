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

                if(!args[0]) { // no customer # (gb.likes #)
                    return message.reply(`to view a customer's food preferences, you have to include which customer first! (Refer to **${guild.prefix}line**)`);
                }

                if(args[0] == "1") {
                    embed.setTitle(`Gil`);
                    embed.setDescription(`• Reserved\n• Will eat anything\n• Isn't a fan of overly sweet or bitter drinks`);
                    embed.addField("Frequently Ordered Bun(s)", `Char Siu Bao, Ham and Egg Bun, Hot Dog Bun, and Pineapple Bun`);
                    embed.addField("Frequently Ordered Drink(s)", `Tea and Yuanyang`);
                }

                if(args[0] == "2") {
                    embed.setTitle(`Nea`);
                    embed.setDescription(`• Nonchalant\n• Meat eater\n• Wants to get get taller`);
                    embed.addField("Frequently Ordered Bun(s)", `Char Siu Bao, Ham and Egg Bun, and Hot Dog Bun`);
                    embed.addField("Frequently Ordered Drink(s)", `Soy Milk`);
                }

                if(args[0] == "3") { 
                    embed.setTitle(`Mo`);
                    embed.setDescription(`• Happy\n• Just likes eating certain baked goods for no \"specific\" reason\n• Likes the process of mixing coffee and milk`);
                    embed.addField("Frequently Ordered Bun(s)", `Ham and Egg Bun and Hot Dog Bun`);
                    embed.addField("Frequently Ordered Drink(s)", `Soy Milk and Coffee`);
                }

                if(args[0] == "4") { 
                    embed.setTitle(`Darina`);
                    embed.setDescription(`• Sophisticated\n• Doesn't eat meat too often\n• Likes sweet drinks`);
                    embed.addField("Frequently Ordered Bun(s)", `Pineapple Bun`);
                    embed.addField("Frequently Ordered Drink(s)", `Soy Milk, Coffee, Tea, and Yuanyang`);
                }

                embed.setColor(colors.darkgray);
                message.channel.send(embed);
    
            }
        })


    })


}

module.exports.help = {
    name: "likes",
    aliases: ["l"]
}