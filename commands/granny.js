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

    let timeout = 28800000; // 8 hours
    let grannyHearts = 2;
    let count = 1;


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
                let embed = new Discord.MessageEmbed();
                embed.setColor(colors.darkgray);

                if(data.grannyCount == 1) { // choose some random statements and u get nothing by talking to her more lmao
                    embed.setTitle(`You spend some quality time with Po-po`);
                    let chill = ["draw", "cook", "read", "play"];
                    var pick = chill[Math.floor(Math.random() * chill.length)];
                    if(pick == "draw") {
                        embed.setDescription(`You and Po-po draw each other during break time.`);
                    }
                    if(pick == "cook") {
                        embed.setDescription(`You decide to go to the kitchen and help Po-po with cooking.`);
                    }
                    if(pick == "read") {
                        embed.setDescription(`The both of you read a book together (ft. Chicken sleeping).`)
                    }
                    if(pick == "play") {
                        embed.setDescription(`Po-po, ${message.author.username}, and Chicken play together at the playground near ${bot.user.username}.`)
                    }
                    message.channel.send(embed);
                }


                if(data.grannyCount == 0) {
                    embed.addField(`Small Gift For ${message.author.username} 🎁`, `You have received 🍓 269 for viewing this side story!`);
                    embed.setTitle(`Po-po sits you (${message.author.username}) down for a long chat`);
                    embed.setDescription(`Po-po asks you to think about the reason why you escape and that it's okay to do sometimes but to let problems linger on without resolving them is taking the easy way out. Po-po lets you know that she's guilty of that too but she does her best when she can. Po-po reminds you that there are many people in the world that can help you and equally, you can help change them.\n\nThrough the talk with Po-po, you think about your family a lot.\nAt times you simply see the bad or blind yourself with the few good or bad they have done.\n\nAt the end of the day you might feel hurt because you haven't communicated properly to them, have you ever sat down and truly taken the time to talk to them and focus on the present rather than things that haven't happened yet? If you haven't then you should do so to treasure moments with your family. To have stable relationships is to make sacrifices at times and to do your best to be kind to yourself and others.\n\nP: \"It’s hard to do and life is a journey of learning how to become better mistakes you’ve made years ago can still be made again. Just do your best to learn from them and move on to be happy. Not all families are meant to be but if the relationship can be repaired don’t hesitate or else it’ll be too late. Just remember that no one is a saint or completely without fault. In their eyes you may also have done things that have wronged them just as they have wronged you.\"`);
                    data.grannyCount = 1;
                    data.money += 269;
                    data.save().catch(err => console.log(err));
                    message.channel.send(embed);
                }
                
            }
        })


    })
    

}

module.exports.help = {
    name: "granny",
    aliases: ["gs"]
}