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

    let timeout1 = 600000; // 10 minutes, total of 20 minutes baking bread tbh 300000
    let timeout2 = 300000; // 5 minutes each but wait for first one done lol


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
    
    
                if(data.ovenTime == 0) {
    
                    setOvenInfo = `Not In Use [1]`;
                    data.ovenInfo = setOvenInfo;
    
                } else { // data.ovenTime = some other number
                    let time1 = ms(timeout1 - (Date.now() - data.ovenTime));
    
                        if(timeout1 - (Date.now() - data.ovenTime) > 0) {
                            data.ovenInfo = `${data.ovenItem}\nHearts: ${data.ovenHearts}\nProgress: ${time1.minutes} minutes & ${time1.seconds} seconds`;
                        } else { // time is < 0 negative cooldown
                            data.ovenInfo = `${data.ovenItem}\nHearts: ${data.ovenHearts}\nProgress: Ready to be delivered!`;
                        }
    
                }
    
                if(data.barTime == 0) {
    
                    setBarInfo = `Not In Use [2]`;
                    data.barInfo = setBarInfo;
                    
                } else { // data.barTime = some other number
                    let time2 = ms(timeout2 - (Date.now() - data.barTime));
    
                        if(timeout2 - (Date.now() - data.barTime) > 0) {
                            data.barInfo = `${data.barItem}\nHearts: ${data.barHearts}\nProgress: ${time2.minutes} minutes & ${time2.seconds} seconds`;
                        } else { // time is < 0 negative cooldown
                            data.barInfo = `${data.barItem}\nHearts: ${data.barHearts}\nProgress: Ready to be delivered!`;
                        }
    
                }
    
                data.save().catch(err => console.log(err));
    
                // ${guild.prefix}kitchen
                    let embed1 = new Discord.MessageEmbed(); 
                
                    embed1.setTitle(`Kitchen | ${bot.user.username}`);
                    embed1.setDescription(`The kitchen is where you make buns and drinks! You don't have to worry about pre-heating the oven because the temperature is always set *just right* for the buns \`${guild.prefix}kitchen or ${guild.prefix}k\`\n**Kitchen Information & Tips**\nWith the kitchen spaces, you make buns in the oven and drinks in the drink bar *only* (respectively 1 & 2). *Putting hearts in your food items will make the customers happy and it's worth more 🍓!*\n\nFirst, get a customer's order with \`${guild.prefix}order <customer #1-4>\`. \nAfter they tell you their order, open the menu with \`${guild.prefix}menu\`. \nPrepare order(s) with \`${guild.prefix}kmake <k space #1-2> <menu item #1-8>\`. \nYou can enhance food items with \`${guild.prefix}kuse <k space #1-2> <hearts #1-5>\`. \nIf you make an error with your order or decide to scrap it before delivery, you can clean the oven/drink bar with \`${guild.prefix}kclean <k space #1-2>\`, however your 🍓 will be deducted according to the price of the item on the menu! \nYou can deliver orders with \`${guild.prefix}kdeliver <k space #1-2> <customer #1-4>\`.\n**After** delivery, you can talk to them with \`${guild.prefix}talk <customer #1-4>\` to explore their story! View \`${guild.prefix}line\` for more info!`);
                    embed1.addField(`Oven`, `${data.ovenInfo}`, true);
                    embed1.addField(`Drink Bar`, `${data.barInfo}`, true);
                    embed1.setColor(colors.darkgray);
                
                    message.channel.send(embed1);
            }
        })


    })


}

module.exports.help = {
    name: "kitchen",
    aliases: ["k"]
}