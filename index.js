// restarted on 7/9/2020, gotta [npm init], [npm install discord.js], [npm install fs], [npm install parse-ms], and [npm install mongoose]
const Discord = require("discord.js");
const bot = new Discord.Client({ disableEveryone: true}); 
const botconfig = require("./botconfig.json");
const fs = require("fs");

bot.commands = new Discord.Collection();
bot.aliases = new Discord.Collection();

// READ COMMANDS FOLDER
fs.readdir("./commands/", (err, files) => {
    if (err) console.log(err);

    let jsfile = files.filter(f => f.split(".").pop() === "js")
    if(jsfile.length <= 0) {
        console.log ("Couldn't find any commands!");
        return;
    }

    jsfile.forEach((f) => {
        let props = require(`./commands/${f}`);
        console.log(`${f} loaded!`);
        bot.commands.set(props.help.name, props);

        props.help.aliases.forEach(alias => {
            bot.aliases.set(alias, props.help.name);
        })
    })
})

fs.readdir("./events/", (err, files) => {
    if (err) return console.log(err);
    files.forEach(file => {
        if (!file.endsWith(".js")) return;
        const evt = require(`./events/${file}`);
        let evtName = file.split(".")[0];
        console.log(`${evtName} event loaded!`);
        bot.on(evtName, evt.bind(null, bot));
    })
})

bot.login(botconfig.token);