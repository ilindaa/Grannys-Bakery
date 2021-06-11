const mongoose = require("mongoose");
const botconfig = require("../botconfig.json");

// CONNECT TO DATABASE
mongoose.connect(botconfig.mongoPass, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

// MODELS
const Data = require("../models/data.js");

module.exports.run = async (bot, message, args) => {

    if(message.author.id != "351052315563786261") return;

    let user = message.mentions.members.first() || bot.users.cache.get(args[0]);
    if(!user) return message.reply("sorry, couldn't find that user!");

    Data.findOne({
        userID: user.id
    }, (err, userData) => {
        if(err) console.log(err);

        if (!args[1]) return message.reply("please specify the amount you want to pay.");

        if(args[1] != Math.floor(args[1])) return message.reply("please enter only whole numbers!");

        if(!userData) {
            const newData = new Data ({
                name: bot.users.cache.get(user.id).username,
                userID: user.id,
                lb: "all",
                money: parseInt(args[1]),
                heartMoney: 0,
                daily: 0,
                hourlyTip: 0,
                numDay: 0,
                numTotalDays: 0,
                bakeryName: "Granny's Bakery",
                ovenTime: 0,
                barTime: 0,
                ovenInfo: "Not In Use [1]",
                barInfo: "Not In Use [2]",
                ovenHearts: "🖤🖤🖤🖤🖤",
                barHearts: "🖤🖤🖤🖤🖤",
                shopItem: "none",
                ovenItem: "none",
                barItem: "none",
                customer1Time: 0,
                customer2Time: 0,
                customer3Time: 0,
                customer4Time: 0,
                customer1Count: 0,
                customer2Count: 0,
                customer3Count: 0,
                customer4Count: 0,
                currentOrder: "none",
                currentOrderPastry: "none",
                currentOrderDrink: "none",
                adviceC1: "???",
                adviceC2: "???",
                adviceC3: "???",
                adviceC4: "???",
                chooseAdvice: "none",
            })
            newData.save().catch(err => console.log(err));
        } else {
            userData.money += parseInt(args[1]);
            userData.save().catch(err => console.log(err));
        }

        return message.channel.send(`🍓 ${message.author.username} admin paid ${args[1]} strawberries to ${bot.users.cache.get(user.id).username}.`);
    })
    
}

module.exports.help = {
    name: "adminpays",
    aliases: ["aps"]
}