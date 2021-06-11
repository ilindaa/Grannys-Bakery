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
            return message.reply(`please do the command **${guild.prefix}start** and then **${guild.prefix}help**`);
        }


        Data.findOne({
            userID: message.author.id
        }, (err, data) => {
            if(err) console.log(err);
            if(!data) {
                return message.reply(`please do the start command **${guild.prefix}start** and then **${guild.prefix}help**`);
            } else {

                    let embed = new Discord.MessageEmbed();
    
                    if(!args[0]) {
                        embed.setTitle(`${bot.user.username} | Help`);
                        embed.setThumbnail(bot.user.avatarURL());
                        embed.setDescription(`Use \`${guild.prefix}help <page>\` to go to another page.\n To use a command, do: \`${guild.prefix}<command>\``);
                        embed.addField("Page 1: General Commands", `General commands for ${bot.user.username}.`);
                        embed.addField("Page 2: Bakery Management Commands", `Commands that involve taking orders to delivery of buns and/or drinks.`);
                        embed.addField("Page 3: Story Progression Commands", `Commands that are necessary to progress the storyline of ${bot.user.username}.`);
                        embed.addField("Links", "[Tips/Beginner's Guide](https://docs.google.com/document/d/10AGh5thyE6TvdM6k3KmUfXgKoc5JFaoe2EwEGsFKFeU/edit?usp=sharing)");
                        embed.setFooter("Commands: 27 public | 2 exclusive | 2 extra");
                    }

                    if(args[0] == "1") {
                        embed.setTitle(`${bot.user.username} | General Commands`);
                        embed.addField("aliases", `View all possible aliases for commands.`);
                        embed.addField("prologue", `View the prologue of ${bot.user.username}.`);
                        embed.addField("start", `Start ${bot.user.username}.`);
                        embed.addField("setbname", `Set the name of your bakery.`);
                        embed.addField("prefix", `View the server's prefix or change your server's prefix with \`${guild.prefix}prefix <prefix>\``);
                        embed.addField("gamble", `Gamble your strawberries away (ouh don't actually do it..)`);
                        embed.addField("daily", `Collect your daily reward.`);
                        embed.addField("tips", `Check for tips.`); 
                        embed.addField("bakery", `View your bakery/profile.`);
                        embed.addField("balance", `View your balance quickly.`);
                        embed.addField("leaderboardm", `View the player leaderboards for most strawberries.`);
                        embed.addField("leaderboardc", `View the player leaderboards for most game completion.`);
                    }

                    if(args[0] == "2") {
                        embed.setTitle(`${bot.user.username} | Bakery Management Commands`);
                        embed.addField("menu", `View the bakery's menu.`);
                        embed.addField("line", `View more information about the customer line.`);
                        embed.addField("order", `Take an order from a customer.`);
                        embed.addField("kitchen", `View the kitchen.`);
                        embed.addField("kmake", `Make drinks at the bar or food in the oven.`);
                        embed.addField("kuse", `Enhance a drink/food with hearts.`);
                        embed.addField("kdeliver", `Deliver to a customer.`);
                        embed.addField("kclean", `Clean the oven or bar.`);
                    }

                    if(args[0] == "3") {
                        embed.setTitle(`${bot.user.username} | Story Progression Commands`);
                        embed.addField("talk", `Talk to a customer from the line.`);
                        embed.addField("granny", `Talk to your granny (you may even get a small gift!! 🎁🍓).`)
                        embed.addField("likes", `View each customer's preferences.`);
                        embed.addField("diary", `View your diary and choose which advice you want to follow if any.`);
                        embed.addField("shop", `Purchase a shop item or just window shop.`);
                        embed.addField("end", `End the game (works only when an advice is followed and/or shop item is bought).`);
                    }

                    /* hidden commands for my usage:
                    aps - admin pay in strawberries
                    aph - admin pay in hearts

                    kinda irrelevant commands but i still kept them:
                    ping/p - pong with the ms
                    purge/clear - clear msgs (only those with manage messages can use this command)

                    */

                    embed.setColor(colors.darkgray);
                    message.channel.send(embed);

            }
        })


    })

}

module.exports.help = {
    name: "help",
    aliases: []
}