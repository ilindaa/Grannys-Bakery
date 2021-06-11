const Discord = require("discord.js");
const colors = require("../colors.json");
const mongoose = require("mongoose");
const botconfig = require("../botconfig.json");
const food = require("../food.json");

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
            } else { // data exists
                let embed = new Discord.MessageEmbed();
                embed.setColor(colors.darkgray);

                if(!args[0]) {
                    if(data.shopItem == "none") {
                        embed.setTitle(`${message.author.username} pushes the door open to a small, local shop near ${bot.user.username}`);
                        embed.setDescription(`A happy, smiling pomeranian greets you while panting, *bORK boRK!!* \n You don't understand but assume that he is trying to market some goods to you.\n \n A sign reads, *Chicken's Local Shop: Limited to **one purchase** per person!* \`\`\`[1] ${food.sitem1} | 🍓 ${food.sprice1} \nFor those not looking to spend a lot of money, but want to put good thought into it.\n \n[2] ${food.sitem2} | 🍓 ${food.sprice2} \nFor those who are up for surprises and a bit of variety.\`\`\``);
                        embed.addField("Controls", `Use \`${guild.prefix}shop buy <item #>\` to make a **one** time purchase from the shop! \n*(Note: Choose wisely, there are no refunds allowed so this choice cannot be changed unless you **end the game or restart**!)*`)
                        message.channel.send(embed);
                    } else {
                        embed.setTitle(`${message.author.username} pushes the door open to *Chicken's Local Shop*`)
                        embed.setDescription(`You remember that you already bought an item (**${data.shopItem}**).\nYou decide to obey his rules lest you face the wrath of a cute pomeranian.\nYou window shop for a bit, despite Chicken's obvious signs to drive you out, before leaving the shop.`);
                        message.channel.send(embed);
                    }
                }

                    if(args[0] == "buy") {
                        if(data.shopItem == "none") {

                            if(args[1] == "1") {
                                data.shopItem = food.sitem1;
                                if(data.money >= food.sprice1) {
                                    data.money -= food.sprice1;
                                } else {
                                    return message.reply(`you do not have enough to buy ${data.shopItem}!`);
                                }
                            }
    
                            if(args[1] == "2") {
                                data.shopItem = food.sitem2;
                                if(data.money >= food.sprice2) {
                                    data.money -= food.sprice2;
                                } else {
                                    return message.reply(`you do not have enough to buy ${data.shopItem}!`);
                                }
                            }

                            embed.setDescription(`You have bought ${data.shopItem}.\n🍓 You now have ${data.money} strawberries.`);
                            message.channel.send(embed);
                            
                            data.save().catch(err => console.log(err));

                        } else {
                            embed.setTitle(`Chicken gives you a warning!`)
                            embed.setDescription(`You have already made your one time purchase with no refunds.`);
                            message.channel.send(embed);
                        }
    
                }
    
    
            }
        })


    })
    

}

module.exports.help = {
    name: "shop",
    aliases: ["s"]
}