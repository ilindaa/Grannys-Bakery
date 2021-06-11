const Discord = require("discord.js");
const mongoose = require("mongoose");
const botconfig = require("../botconfig.json");
const colors = require("../colors.json");

mongoose.connect(botconfig.mongoPass, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

const Data = require("../models/data.js");

module.exports.run = async (bot, message, args) => {

    Data.find({
        lb: "all"
    }).sort([
        ['money', 'descending']
    ]).exec((err, res) => {
        if(err) console.log(err);

        var page = Math.ceil(res.length / 10);

        let embed = new Discord.MessageEmbed();
        embed.setTitle(`${bot.user.username} | 🍓 Leaderboard`);
        embed.setColor(colors.darkgray);
        embed.setThumbnail(bot.user.avatarURL());

        let pg = parseInt(args[0]);
        if(pg != Math.floor(pg)) pg = 1;
        if(!pg) pg = 1;
        let end = pg * 10;
        let start = (pg * 10) - 10;

        if (res.length === 0) {

            embed.addField("Error", "No pages found!");

        } else if (res.length <= start) {

            embed.addField("Error", "Page not found!");

        } else if (res.length <= end){

            embed.setFooter(`Page ${pg} of ${page}`)
            for(i = start; i < res.length; i++) {
                embed.addField(`${i + 1}. ${res[i].name}`, `**🍓 Strawberries:** ${res[i].money.toLocaleString()}`);
            }

        } else {

            embed.setFooter(`Page ${pg} of ${page}`)
            for(i = start; i < end; i++) {
                embed.addField(`${i + 1}. ${res[i].name}`, `**🍓 Strawberries:** ${res[i].money.toLocaleString()}`);
            }

        }
    
        message.channel.send(embed);

    });

}

module.exports.help = {
    name: "leaderboardm",
    aliases: ["lbm", "topm"]
}