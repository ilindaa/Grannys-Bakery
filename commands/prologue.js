
const Discord = require("discord.js");
const colors = require("../colors.json");

module.exports.run = async (bot, message, args) => {

        let pages = ['', '', '', '', '', '', '', '', ''];
        let page = 1;
        
        let embed = new Discord.MessageEmbed() ;

        embed.setColor(colors.darkgray);
        embed.setFooter(`Page ${page} of ${pages.length}`);
        embed.setTitle(`${bot.user.username} Prologue`);
        // page one
        embed.setDescription(`Thank you so much for playing **${bot.user.username}**, **${message.author.username}**! \n \n **Controls** \n Use ⬅️ and ➡️ to change the page.`);

        message.channel.send({embed}).then(msg => {
          msg.react('⬅️').then( r => {
            msg.react('➡️')
        
            // Filters
            const backwardsFilter = (reaction, user) => reaction.emoji.name === '⬅️' && user.id === message.author.id
            const forwardsFilter = (reaction, user) => reaction.emoji.name === '➡️' && user.id === message.author.id
        
            const backwards = msg.createReactionCollector(backwardsFilter, {timer: 6000})
            const forwards = msg.createReactionCollector(forwardsFilter, {timer: 6000})
        
            backwards.on('collect', (r, u) => {
                if (page === 1) return r.users.remove(r.users.cache.filter(u => u === message.author).first());
                page--;
                embed.setFooter(`Page ${page} of ${pages.length}`);
                msg.edit(embed);
                r.users.remove(r.users.cache.filter(u => u === message.author).first());

                if (page === 1) {
                    embed.setDescription(`Thank you so much for playing **${bot.user.username}**, **${message.author.username}**! \n \n **Controls** \n Use ⬅️ and ➡️ to change the page.`);
                    msg.edit(embed);
                }
    
                if (page === 2) {
                    embed.setDescription(`Your parents are always worried and fighting over finances in the family. They lecture daily on how you’ve grown up for so long yet you still don’t know how to do \"*basic*\" things. You recall your mother’s jarring words and her years of insults that she had thrown at you from daily fits of anger, \"**${message.author.username}**, when I was your age, I was able to cook, do laundry, live away from home!\"`);
                    msg.edit(embed);
                }
    
                if (page === 3) {
                    embed.setDescription(`Your mother had become lazy over the years and wishes she could stop working while your father had been continuously burdened by the task of having to take care of the family. They have consistently fought over the years to the point where divorce would be likely and you began to feel immensely burdened by your mother’s daily criticisms.`);
                    msg.edit(embed);
                }
    
                if (page === 4) {
                    embed.setDescription(`One day, you made a selfish decision. The pressure after all these years were too much on your hands and you decided to leave the place that you once called home. \"Home\" no longer felt comforting or even like a home, with each happy moment in distant memory.`);
                    msg.edit(embed);
                }
    
                if (page === 5) {
                    embed.setDescription(`Enough was enough, you had packed everything readily and the next day, you left a message for your parents and travelled to your grandma’s place in the countryside to seek your happiness and independence from your parents.`);
                    msg.edit(embed);
                }
    
                if (page === 6) {
                    embed.setDescription(`After many long hours on the train, you arrived at a *small dilapidated building and the familiar sound of cicadas reached your ears.* Your grandma notices you and says in surprise, \"**${message.author.username}**, oh dear, why are you here? Shouldn’t you be in A City?\"`);
                    msg.edit(embed);
                }

                if (page === 7) {
                    embed.setDescription(`You stand in silence. Your grandma, **Po-po** gives you a mild nod of understanding and sends you into the small bakery. The *sweet smell of the freshly baked bread was faint in the air*, after all you had arrived after business hours and it was time for the day to end.`);
                    msg.edit(embed);
                }

                if (page === 8) {
                    embed.setDescription(`*beep beep beep beep.* \n The alarm wakes you up and you recall the purpose of coming to your grandma’s. It was to escape from your parents for a bit and to find who you really are inside. You walk to the front of the bakery and notice that the bakery seems to be quite busy, \"**Po-po**, let me help you.\"`);
                    msg.edit(embed);
                }

                // max page is 9th (include 1-8 pages)

            })
        
            forwards.on('collect', (r, u) => {
                if (page === pages.length) return r.users.remove(r.users.cache.filter(u => u === message.author).first());
                page++;
                embed.setFooter(`Page ${page} of ${pages.length}`);
                msg.edit(embed);
                r.users.remove(r.users.cache.filter(u => u === message.author).first());
    
                // min page is 1st (include 2-9 pages)

                if (page === 2) {
                    embed.setDescription(`Your parents are always worried and fighting over finances in the family. They lecture daily on how you’ve grown up for so long yet you still don’t know how to do \"*basic*\" things. You recall your mother’s jarring words and her years of insults that she had thrown at you from daily fits of anger, \"**${message.author.username}**, when I was your age, I was able to cook, do laundry, live away from home!\"`);
                    msg.edit(embed);
                }
    
                if (page === 3) {
                    embed.setDescription(`Your mother had become lazy over the years and wishes she could stop working while your father had been continuously burdened by the task of having to take care of the family. They have consistently fought over the years to the point where divorce would be likely and you began to feel immensely burdened by your mother’s daily criticisms.`);
                    msg.edit(embed);
                }
    
                if (page === 4) {
                    embed.setDescription(`One day, you made a selfish decision. The pressure after all these years were too much on your hands and you decided to leave the place that you once called home. \"Home\" no longer felt comforting or even like a home, with each happy moment in distant memory.`);
                    msg.edit(embed);
                }
    
                if (page === 5) {
                    embed.setDescription(`Enough was enough, you had packed everything readily and the next day, you left a message for your parents and travelled to your grandma’s place in the countryside to seek your happiness and independence from your parents.`);
                    msg.edit(embed);
                }
    
                if (page === 6) {
                    embed.setDescription(`After many long hours on the train, you arrived at a *small dilapidated building and the familiar sound of cicadas reached your ears.* Your grandma notices you and says in surprise, \"**${message.author.username}**, oh dear, why are you here? Shouldn’t you be in A City?\"`);
                    msg.edit(embed);
                }

                if (page === 7) {
                    embed.setDescription(`You stand in silence. Your grandma, **Po-po** gives you a mild nod of understanding and sends you into the small bakery. The *sweet smell of the freshly baked bread was faint in the air*, after all you had arrived after business hours and it was time for the day to end.`);
                    msg.edit(embed);
                }

                if (page === 8) {
                    embed.setDescription(`*beep beep beep beep.* \n The alarm wakes you up and you recall the purpose of coming to your grandma’s. It was to escape from your parents for a bit and to find who you really are inside. You walk to the front of the bakery and notice that the bakery seems to be quite busy, \"**Po-po**, let me help you.\"`);
                    msg.edit(embed);
                }

                if (page === 9) {
                    embed.setDescription(`The purpose of this short, story-driven game is to first, help out at your grandma’s bakery in the country. The next is to resolve the frequent issues that lies between both you and your parents, but to do that you must learn the stories of those visiting the bakery. Each person has their own experiences and knowledge that they can share with you and only when you learn and take in what you have learned, can you truly grow and learn from the problems that you encounter in your life.`);
                    msg.edit(embed);
                }



            })

          })
        })

}

module.exports.help = {
    name: "prologue",
    aliases: []
}