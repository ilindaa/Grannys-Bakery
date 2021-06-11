const mongoose = require("mongoose");
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
            } else { // if data exists
    
                if(!args[0]) return message.reply("please enter a name for your bakery! (Name can only be 1-4 words long)");
    
                if(args[0]) {
    
                    let bname = args[0];
                    data.bakeryName = bname;
    
                    if(args[1]) {
    
                        let bname2 = args[1];
                        data.bakeryName = bname + " " + bname2;
    
                        if(args[2]) {
    
                            let bname3 = args[2];
                            data.bakeryName = bname + " " + bname2 + " " + bname3;
    
                            if(args[3]) {
    
                                let bname4 = args[3];
                                data.bakeryName = bname + " " + bname2 + " " + bname3 + " " + bname4;
    
                            }
                        }
                    }
                }
    
                data.save().catch(err => console.log(err));
    
                message.reply(`your bakery name has been set to ${data.bakeryName}`);
    
            }
        })
    


    })
    
    
}

module.exports.help = {
    name: "setbname",
    aliases: ["sbn"]
}