const Discord = require("discord.js");
const colors = require("../colors.json");
const botconfig = require("../botconfig.json");
const food = require("../food.json");

module.exports.run = async (bot, message, args) => {

    let embed1 = new Discord.MessageEmbed(); 

    // 🥩🍗🍳🌭🍍🥛☕🍵🍓
    embed1.setTitle(`Menu | ${bot.user.username}`)
    embed1.setDescription(`\`\`\`BUNS \n[1] 🥩 ${food.item1} \n🍓 ${food.price1} \n[2] 🍗🍳 ${food.item2} \n🍓 ${food.price2} \n[3] 🌭 ${food.item3} \n🍓 ${food.price3} \n[4] 🍍 ${food.item4} \n🍓 ${food.price4} \n\nDRINKS \n[5] 🥛 ${food.item5} \n🍓 ${food.price5} \n[6] ☕ ${food.item6} \n🍓 ${food.price6} \n[7] 🍵 ${food.item7} \n🍓 ${food.price7} \n[8] ☕🍵 ${food.item8} \n🍓 ${food.price8}\`\`\` `);
    embed1.setColor(colors.darkgray);

    message.channel.send(embed1);
}

module.exports.help = {
    name: "menu",
    aliases: ["m"]
}