const mongoose = require("mongoose");
const botconfig = require("../botconfig.json");

// CONNECT TO DATABASE
mongoose.connect(botconfig.mongoPass, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

// MODELS
const Guild = require("../models/guild.js");

module.exports = async (bot, message) => {

    // CHECK CHANNEL TYPE
        if (message.channel.type === "dm") return;
        if (message.author.bot) return;

    Guild.findOne({
        guildID: message.guild.id
    }, (err, guild) => {
        if(err) console.log(err);
        if(!guild) {
            const newGuild = new Guild ({
                guildID: message.guild.id,
                guildName: message.guild.name,
                prefix: botconfig.prefix
            })

            newGuild.save().catch(err => console.log(err));
            return message.channel.send(`Thank you for adding ${bot.user.username}! This server has been saved, please retype your previous command!`);
    }

        let prefix = guild.prefix;
        // SET PREFIX
            
            if (!message.guild) return;
            if (!message.content.startsWith(prefix)) return;

        // CHECK PREFIX, DEFINE ARGS & COMMAND

        if (!message.guild) return;
        if (!message.content.startsWith(prefix)) return;

        if (!message.member) message.member = message.guild.fetchMember (message);

        const args = message.content.slice(prefix.length).trim().split(/ +/g);
        const cmd = args.shift().toLowerCase();

        // RUN COMMANDS

        if (cmd.length === 0) return;

        let command = bot.commands.get(cmd);
        if (!command) command = bot.commands.get(bot.aliases.get(cmd));

        if (command)
            command.run(bot, message, args);

        });

};