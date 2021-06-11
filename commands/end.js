const ms = require("parse-ms");
const mongoose = require("mongoose");
const Discord = require("discord.js");
const colors = require("../colors.json");
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
                return message.reply(`you have not even started, how can you end the game..?\nUse the command **${guild.prefix}start** and **${guild.prefix}help** first!`);
            } else {
                let embed = new Discord.MessageEmbed();
                embed.setColor(colors.darkgray);

                let embed2 = new Discord.MessageEmbed();
                embed2.setColor(colors.darkgray);

                let embed3 = new Discord.MessageEmbed();
                embed3.setColor(colors.darkgray);

                let embed4 = new Discord.MessageEmbed();
                embed4.setColor(colors.darkgray);

                if(data.chooseAdvice == "no advice") {
                    return message.reply("you must select an advice to follow before you end the game!");
                }

                if(data.shopItem== "none") {
                    message.reply("you can choose to not buy a shop item, but fair warning, the ending will be pretty lackluster!");
                }

                embed.setTitle(`Are you sure you want to end ${bot.user.username}?`);
                embed.setDescription(`Warning: After using this command, all of your game progress and data will be wiped.\nTo proceed with ending the game, reply with \`yes\`\nTo cancel this command, reply with anything else (ex: \`cancel\`)`);
                embed.addField("Chosen Advice", `${data.chooseAdvice}`);
                embed.addField("Shop Item", `${data.shopItem}`);
                message.channel.send(embed);
                
                    message.channel.awaitMessages(m => m.author.id == message.author.id,
                        {max: 1, time: 30000}).then(collected => {
                                if (collected.first().content.toLowerCase() == 'yes') { // ending/reset
                                    message.reply("your game data/progess has been wiped! Feel free to play again to explore another ending if you'd like.");
                                        if(data.chooseAdvice == data.adviceC1) {
                                            embed3.setTitle(`Ending 1: Acknowledging the mutual hurt | Gil`);
                                            embed3.setDescription(`Both of you and your family owned up to what hurt and try to make up for it.\n\nYou decide to go back and stay with your family.\n\nYou apologize for running away from home and worrying everyone and explain to your mother that she repeats the same patterns of hurting your feelings and invalidating your life choices, making you feel extremely depressed. Although you don’t know if your mother acknowledged your feelings, she’s started to stop doing things that hurt you and you decide to treat her better.`);
                                        }
                        
                                        if(data.chooseAdvice == data.adviceC2) {
                                            embed3.setTitle(`Ending 2: Sacrifice and compromises | Nea`);
                                            embed3.setDescription(`You learned that you’re not completely at fault and your parents aren’t either. You all made sacrifices to stop arguments and did more to balance the relationship.\n\nYou decide to go back and stay with your family.\n\nYou decide to talk it through with your mother mainly and let her know what you and her have done to hurt each other. You give each of you enough time to voice out your opinions and reflect the other’s. You do your best to not invalidate her opinions and stop her from invalidating your own. The two of you learn to realize that you’re not completely at fault but your parents aren’t either. You guys find compromises at times and make small sacrifices for each other’s happiness.`);
                                        }
                        
                                        if(data.chooseAdvice == data.adviceC3) {
                                            embed3.setTitle(`Ending 3: You support but won’t carry | Mo`);
                                            embed3.setDescription(`You help your parents from time to time and listen to what they want but you don’t do everything for them. You make efforts to consistently allow them to show their efforts and know when to back off.\n\nYou decide to stay in contact with your family.\n\nYou haven’t decided if you want to live with your family or move out. You help your parents from time to time and listen to what they want but you don’t do everything for them. You make efforts to consistently allow them to show their efforts and know when to back off. You speak your mind truthfully to your parents and even though they initially didn’t like it, they began to adjust and got used to your honesty.`);
                                        }
                        
                                        if(data.chooseAdvice == data.adviceC4) {
                                            embed3.setTitle(`Ending 4: Just returning the favor | Darina`);
                                            embed3.setDescription(`You accept your parents' behaviors as an issue and do your best to work around their issue. You do your best to simply take care of them as they’ve cared for you and try to get a handle on your emotions.\n\nYou decide to go move out but stay in contact with your family.\n\nAlthough memories weren’t always the fondest, you’ve appreciated your parents’ and the fact that they’ve done a better job than most parents do. You accept your parents behavior as an issue but you never give up on doing your best to work around their issue. You take care of them as they’ve cared for you and try to get a handle on your emotions when sometimes they resurface again.`);
                                        }

                                        if(data.shopItem == food.sitem1) {
                                            embed4.setTitle(`Epilogue 1: Hopeful`);
                                            embed4.setDescription(`Gil becomes a senior literature teacher and has adjusted himself well in his environment. He ended up being the teacher of the year as many of the students and faculty admire him for his passions and enthusiasm for literature. In Gil’s free-time, he prepares for fun and interesting seminars and debates for student club members as the advisor of the literature club. Hana and Gil have also become closer with one another and hang out at the bakery often.\n\nNea becomes a veterinarian and practiced in A City for a few years. She borrows a loan from Po-po to open up a small clinic for her business. She treats stray animals for free while also treating pets for fair prices. She also adopted Chicken after his retirement, Nea enjoys spoiling Chicken with premium dog treats and lots of petting after work. Nea has met a lot of close friends during university and got to show more of herself as a person like her animal-loving personality. She does her best to take care and love every animal.\n\nDarina promotes her designs through an online platform called Instargram. From her early posts, it seemed that no one could notice her until one day a famous page retweeted her works and she received many praises and follows for her designs. Since then Darina has accumulated many followers who have ordered custom tailoring and/or designs. Darina has also traveled back to Europe to explore the designs there and even won a contest that garnered her more fame. Darina decided to open up an art Instargram and post drawings of daily life and her queen cat spoiled by cat toys and treats and sharing how she's grateful for being able to support herself with her passions.\n\nMo opened up a Batreon for his music while updating his MeTube account regularly. Mo didn't have many fans initially but his friend decided to post his video and many of their old fans showed their support for him.`);
                                            embed4.addField("Continued", `Mo also releases a collaboration with him and his friend on his MeTube as well. Mo began to work hard again with his passions and even does some DJing from time to time at bars, making a name for himself to working with other musicians and artists to compose music for games and movies.\n\nPo-po continues her bakery business and hires Gil's sister to help with the shop from time to time since Hana is interested in culinary and baking. Po-po also adopts Catfish and Mackerel so they accompany Hana when Po-po is enjoying her vacation travelling around the world. Po-po's grandson also stops by to walk Hana home, watch over her when it's late, and also treats her out for meals (he probably likes her). The bakery is the same with new and old customers that come to enjoy the pastries and drinks. Catfish and Mackerel are spoiled silly by the couple and have been very full, safe, and happy they have been since, abandoning their gambling habits.`);
                                        }

                                        if(data.shopItem == food.sitem2) {
                                            embed4.setTitle(`Epilogue 2: Realistic`);
                                            embed4.setDescription(`Gil lands his teacher job as a senior literature teacher. He mostly makes lesson plans each day and chills when he gets home. He doesn't really do anything special but mostly reads. Sometimes he picks up a cookbook to make meals for himself. His sister has moved out and so has he. He doesn't have to take care of her but it gets lonely. He does his best to contact his parents every once in a while and also gets extremely sleep-deprived during exam seasons.\n\nNea is still practicing as a veterinarian at another person's vet clinic. She takes strays in and tries to help them for free but gets yelled at many times by her boss for it so she has to do it secretly. Her coworker also helps her though. Po-po is taken care of by Chicken since Nea doesn't have the means to take care of him right now but she makes nice homemade pet treats for him.\n\nAlthough Darina has started to post art on Instargram as a designer, she hasn't gained much attention from people. She does her best to post often and follow the algorithm. She's not able to live off her designs completely but making clothes for people locally has helped her support her cat at least. She cuts back on spending for her clothes to be able to fund her shop. Darina also sold her room lease to live with Po-po for cheaper rent and food.`);
                                            embed4.addField("Continued", `Mo created a SoundClear and posted some of his songs and he has a small number of consistent viewers who listen to his music. Although he's not getting a lot of support, he has a loyal fan base and he is grateful for them. Mo DJs sometimes to earn money in A City. He's sometimes disappointed by his slow growth but he keeps working hard.\n\nPo-po takes in Mackerel and Catfish while managing the business each day. She hires Gil's sister to help out and the shop is open a few days a week. The business is pretty stable with no big changes. Po-po cannot travel on her own since she is old so she stays at the bakery most of her days and spares other days to do non-strenuous activities.`);
                                        }
                                        message.channel.send(embed3);
                                        if(data.shopItem != "none") {
                                            message.channel.send(embed4);
                                        }

                                        data.name = message.author.username;
                                        data.userID = message.author.id;
                                        data.lb = "all";
                                        data.money = 0;
                                        data.heartMoney = 0;
                                        data.daily = 0;
                                        data.hourlyTip = 0;
                                        data.numDay = 0;
                                        data.numTotalDays = 0;
                                        data.bakeryName = "Granny's Bakery";
                                        data.ovenTime = 0;
                                        data.barTime = 0;
                                        data.ovenInfo = "Not In Use [1]";
                                        data.barInfo = "Not In Use [2]";
                                        data.ovenHearts = "🖤🖤🖤🖤🖤";
                                        data.barHearts = "🖤🖤🖤🖤🖤";
                                        data.shopItem = "none";
                                        data.ovenItem = "none";
                                        data.barItem = "none";
                                        data.customer1Time = 0;
                                        data.customer2Time = 0;
                                        data.customer3Time = 0;
                                        data.customer4Time = 0;
                                        data.customer1Count = 0;
                                        data.customer2Count = 0;
                                        data.customer3Count = 0;
                                        data.customer4Count = 0;
                                        data.grannyCount = 0;
                                        data.currentOrder = "none";
                                        data.currentOrderPastry = "none";
                                        data.currentOrderDrink = "none";
                                        data.adviceC1 = "???";
                                        data.adviceC2 = "???";
                                        data.adviceC3 = "???";
                                        data.adviceC4 = "???";
                                        data.chooseAdvice = "no advice";
                                        data.timesCompleted += 1;
                                        data.save().catch(err => console.log(err));

                                } else {
                                    embed2.setDescription(`✅ ${guild.prefix}end canceled!`);
                                    message.channel.send(embed2);    
                                }

                        }).catch(() => {
                                embed2.setDescription(`No answer after 30 seconds\n✅ ${guild.prefix}end canceled!`);
                                message.channel.send(embed2);
                        });

            }
        })


    })


}

module.exports.help = {
    name: "end",
    aliases: []
}