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

    let timeout = 86400000;
    let reward = 69;
    let heartReward = 5;
    let weeklyReward = 269;
    let weeklyHeartReward = 10;

    let day = 1;
    let totalDays = 1;


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
                if(timeout - (Date.now() - data.daily) > 0) { // check if timeout is not equal to 0 (not 24 hr)
                    let time = ms(timeout - (Date.now() - data.daily));
    
                    let embed2 = new Discord.MessageEmbed();
    
                    if(data.numDay == 1) {
                        embed2.addField(`Daily Streak ${data.numDay}/7`, "❤️🖤🖤🖤🖤🖤🖤");
                    }
                    if(data.numDay == 2){
                        embed2.addField(`Daily Streak ${data.numDay}/7`, "❤️❤️🖤🖤🖤🖤🖤");
                    }
                    if(data.numDay == 3){
                        embed2.addField(`Daily Streak ${data.numDay}/7`, "❤️❤️❤️🖤🖤🖤🖤");
                    }
                    if(data.numDay == 4){
                        embed2.addField(`Daily Streak ${data.numDay}/7`, "❤️❤️❤️❤️🖤🖤🖤");
                    }
                    if(data.numDay == 5){
                        embed2.addField(`Daily Streak ${data.numDay}/7`, "❤️❤️❤️❤️❤️🖤🖤");
                    }
                    if(data.numDay == 6){
                        embed2.addField(`Daily Streak ${data.numDay}/7`, "❤️❤️❤️❤️❤️❤️🖤");
                    }
                    if(data.numDay == 7){
                        embed2.addField(`Daily Streak ${data.numDay}/7`, "❤️❤️❤️❤️❤️❤️❤️");
                    }
    
                    embed2.setTitle(`Nice try! | ${bot.user.username}`);
                    embed2.setDescription(`❌ Po-po *clearly* remembers that you have been paid for the day! \n You can claim your pay in **${time.hours} hours, ${time.minutes} minutes, and ${time.seconds} seconds.**`);
                    embed2.setColor(colors.darkgray);
                    embed2.setFooter(`${message.author.username}'s Total Streak: ${data.numTotalDays}\nUse ${guild.prefix}daily for 7 days to earn a bonus!`);
                    message.channel.send(embed2);
                } else { // if time is equal to 0 (24 hours)
    
                    // incr numDay/numTotalDays by one
                    data.numDay += day; // counts 1-7 and then resets to 1
                    data.numTotalDays += totalDays; // counts total days
    
                   
                    if (data.numDay != 7) {
                        data.money += reward;
                        data.heartMoney += heartReward;
                    } else { // if data's day = 7
                        data.money += weeklyReward;
                        data.heartMoney += weeklyHeartReward;
                    }
                    data.daily = Date.now();
    
                    let embed3 = new Discord.MessageEmbed();
    
                    embed3.setTitle(`Daily Pay | ${bot.user.username}`);
                    embed3.setDescription(`🍓 Po-po has given you a sum of ${reward} strawberries for the day! \n While working, you followed a borking sound and found ${heartReward} hearts! ❤️`);
                    embed3.setColor(colors.darkgray);
                    embed3.setFooter(`${message.author.username}'s Total Streak: ${data.numTotalDays}\nUse ${guild.prefix}daily for 7 days to earn a bonus!`);
                    
                        if(data.numDay == 1) {
                            embed3.addField(`Daily Streak ${data.numDay}/7`, "❤️🖤🖤🖤🖤🖤🖤");
    
                        } else if(data.numDay == 2){
                            embed3.addField(`Daily Streak ${data.numDay}/7`, "❤️❤️🖤🖤🖤🖤🖤");
    
                        } else if(data.numDay == 3){
                            embed3.addField(`Daily Streak ${data.numDay}/7`, "❤️❤️❤️🖤🖤🖤🖤");
    
                        } else if(data.numDay == 4){
                            embed3.addField(`Daily Streak ${data.numDay}/7`, "❤️❤️❤️❤️🖤🖤🖤");
    
                        } else if(data.numDay == 5){
                            embed3.addField(`Daily Streak ${data.numDay}/7`, "❤️❤️❤️❤️❤️🖤🖤");
    
                        } else if(data.numDay == 6){
                            embed3.addField(`Daily Streak ${data.numDay}/7`, "❤️❤️❤️❤️❤️❤️🖤");
    
                        } else if(data.numDay == 7){
                            embed3.addField(`Daily Streak ${data.numDay}/7`, "❤️❤️❤️❤️❤️❤️❤️");
                            embed3.setDescription(`🎉 Popo: “Congratulations on a 7 day streak!”  🎉 \n 🍓 Po-po has a gift of ${weeklyReward} strawberries for you! 🍓 \n \n Chicken borks excitedly at the ground! \n You found ${weeklyHeartReward} hearts! ❤️`);
                            data.numDay = day-1;
                        }
                        data.save().catch(err => console.log(err));
    
                    message.channel.send(embed3);
    
    
                }
                
            }
        })


    })


}

module.exports.help = {
    name: "daily",
    aliases: ["d"]
}