const mongoose = require('mongoose');
const botconfig = require("../botconfig.json");

// CONNECT TO DATABASE
mongoose.connect(botconfig.mongoPass, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

// MODELS
const Guild = require("../models/guild.js");

module.exports = async (bot, guild) => {
    Guild.findOneAndDelete({
        guildID: guild.id
    }, (err, res) => {
        if(err) console.log(err);
        return console.log('I have been removed from a server!');
    });
};