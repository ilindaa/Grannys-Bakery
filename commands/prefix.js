const mongoose = require("mongoose");
const botconfig = require("../botconfig.json");

// CONNECT TO DATABASE
mongoose.connect(botconfig.mongoPass, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

// MODELS
const Guild = require("../models/guild.js");

module.exports.run = async (bot, message, args) => {

    if(!message.member.hasPermission("MANAGE_MESSAGES")) {
        return message.channel.send("You do not have permission to use this command!");
    };

    Guild.findOne({
        guildID: message.guild.id
    }, (err, guild) => {
        if(err) console.log(err);
        if(!guild) {
            const newGuild = new Guild({
                guildID: message.guild.id,
                guildName: message.guild.name,
                prefix: botconfig.prefix
            })

            newGuild.save().catch(err => console.log(err));
            return message.channel.send(`Thank you for adding ${bot.user.username}! This server has just been saved, please retype your previous command!`);

        } else { // if guild exists

            if(!args[0]) return message.channel.send(`You must specify a prefix to set for this server! Your current server prefix is \`${guild.prefix}\``);

            if(args[0]) {
                let guildPrefix = args[0];
                guild.prefix = guildPrefix;
            }

            guild.save().catch(err => console.log(err));

            return message.channel.send(`Your server prefix has been updated to \`${args[0]}\``);

        }
    })
}

module.exports.help = {
    name: "prefix",
    aliases: []
}