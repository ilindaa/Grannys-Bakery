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
    guild = new Guild({
        guildID: guild.id,
        guildName: guild.name,
        prefix: botconfig.prefix
    });

    guild.save().catch(err => console.log(err));

    return console.log('I have joined a new server!');
    
};