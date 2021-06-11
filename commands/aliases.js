const Discord = require("discord.js");
const colors = require("../colors.json");
const botconfig = require("../botconfig.json");

module.exports.run = async (bot, message, args) => {

    let embed1 = new Discord.MessageEmbed(); 

    embed1.setTitle(`Command Aliases`)
    embed1.setDescription(`\`\`\`help - N/A\naliases - a\nprologue - N/A\nstart - N/A\nsetbname - sbn\nprefix - N/A\ngamble - g\ndaily - d\ntips - tip, tj\nbakery - profile, p, b\nbalance - bal\nleaderboardm - lbm, topm\nleaderboardc - lbc, topc\nmenu - m\nline - N/A\norder - o\nkitchen - k\nkmake - km\nkuse - ku\nkdeliver - kd\nkclean - kc\ntalk - t\ngranny - gs\nlikes - l\ndiary - N/A\nshop - s\nend - N/A\`\`\``);
    embed1.setColor(colors.darkgray);

    message.channel.send(embed1);
}

module.exports.help = {
    name: "aliases",
    aliases: ["a"]
}