// BOT ONLINE MESSAGE AND ACTIVITY MESSAGE

module.exports =  bot => {
    console.log(`${bot.user.username} is online on ${bot.guilds.cache.size} servers!`);
    
        bot.user.setPresence({
            status: 'idle',
            activity: {
                name: 'with your feels | gb.help',
                type: 'PLAYING'
            }
        });
}