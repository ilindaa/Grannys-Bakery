const Discord = require("discord.js");
const colors = require("../colors.json");
const botconfig = require("../botconfig.json");
const food = require("../food.json");

module.exports.run = async (bot, message, args) => {

    let embed1 = new Discord.MessageEmbed(); 

    // š„©šš³š­šš„āšµš
    embed1.setTitle(`Menu | ${bot.user.username}`)
    embed1.setDescription(`\`\`\`BUNS \n[1] š„© ${food.item1} \nš ${food.price1} \n[2] šš³ ${food.item2} \nš ${food.price2} \n[3] š­ ${food.item3} \nš ${food.price3} \n[4] š ${food.item4} \nš ${food.price4} \n\nDRINKS \n[5] š„ ${food.item5} \nš ${food.price5} \n[6] ā ${food.item6} \nš ${food.price6} \n[7] šµ ${food.item7} \nš ${food.price7} \n[8] āšµ ${food.item8} \nš ${food.price8}\`\`\` `);
    embed1.setColor(colors.darkgray);

    message.channel.send(embed1);
}

module.exports.help = {
    name: "menu",
    aliases: ["m"]
}