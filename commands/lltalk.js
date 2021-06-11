const ms = require("parse-ms");
const mongoose = require("mongoose");
const Discord = require("discord.js");
const colors = require("../colors.json");
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
            } else {
                let embed = new Discord.MessageEmbed();
                embed.setColor(colors.darkgray);
                
                if(!args[0] || !args[1]) {
                    embed.setTitle(`${bot.user.username} | Talk (Story)`);
                    embed.setDescription(`${bot.user.username} begins on a Monday and ends on Friday.\nEach of these characters will develop their stories over a 5-day week.\nThis is where you can see how many orders you have completed for each character. For every order completed, a day of their story is unlocked. You may start all four stories and can also revisit them again\n(i.e. after the 5th day or 5th order or until the game ends/resets).`);
                    embed.addField("Controls", `\`${guild.prefix}granny\`\n\`${guild.prefix}talk <customer #1-4> <day #1-5>\``);
                    embed.addField("[1] Gil", `📝 ${data.customer1Count} orders`);
                    embed.addField("[2] Nea", `📝 ${data.customer2Count} orders`);
                    embed.addField("[3] Mo", `📝 ${data.customer3Count} orders`);
                    embed.addField("[4] Darina", `📝 ${data.customer4Count} orders`);
                }

                if(args[0] == "1") { // Gil
                    if(args[1] == "1") {
                        if(data.customer1Count >= 1) {
                        embed.setTitle(`MONDAY: JUST BEING SILENT`);
                        embed.setDescription(`Just after you finished dusting the kitchen counter, you hear Po-po chattering away with another, you could hear her tell someone to perk up and that they’ll score a job very soon. Suddenly Po-po shouts, \"${message.author.username}, come here!\"\n\nPo-po spoke to the young man with black squared glasses and a gray hoodie covering his poofy hair.\n\n\"Aiya! Come, stand over here.\" says Po-po. She drags you to the man and introduces the two of you in a very haphazardly way.\n\nShe introduced the man as a university graduate and a soon-to-be literature teacher in A City.\n\n\"Gil, this is my grand-child, ${message.author.username} and ${message.author.username} this is Gil\" You awkwardly stand there and the man before you nods briefly and he noms on his bun while scrolling through forums.\n\nPo-po nags for a few minutes to explain that she knew that the two of us would struggle with social situations like this. She quickly ended it with a firm note that she wants the both of us to learn from each other’s problems and become friends.\n\nNot before long, Po-po lost interest in the conversation and left, suggesting that the two of us should talk. However, the spontaneous meeting ended shortly. Gil was focused on his own thing and quickly before I excused myself to hurry back to work.\n\n*Although the silence was not comforting, it was neither awkward, perhaps enough time would make the two more honest and open with one another.*`);
                        } else {
                            return message.reply("you cannot view this day's story until you have completed the order for that day.")
                        }
                    }

                    if(args[1] == "2") {
                        if(data.customer1Count >= 2) {
                            embed.setTitle(`TUESDAY: GIL’S REQUEST`);
                            embed.setDescription(`It was a warm afternoon with bright rays of sunshine that shone through the windows. Unluckily enough, you were tasked to wipe down the windows near the tables. With a cleaning spray in one hand and a cloth in the other, you got down to business. Amidst the wiping, you recall your mother telling you to wipe the dust down more often or else it would collect more and more. Dust was similar to problems, you don’t see it often when you’re consistent with cleaning or else it would eventually collect and take even more time to deal with.\n\nA shuffling of papers brings you back to reality and you notice Gil sitting at a table with papers in his hands. You figure the window you were at had enough wiping for the day and move onto another until you reached the window near Gil’s table. Despite feeling like you were being nosy, you remembered that you weren’t staying here for long and it wouldn’t hurt to help.\n\nYou ask, \"I might be overstepping my boundaries but if there’s anything I can help you out with, please let me know.\"\n\nYou notice him hesitate and open his mouth to refuse your help but he stops himself and says, \"Actually, there is something that I need help with.\"\n\nHe points at the stack of stapled papers in his hand. You put the cleaning supplies down and walk over to his side to get a closer look, the first thing you notice is the title ***Most Asked Interview Questions for Teachers*** and a circled date for an interview in two days.\n\nI look over the papers stapled and say, \"Ah.. do you want me to help interview you?\" *You look over at the clock surprise and see an angry Po-po catching you slacking off from work.* \"Ah.. I’m sorry, I don’t get off work until a few hours later.\"\n\nJust as you were about to refuse him, he says, \"How about tomorrow at the bakery? It seems inconvenient for you and I have to run some errands.\"\n\nYou nod in agreement and exchange numbers with him and resume your shift.`);
                        } else {
                            return message.reply("you cannot view this day's story until you have completed the order for that day.")
                        }
                    }

                    if(args[1] == "3") { // check
                        if(data.customer1Count >= 3) {
                            embed.setTitle(`WEDNESDAY: MOCK INTERVIEW`);
                            embed.setDescription(`Just earlier, the ringing tune from the bakery’s phone rang. I picked up and answered while scratching the pen on the paper a few times to let out the ink before writing down the order down. While I dazed off, the man on the phone asked if it was ${message.author.username} and said he was Gil, his younger sister would be picking up the order in his stead.\n\nI busied myself with work and quickly, 15 minutes passed. The chime from the bakery door rang slightly and the door swung open. The customer was a short-statured high schooler who looked like Gil, almost. The line became shorter as orders were picked up and soon the young girl had reached the counter.\n\nShe placed some bills on the counter as she said, \"I’m here to pick up my older brother’s order.\"\n\nYou gave the girl her change and the brown paper bag with the order and she strolled off with her umbrella and the goodies.\n\nAfter your shift, you decided to check your phone and realized there was a message from Gil, \"I’m sorry to change plans a few hours before our meeting but would it be alright if we had a phone interview later instead. There are some matters I have to attend to.\" You message back saying, \"Ah, yes that is alright.\" He replies, \"I’ll call you at the same time then.\"\n\nLater, you flop on your bed after a nice shower. Your comfort is cut short by the incoming call from Gil and a message with a pdf of the interview questions. He apologizes for the hold up and explains that he had to take care of an incident at home for his parents.`);
                            embed.addField("You sit up and cough briefly, preparing to interview him.", `U: \"Why do you want to become a teacher?\"\nG: \"I feel like there’s a lot of things to be learned in this world but very rare are there those who decide to help and change the younger generation. Although there are not many shy teachers like me, I want to be able to step out of my comfort zone and challenge myself with a field that seems impossible for me.\"\n\nYou run down the list of questions, you mentally note some of the points he mentions about himself throughout the mock interview. Perfectionism, difficulty with socialization, fear of challenges and new environments, and balancing between viewing things emotionally and logically were all too much relatable.\n\nAfter the interview, you decide to text him a goodluck for his interview. He thanks you for today and the two of you end the call.`);
                        } else {
                            return message.reply("you cannot view this day's story until you have completed the order for that day.")
                        }
                    }

                    if(args[1] == "4") {
                        if(data.customer1Count >= 4) {
                            embed.setTitle(`THURSDAY: DEEP TALKS OVER DRINKS`);
                            embed.setDescription(`*Early in the morning, Gil texts you.*\nG: \"I’m at the high school right now. My interview is soon! Feeling kind of nervous. :monkaS:\"\nU: \"You can do this! (hwaiting fists)\"\n\n*Many hours later, you check your phone after cleaning up after a slow day of work.*\nG: \"I think the interview went well. I’ll be notified in a few hours if I get it\"\nG: \"I GOT THE JOB!\"\nG: \"This might be awkward but I don’t really know anyone else to celebrate with, if you are free tonight it’s my treat.\"\nU: \":FeelsWowMan: YAY!! Congratulations! What time?\"\n\nHe texts you the time and location to food stalls nearby.\n\nThe place is populated and boisterous during the evening and with a few loops around, the two of you meet up and pick a place famous for fried noodles. The two of you order Sbrite to go along.\n\nU: \"If you don’t mind me asking, what errands were you running for the past few days?\"\nG: \"Some house chores, I have to clean the house, do laundry, and cook.\"\nU: \"You guys don’t split the chores?\"\nG: \"My parents are busy with work so I have to take care of my sister and I. My relationship with them isn’t that good. They chide me for being quiet, not pursuing a “better” job career, and my lack of work experience but I’m taking steps to work towards myself, it’s just not easy.\"\nU: \"I get that. Taking the steps towards doing what you want to do is already admirable, so don’t beat yourself up over it.\"\nG: \"I’ve failed interviews before this one and it’s been difficult and stressful but I’m thankful of how far I’ve come.\"\n\nThe two of you chat for longer, finish eating, and then head home.`);
                        } else {
                            return message.reply("you cannot view this day's story until you have completed the order for that day.")
                        }
                    }

                    if(args[1] == "5") {
                        if(data.customer1Count >= 5) {
                            data.adviceC1 = "Acknowledging the mutual hurt";
                            embed.setTitle(`FRIDAY: GIL’S ADVICE`);
                            embed.setDescription(`Gil brings his little sister, Hana along and introduces her to you. Hana jumps up from the table and decides to play with Chicken the dog, leaving just the two of you at the table. You decide to ask him if he’s able to give you some insight on your own problems and explain your reasons for coming to the countryside such as your parents’ consistent, critical behavior of you and your inability to be truly yourself in an emotionally draining environment.\n\nG: \"In that situation, I think you should go back to your parents and apologize to them and also speak out your boundaries so that they don’t cross the line. Parents are always going to view you as their child and might not take you seriously but if it bothers you, you have to let them know. It might not seem obvious at first but people may do things and not even recognize that it hurts others. If they continue to not listen, draw the lines there. Stick with your family and try to improve the situation as a whole.\"\n\nYou decide to jot down his advice down in your notebook. Gil smiles back and tells you that it’s no problem.\n\nG: \"The situation might be more complicated than it is but with time and sheer effort things can get better. I don’t know too much about your family issues but I hope you can resolve them soon.\"\nU: \"Thanks Gil, I appreciate it.\"`);
                        } else {
                            return message.reply("you cannot view this day's story until you have completed the order for that day.")
                        }
                    }
                }

                if(args[0] == "2") { // Nea
                    if(args[1] == "1") {
                        if(data.customer2Count >= 1) {
                        embed.setTitle(`MONDAY: NEA’S JEALOUSY`);
                        embed.setDescription(`Upon hearing borks and chatter from the back room, you walk towards the noise and wonder who the owner of the dog is. Amusingly, you see Po-po playing around with a fluffy, orange pomeranian with a chef’s hat. Po-po introduces the dog as a male pomeranian called Chicken, the owner of a shop next door. Suddenly, you remember there is a cabinet full of dog treats and decide to tempt the cute thing with some treats. The simple-minded dog or so you thought could not easily be tempted by measly treats. Thus, you give up and decide to resume working. Ironically, Chicken follows you with a toy, you squat down to play with him for minutes long before he jumps into your arms. In the midst of it, you hear the chime of the bakery door open. You feel an angry stare drill down your back and you instantly turn towards the stare quick enough to catch the suspect. You stand up with the pomeranian in your arms and walk over to the suspect—the girl. She has tanned skin and long, orange colored hair with bangs pinned with a simple barrett and she gave you the silent treatment with a sprinkle of the stink eye from time to time while continuing to show fondness for the dog. You swear you can almost hear her murmur in jealousy that she could never play with Chicken like that when she’s been working at his shop and that the dog was cold to her, not cute at all!`);
                        embed.addField("Po-po’s voice suddenly appears from behind your back,", `\"Oh, Nea! Are you here to pick up Chicken again?\"\n\nThe orange-haired girl responds semi-sarcastically, \"Yes, he ran over here the second I wasn’t looking.\"\n\nPo-po introduces me to Nea, \"This is my grandchild, ${message.author.username} will be staying here for a while. You’ve always wanted to go to A City, didn’t you? ${message.author.username} can tell you some of her stories.\"\n\nNea walks up to me and picks up Chicken from my arms and replies with a hmm before looking at you up and down and walks to leave, “Thanks Po-po, I’ll take up the city kid’s offer. I’ll take my leave now.” The orange pomeranian looks at you sadly as he is dragged off to work once again.`);
                        } else {
                            return message.reply("you cannot view this day's story until you have completed the order for that day.")
                        }
                    }

                    if(args[1] == "2") {
                        if(data.customer2Count >= 2) {
                            embed.setTitle(`TUESDAY: TALKS WITH INTROSPECTION`);
                            embed.setDescription(`During your break, you decide to read a few novels on your phone. In the midst of reading, you look up and see Nea pick up her order and walk to the shop next door.\n\n*Thinking to yourself, you realize you haven’t really explored the place, so you decide to utilize the break time to do a bit of exploring at the shop next door.*\n\nYou walk a block from the bakery and open the door to *Chicken’s Local Shop* slowly. You look around and see a small and comfy shop with different sections for snacks, souvenirs, and other assortments of gifts. *You can hear Nea lightly mumble to herself with a sigh, she wishes she wasn’t stuck working with no family to depend on.*\n\nNea takes a bite out of her bun and shouts out a welcome without looking up, appearing to be studying with puffed up eyes.\n\nFeeling like you’ve intruded on her rant, you make a remark, \"Uh… I overheard you earlier and I can kind of understand how you feel.\" Nea pokes her head out of her book, gets up and beckons you to follow her, you oblige.\n\nShe opens a freezer, a paper taped to the surface with the writing *Nea’s ice cream, not yours!! (jk)*, in the back of the shop and pulls out two popsicles, handing you one.\n\nN: \"How so?\"\nU: \"Hmm?\"\nN: \"I mean, how can you relate to my situation?\"\n\nYou begin to explain to her your story about leaving your family because it wasn’t a place of comfort, a negative relationship with your family suddenly became another source of evil in your mind, and so even though you felt it was selfish, it was better to leave. Nea expresses that you shouldn’t feel guilty for wanting to be happy and liberated, she too once felt like she had to be accountable for her family due to familial ties.`);
                            embed.addField("Who's that girl?", `N: \"I know a girl, she lives in a family where her mother doesn't talk about her father and her sister is spoiled rotten. Everything she owns and earns is by her own hardwork. She studies even though she isn't good at it and is still insulted by her mother.  She tried her hardest till it drove her to lose herself almost to suicide. She decided to leave and wandered until Po-po invited her to be Chicken's caretaker and assistant at his shop - she would get paid as she works so she can take out loans and go back to school to keep up with the monthly payments.\"\n\n*You realize that the girl she’s talking about is herself.*\n\nYou sit and finish the popsicle before you say goodbyes. As you make your way back to the bakery, you turn back and see Nea continue her studies.\n\n*Maybe next time you can ask what she’s been studying.*`);
                        } else {
                            return message.reply("you cannot view this day's story until you have completed the order for that day.")
                        }
                    }

                    if(args[1] == "3") {
                        if(data.customer2Count >= 3) {
                            embed.setTitle(`WEDNESDAY: TAKE CARE OF ANIMALS`);
                            embed.setDescription(`While working, you see Nea through the bakery windows squatting down and then suddenly jumping up. She shouts for you to come and you can hear her clearly through the thin walls. You decide to come out after requesting a break-time and get dragged off to join Nea’s antics. She explains her plan along the way while tossing you a tote bag for you to carry as the two of you run through the alleyway.\n\nN: \"We’re here at the cutest gambling center.\"\n\nYou see a pretty dilapidated and small shack with a lot of cat supplies, *you wonder who lives here.*\n\nN: \"This big korat cat is named *Catfish* and this small tabby cat is called *Mackerel* because he has a mackerel patterned fur. The cats have no owners but everyone comes by often with stuff.\"\n\nNea explains that she’s been trying to get *Catfish*, *Mackerel*, and *Chicken* to cooperate with her so she can practice caring for animals.\n\nU: \"Do you want to become a veterinarian?\"\nN: \"Mhm. All animals are really cute and adorable, they should be well-protected and cared for. I’m taking a gap year to study hard at the moment to become one.\"\n\nShe takes the tote bag in your hands and puts it on the floor, opening it to reveal a bunch of cat necessities like cat food, water, and some toys. She puts the stuff next to the food bowls, water bowls, and litter box with a scooper. The two of you cooperate and give the cats baths, feed them, and clean up their place until nightfall.`);
                        } else {
                            return message.reply("you cannot view this day's story until you have completed the order for that day.")
                        }
                    }

                    if(args[1] == "4") {
                        if(data.customer2Count >= 4) {
                            embed.setTitle(`THURSDAY: BEING A MOTHER`);
                            embed.setDescription(`Nea had texted you earlier to let you know she was coming to study here since Chicken had given her a day off work to study for her exams. You had set up some snacks and drinks at a table for her before getting back to work.\n\nUnexpectedly, a loud slap could be heard as a customer opened the bakery door. You turned to look in the direction of the noise and saw Nea clutching the side of her cheek, she stood across from an older woman who appeared to be furious at her.\n\n\"You ungrateful child! I’ve raised you for all these years and you embarrass me like this! You should have never been born. The neighbors all gossip about how you’ve been hanging around here for weeks without studying! When are you ever going to be like your younger sister who’s successful and obedient!\"\n\nThe woman shouts loud for everyone to hear around her that she doesn’t have a daughter like Nea before stomping her feet and turning to leave to her youngest daughter waiting for her with a worried expression. You rush over to the entrance where Nea is, no words can comfort her but you do your best. You hug her and tell her that everything is going to be okay.\n\nN: \"How two-faced they are. They were the ones who kicked me out. Can’t they see how hard I’ve been working to make money while studying? Can’t they be more understanding? Life is so rough and difficult to bear, I don’t know if I can deal with this for much longer.\"`);
                            embed.addField("A teary bond", `Tears continue to pour out as she reciprocates the hug. She sobs for a few minutes long and calms down, you invite her in to the bakery and pass her some snacks.\n\nYou let her know that the most important thing for her to do is to be strong. You tell her a story that happened to you when you were younger, being cursed at for simply existing or ridiculed for being inferior than the carefully crafted expectations in a mother’s head.\n\nWith red eyes, Nea stuffs her face with the snacks and angrily says that she’s appalled by both of mothers but she’s glad that you ended up the way that you are now. You tell her in agreement that you could say the same back to her.\n\nYou tell her though that your mother isn’t bad all the time, sometimes she cooks, cleans, and even tells interesting stories, she may be faulty but that’s because she’s human. Nea jokingly comments if you are showing off to her and the two of you talk until you send her off before nightfall.`);
                        } else {
                            return message.reply("you cannot view this day's story until you have completed the order for that day.")
                        }
                    }

                    if(args[1] == "5") {
                        if(data.customer2Count >= 5) {
                            data.adviceC2 = "Sacrifice and compromises";
                            embed.setTitle(`FRIDAY: NEA’S COOKIES ER… ADVICE`);
                            embed.setDescription(`As you prepare pastries and wait for them to bake in the oven, you see Nea enter the bakery.\n\nN: \"${message.author.username}! Are you busy?\"\nU: \"No, you caught me at a good time, I’m waiting for the pastries to bake. What’s up?\"\nN: \"The ceiling! Just kidding, I have something for you, I made them myself! They don’t look very good… but I swear they taste fine!\"\n\nShe hands you a bag of handmade cookies shaped like you and her.\n\nN: \"I know that you have a similar situation to mine but it’s also very different. I think you should go back to your family after all, you still seem to care for them as they do for you. You should do what you want to do in life even if they are against what you do as long as it’s legal. Speak up about the negative comments but be mindful of the comments that hold true. I know you can become successful!\"\nU: \":FeelsStrongMan: Thank you, Nea!\"`);
                        } else {
                            return message.reply("you cannot view this day's story until you have completed the order for that day.")
                        }
                    }
                }

                if(args[0] == "3") { // Mo
                    if(args[1] == "1") {
                        if(data.customer3Count >= 1) {
                        embed.setTitle(`MONDAY: COFFEE MAKES THE MAN`);
                        embed.setDescription(`As you make your way to the drink bar, you notice a tall man making coffee. You assume they are a worker without thinking and introduce yourself, \"Are you working here? I’m ${message.author.username} and I’ll be helping out here starting today.\"\n\nThe person turns around and chuckles with a big smile on his face.\n\nM: \"Haha, I don’t work here actually! I’m Maurice or Mo, kind of a regular here so I make my own coffee from time to time.\"\nU: \"Ah! Sorry for the misunderstanding..\"\nM: \"No, it’s really okay I just thought it was funny. I don’t like troubling the old woman and it’s fun learning new things. I didn’t know Po-po had a helper here, are you new?\"U: \"Mm. I’m kind of taking a break here for a while, I’m from A city.\"\nM: \"That’s kind of far, closer than it is from here to Hawaii though.\"\nU: \"Are you from Hawaii?\"\nM: \"Yes, it’s a long story as to how I ended up here though.\"\n\nPo-po interrupts the conversation and walks through the kitchen with her iPad. From her iPad, you could hear a violin playing with a piano accompaniment. Po-po attempts to show you the video but an embarrassed Mo blocks you from watching the video. He expresses that the video is nothing special and it’s part of his dark history. You know to not ask as his expression darkens from his earlier friendly behavior. You try to lighten the mood and excuse yourself to stock up the kitchen before the opening hours.`);
                        } else {
                            return message.reply("you cannot view this day's story until you have completed the order for that day.")
                        }
                    }

                    if(args[1] == "2") {
                        if(data.customer3Count >= 2) {
                            embed.setTitle(`TUESDAY: NO EYES JUST MUSIC`);
                            embed.setDescription(`In the morning, you decide to take an early walk before work and explore around. You stumble upon a sign that points towards the direction of a park and decide to walk and not think too much. You walk on the paved paths of the park and notice how peaceful and serene it is. You decide to sit down on one of the benches and hear the sound of a violin beginning to play its sound. You decide to close your eyes and listen to the melody, you realize it sounds similar to the video from yesterday and think of Mo. The feeling you get from the notes being played as the bow slides over the strings is a feeling of sorrow, loss, and also guilt. You wonder how the violinist had felt to be able to emit such emotions through music.\n\nM: \"${message.author.username}?\"\n\nYou open your eyes to the sound of your name. You tell him that it’s a lovely melody and he says thanks. The two of you don’t say much for a while but he breaks the silence.\n\nM: \"Sometimes, I pick up the violin just to reminisce the past and to not forget what I’ve done in the past that I’m not proud of.\"\nU: \"Everyone’s bound to make mistakes and although I don’t know what you did, no one is perfect and free from making mistakes. Just constantly striving for improvement is the least you can do for yourself at this moment.\"\n\nYou tell him that you’ll be there to listen to his story if he’s willing to tell his story. He tells you that he’ll take you up on that offer before packing up his violin. The two of you walk back to the bakery in silence while appreciating the beauty of summer.`);
                        } else {
                            return message.reply("you cannot view this day's story until you have completed the order for that day.")
                        }
                    }

                    if(args[1] == "3") {
                        if(data.customer3Count >= 3) {
                            embed.setTitle(`WEDNESDAY: FRIENDS GROW APART?`);
                            embed.setDescription(`While daydreaming and preparing ingredients, Mo asks you if you remember the melody from yesterday. You respond somewhat jokingly and tell him that it was an unforgettable melody. Mo expresses that he’s taken some consideration to your words and thinks that he should open up to someone and find the best way to have closure from something that has been troubling for long. You stop preparing the ingredients and set them aside to listen.\n\nHe tells you how he used to be a social media influencer of some sort on MeTube with his best friend, a piano accompanist of his. Eventually he overworked himself and his friend had to tap out due to personal issues. He started to view popularity and fame as being the most important part of success rather than enjoying the process of creating. He felt guilt for falling into a trap that he swore he wouldn’t have gotten himself into before creating content online, that all of this would just be for fun and not about the numbers. Mo’s community noticed the fall in the quality of the videos and blamed it on him for his friend leaving him and out of guilt Mo decided to quit after hearing his friend was taking an indefinite leave from music. He couldn't take the guilt so he moved away to be somewhere farther away and laid low key. He felt like he was the one who broke the friendship and didn't contact him since. Ever since his friend had appeared back online, creating music something that ignited in him to pursue music again. He asks if it would be weird and selfish to go back and reconcile with his old friend and maybe go back to what he was doing happier before, he feels like he shouldn’t run away anymore.`);
                            embed.addField("Po-po suddenly pops up from the entrance of the kitchen and speaks,", `\"You should go and do what you want within legal circumstances, staying here isn’t going to solve your problems. It’s not weird to want to make amends and while it may seem selfish, life is all about living for yourself. It’s more of doing yourself a disfavor to not do what you want in the moment.\"\nU: \"I agree with Po-po, I think that you should go back and meet your friend again, you seem to love playing the violin and cherish your friend a lot. If you can restore the friendship that would be something nice to do and you’ll be able to play again without being burdened by the past.\"\n\nMo slaps you on the back and tells you that you’ve expressed it well. He decides to go and see his friend again but texts him first before ordering the plane ticket. He waves goodbye and tells you and Po-po that he’s heading off and he’ll be back soon. Po-po shakes her head and smiles before heading off.`);
                        } else {
                            return message.reply("you cannot view this day's story until you have completed the order for that day.")
                        }
                    }

                    if(args[1] == "4") {
                        if(data.customer3Count >= 4) {
                            embed.setTitle(`THURSDAY: STARTING IS ROUGH`);
                            embed.setDescription(`Mo sends you a short summary over text,\n\nM: \"I texted my friend to meet up and if we can talk since it’s been many years. He agreed to meet up and that’s good because I’ve paid for the ticket already.\"\n\nAfter booking a plane there, he sends you a picture of the two of them getting lunch together and a video clip of them busking on the streets of Hawaii.\n\nU: \":peepoHappy: Have fun!\"\n\nHe sends you a picture of him going back since it was a spontaneous one-day trip.\n\nLater on that day, Mo pops into the bakery and tells Po-po that he’ll continue to make music here instead of going back to Hawaii since this place is more like home to him at the moment. He understands that he’ll have to start off from scratch again but now he’s going in with experience and a different mindset of solely creating for himself to express himself. He’ll still do his best to grow and engage with his community but caring about numbers won’t be the reason for why he’s creating music.\n\nMo decides to ask you for help in shooting his first video for his channel. He decides to play the same melody that he played in the park and with his friend. With your cinematography skills, you somehow manage to film a nice video. Mo edits the video and publishes it on MeTube celebrating with Po-po and you.\n\nM: \"Although I don’t have as much fans as before, I’m glad I still have those around me supporting what I do and for that I’m very grateful.\"\n\nPo-po decides to take out some snacks and drinks and they celebrate and huddle around to watch Mo’s video screen-casted on the TV. The rest of you guys relax and enjoy the music and the amiable atmosphere.`);
                        } else {
                            return message.reply("you cannot view this day's story until you have completed the order for that day.")
                        }
                    }

                    if(args[1] == "5") {
                        if(data.customer3Count >= 5) {
                            data.adviceC3 = "You support but won’t carry";
                            embed.setTitle(`FRIDAY: MO’S ADVICE`);
                            embed.setDescription(`You see Mo sitting by a table tuning his violin and wait for him to finish. You kind of mull over your emotions and wonder how you should ask him about your family dilemma. Mo notices this and rests his violin on his lap.\n\nM: \"You seem like you have something to say, it’s alright you can tell me.\"\nU: \"How did you know? Well, it’s kind of random and sudden to ask you but I wanted to know what you think or would do if you were in my situation.\"\n\nYou pull a chair and sit down at the table and explain to him how your family situation isn’t the worst but it also isn’t considered to be the best. You talk about how everything from your mother, to your father, to your sister.\n\nMo opens up about how he doesn't have parents now they’ve passed away in earlier years and he also has no siblings but in this situation he would go back and abide by their rules to an extent.\n\nM: \"Most parents simply want what's best for you in their interests and while that may not be for you, listen to them first without disregarding what you want. Taking the high road is important because you don't I now how long your parents are going to be alive for and you don't know what your parents have been through. If no one supports them you have to unless they do something that's unforgivable.\"\n\nYou reflect on his words for a bit and thank him for his advice. He tells you that it’s no problem and that he’s willing to help if he’s able to even though he’s unsure if you can apply his advice to your situation since there’s a lot of differing variables from your life to his.`);
                        } else {
                            return message.reply("you cannot view this day's story until you have completed the order for that day.")
                        }
                    }
                }

                if(args[0] == "4") { // Darina
                    if(args[1] == "1") {
                        if(data.customer4Count >= 1) {
                        embed.setTitle(`MONDAY: CROQUIS IS “krō-ˈkē”`);
                        embed.setDescription(`You wake up for work early to prepare and memorize the tips Po-po taught you about working the bakery. Unexpectedly you head over to the bakery entrance and see a woman busily scribbling away in a sketchbook. The elegant woman lifts her head.\n\nD: \"Hm.. you’re new here?\"\nU: \"Yes, I am Po-po’s grandchild, ${message.author.username} from A City.\"\n\nShe introduces herself as a designer at Darina’s Boutique and tells you that she would like to make clothes that fit your figure. Realizing she slipped into her workaholic nature quite suddenly, she apologizes and asks if you would be willing to pose for her croquis sketches. You look at her with a confused expression and she explains that croquis drawings are simple sketches that can be drawn freely and quickly so that it won’t take up much of your time. She simply tells you to work as you naturally do so you decide to practice making coffee and prepare ingredients.\n\nThe mysterious woman hands you the croquis sketches she drew of you earlier and tells you that she appreciates you for your time before leaving abruptly. You ponder over the woman’s strangeness but you don’t think much of it. You notice her walk towards a smaller shop nearby before entering it, the sign is too small for you to see but you note that perhaps it was the boutique she mentioned.\n\nLooking over the croquis, you can tell the artist paid attention to a lot of small details, it was very nice sketch.`);
                        } else {
                            return message.reply("you cannot view this day's story until you have completed the order for that day.")
                        }
                    }

                    if(args[1] == "2") {
                        if(data.customer4Count >= 2) {
                            embed.setTitle(`TUESDAY: PASSION MAGIC`);
                            embed.setDescription(`Darina sits at the same spot the day before and calls you over. She tells you that you should have a few hours until the bakery opens and since you’re free now she asks if you would like to go over to her boutique. You cave into your curiosity and decide to explore the places that you haven’t been to yet.\n\nWhen you enter the small shop, you notice the place to be more rustic and about as small as you’ve thought it to be from its exterior. However, it appears as if you enter a completely different dimension through the door with the scattered assortments of cloths lying around. Darina urges you to try on an outfit for her while pushing a paper bag into your hands and rushing you into the changing room. You open the bag a notice a dress, you don’t normally wear dresses but you decide to appreciate her sentiment and try on the outfit.\n\nD: \"A dress is not something that people normally wear but it should be. Don’t dresses just make you feel different in a way? It’s something that’s typically out of everyone’s comfort zones but it helps unleash a special side of the person who wears it. To others it might just be a dress but to me every dress is like a magical spell casted on someone that can make them become a special version of themselves if even for just a little while.\"\n\nYou look yourself in the mirror and you notice a ${message.author.username} staring back at you in a gingham orange and yellow summery dress with sandals and a straw hat with a yellow bow conveniently placed onto your head earlier by Darina. She compliments that it suits your sunny personally rather than the tacky colors she's seen before. She decides to give it to you as a gift. You tell her that you can't possibly take something without doing her a favor so she decides to tell you to come to listen to her stories since she has no children and rarely do people stop by. At such a simple and pure request, you smile and agree.`);
                        } else {
                            return message.reply("you cannot view this day's story until you have completed the order for that day.")
                        }
                    }

                    if(args[1] == "3") {
                        if(data.customer4Count >= 3) {
                            embed.setTitle(`WEDNESDAY: TEA PARTIES`);
                            embed.setDescription(`At dawn, you stop by Darina’s boutique and notice that no one is there yet. You knock while reading the sign that tells you to make yourself at home if she’s not there, you decide to enter and seat yourself in the waiting area. You look around and notice that the place really seems like a mess most of the time but you figure that there is some order to their chaos and ignore it. Moments later after daydreaming, Darina comes in through the door hauling bags of stuff with a calico cat following her by her side. She opens the bag and pulls out a tea set and a box of pastries from the bakery. You tell her that you’ve never seen the pastries selling at the bakery and she explains that the pastries are custom ordered to suit her tastes. She mentions that she knows Po-po from way back and cares for her diet so she limits herself to a few sweets each week but this time she ordered more for two people. The two of you finish setting up the table and seat yourselves.\n\nD: \"Hm.. tea parties usually have stories to go along right? Since I don’t have any stories prepared, I’ll tell you a story.\"`);
                            embed.addField("She starts off with how there was a very beautiful woman that fell in love with a rich man.", `That same man tossed the woman away when he found out she was pregnant with a girl instead of a boy. In later years, the mother shamed and blamed the daughter and only spared her basic needs from time to time. They lived in a small, rented room. The daughter worked outside odd jobs to help her mother from a young age in a factory but didn't receive love for her efforts but instead hate for being the reason the man tossed his lover away. What the daughter didn’t realize until she grew up was that the real reason wasn't because of the child’s gender but because the relationship had spurred from lust not love. Eventually the mother brought her daughter to an adoption center and had left her since. The girl learned to draw before developing an interest in making clothes after seeing the caretakers there sew clothes themselves.`);
                            embed.addField("The young girl had went through numerous interviews but none were successful, years went by and she had become of age to leave.", `She decided to start the boutique she had now when she was young and met a kind grandmother who had a bakery opened for a while and kick-started her career. One day the grandmother brought a stray cat back that was injured and helped care for it. The young girl had spent many days to weeks caring and feeding it even though the cat was hostile. Eventually the cat reciprocated the girl’s feelings so much the grandmother gifted the cat to her.\n\nYou smile fondly at the woman before you and understand that the young girl in the story is Darina. You almost tear up through her experiences but her giggles stop you. She comments on how it’s been ages since she’s told this story again and she’s thankful that you were willing to listen to this story of hers. The two of you snack on the pastries and chatter until the bakery’s opening hours.`);
                        } else {
                            return message.reply("you cannot view this day's story until you have completed the order for that day.")
                        }
                    }

                    if(args[1] == "4") {
                        if(data.customer4Count >= 4) {
                            embed.setTitle(`THURSDAY: CAT GOT YOUR MONEY`);
                            embed.setDescription(`At the bakery, Darina mentions that there's a gambling shop nearby owned by the stray cats, you decide to tag along. On the walk there she tells you that she figures that Nea has probably taken you there before but she wants to personally make sure the cats are doing alright. You help her groom and wash the cats, cut their nails, and also open new cans of cat food for them. Darina talks about a funny story of how she also helped cut Chicken's nails once but after that he mostly ran away from her in fear.\n\nYou notice how happy and content Darina is with her life and ask if there's anything that would help you become at peace with your life one day. She tells you that there's no surefire way for anything in life and that she's not as happy or even as adventurous as you might think she is. Deep down she also hides a lot of these insecurities through her passions of clothing design or creation and the way she dresses herself up.  Although it seems to be a simple thing, for her it allows her to be truly herself by wearing and doing what she likes.\n\nEven now with her family situation, she found her mother’s contact information and sends her money from time to time out of respect for their familial situation. Although they are not close as a mother and daughter would normally be, she finds peace in being able to heal from the past and forgive her mother. You find her words reasonable and tell her that if you have any other questions you'll be sure to ask her.\n\nThe two of you finish hanging out with the cats and take pictures and video clips. Darina airdrops the pictures and images before the two of you part.\n\n*At the bakery*\nAfter ingredient preparations, you decide to take out your phone and look over the pictures and video clips that Darina sent you earlier. You finish watching the videos and it puts a smile to your face.`);
                        } else {
                            return message.reply("you cannot view this day's story until you have completed the order for that day.")
                        }
                    }

                    if(args[1] == "5") {
                        if(data.customer4Count >= 5) {
                            data.adviceC4 = "Just returning the favor";
                            embed.setTitle(`FRIDAY: DARINA’S THOUGHTS`);
                            embed.setDescription(`Early at dawn, you head over to Darina's boutique before the bakery opens.\n\nYou ask her what she would do in a family that makes her feel depressed and ridicules passions that don't earn money. You explain to her in detail mostly about your mother, then your father, and your sister.\n\nDarina tells you firmly that you should leave and try being independent for a few years.\n\n\D: \"If you stay in an environment like that you might rid yourself of the person that you want to be an sacrifice yourself. While it may seem selfish to others, knowing when to leave is important for your growth. I’m not saying to cut off all contact but to be in another space where both you and your family can be free. If it seems like you guys aren't happy together, why force it. Let yourselves grow as individuals for a period of your life so that when you come back it won't be as monotone as before. It's not easy to leave if they control you and you might have to leave In secret but a long break for growth from each other can make the heart grow fonder at times. Your generation should be willing to take risks, while living apart you guys can still call and text so it's not like you guys cut each other off either. I can't choose for you but this is my advice to you.\"\n\nYou thank her and tell her that’ll you'll promote the dress she gifted often to your friends. She thanks you as well and tells you to be well.`);
                        } else {
                            return message.reply("you cannot view this day's story until you have completed the order for that day.")
                        }
                    }
                }

                if(args[0] == "1" || args[0] == "2" || args[0] == "3" || args[0] == "4") {
                    embed.setFooter(`© 2020 ${bot.user.username} | Thank You For Reading!`);
                } else if(args[0]){
                    return message.reply("there are only 4 customers!");
                }
                data.save().catch(err => console.log(err));
                message.channel.send(embed);
            }
        })


    })
    
    
}

module.exports.help = {
    name: "talk",
    aliases: ["t"]
}