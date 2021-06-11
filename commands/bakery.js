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
                return message.reply(`please do the start command **${guild.prefix}start** and **${guild.prefix}help** first!`);
            } else {
                let embed = new Discord.MessageEmbed();
    
                totalOrders = data.customer1Count + data.customer2Count + data.customer3Count + data.customer4Count;

                embed.setTitle(`${message.author.username}`);
                embed.setThumbnail(message.author.avatarURL());
                embed.setColor(colors.darkgray);
                embed.addField("Bakery Name", `🏪 ${data.bakeryName} (🥖)`);
                embed.addField("Strawberries", `🍓 ${data.money}`, true);
                embed.addField("Hearts", `❤️ ${data.heartMoney}`, true);
                embed.addField("Completed Orders", `📝 ${totalOrders}`);
                embed.addField(`Completed ${bot.user.username}`, `✅ ${data.timesCompleted} time(s)`);
                embed.setFooter(`${message.author.username}'s ${bot.user.username} Profile | Thank You For Playing!`);
    
                message.channel.send(embed);
            }
        })


    })

}

module.exports.help = {
    name: "bakery",
    aliases: ["profile", "p", "b"]
}