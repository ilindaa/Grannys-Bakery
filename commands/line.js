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
            } else { // data exists
            
                let embed1 = new Discord.MessageEmbed();
                embed1.setTitle(`Line | ${bot.user.username}`);
                embed1.setDescription(`The customer line is where you take orders and talk to customers to learn about their stories!\n**Line Information & Tips**\nYou can only accept one order at a time and you must finish the order before you move onto the next customer. You can choose to start with whichever customer. \n*Each customer can be served once every 24 hours (timer begins from the time the food order was delivered)* \n\nEach customer has his/her specific pastry/drink preferences, in which you can view with \`${guild.prefix}likes <customer #1-4>\`.\nGet a customer's order with \`${guild.prefix}order <customer #1-4>\`.\nPrepare and deliver orders with \`${guild.prefix}kitchen\`. \n **After** the order has been delivered to that specific customer, you be able to speak to that customer with \`${guild.prefix}talk <customer #1-4>\` and explore the customer's story a bit each day (*You cannot talk to the customer before you deliver the food*).`);
                embed1.setColor(colors.darkgray);
                message.channel.send(embed1);
                
            }
        })
    


    })
    

}

module.exports.help = {
    name: "line",
    aliases: []
}