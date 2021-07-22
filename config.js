require('dotenv').config();

const Discord = require('discord.js');
const prefix = 'slave ';
const client = new Discord.Client({partials: ["MESSAGE", "CHANNEL", "REACTION"]});
const fs = require('fs');
const channel = '867493610353459211';


client.commands = new Discord.Collection();
client.services = new Discord.Collection();

const commandFiles = fs.readdirSync('./commands/').filter(file => file.endsWith('.js'));
const serviceFiles = fs.readdirSync('./service/').filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
    const command = require(`./commands/${file}`);
    client.commands.set(command.name, command);
}

for (const file of serviceFiles) {
    const service = require(`./service/${file}`);
    client.services.set(service.name, service);
}

client.on('ready', () => {
    console.log(`Logged in as ${client.user.tag}!`);

});

client.on('messageReactionAdd', message => {

})

client.on('message', message => {

    if (!message.content.startsWith(prefix) || message.author.bot) return;
    const args = message.content.slice(prefix.length).split(/ +/);
    const command = args.shift().toLocaleLowerCase();


    if (command === 'reactionservice') {
        client.services.get('reactionService').execute(message, args, Discord, client, channel);
    }
});

client.login(process.env.DISCORDJS_BOT_TOKEN);