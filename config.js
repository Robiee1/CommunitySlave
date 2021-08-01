require('dotenv').config();

const Discord = require('discord.js');
const prefix = 'slave ';
const client = new Discord.Client({partials: ["MESSAGE", "CHANNEL", "REACTION"]});
const fs = require('fs');
const channelId = process.env.DISCORDJS_CHANNEL_ID;


client.commands = new Discord.Collection();
client.services = new Discord.Collection();

const serviceFiles = fs.readdirSync('./service/').filter(file => file.endsWith('.js'));

for (const file of serviceFiles) {
    const service = require(`./service/${file}`);
    client.services.set(service.name, service);
}

client.on('ready', () => {
    console.log(`Logged in as ${client.user.tag}!`);

});
client.on('raw', async (reaction, user) => {
    client.services.get('reactionListener').execute(reaction, user, client, channelId);
});

client.on('message', message => {
    if (!message.content.startsWith(prefix) || message.author.bot) return;
    const args = message.content.slice(prefix.length).split(/ +/);
    const command = args.shift().toLocaleLowerCase();
    if (command === 'reactionservice') {
        client.services.get('reactionService').execute(message, args, Discord, client, channelId);
    }
});


client.login(process.env.DISCORDJS_BOT_TOKEN);