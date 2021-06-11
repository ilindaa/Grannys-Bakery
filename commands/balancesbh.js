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

    if (!args[0]) {
        var user = message.author;
    } else {
        var user = message.mentions.users.first() || bot.users.cache.get(args[0]);
    }

    Data.findOne({
        userID: user.id
    }, (err, data) => {
        if(err) console.log(err);
        if(!data) {
            const newData = new Data ({
                name: bot.users.cache.get(user.id).username,
                userID: user.id,
                lb: "all",
                money: 0,
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
            return message.channel.send(`🍓 ${bot.users.cache.get(user.id).username} has 0 strawberries.\n❤️ ${bot.users.cache.get(user.id).username} has 0 hearts.`);
        } else {
            return message.channel.send(`🍓 ${bot.users.cache.get(user.id).username} has ${data.money} strawberries.\n❤️ ${bot.users.cache.get(user.id).username} has ${data.heartMoney} hearts.`);
        }
    })
}

module.exports.help = {
    name: "balance",
    aliases: ["bal"]
}