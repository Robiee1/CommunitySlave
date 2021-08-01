module.exports = {
    name: 'reactionService',
    description: 'Gives a role on a message reaction',
    async execute(message, args, Discord){

        const monkaEmoji = message.guild.emojis.cache.find(emoji => emoji.name === 'YEP') ;

        let embed = new Discord.MessageEmbed()
            .setColor('#e42643')
            .setTitle('Choose a role!')
            .setDescription('Choosing a role will allow you to see role channels!\n\n\ ' + ` ${monkaEmoji}  for all monkas`);

        let messageEmbed = await message.channel.send(embed);
        messageEmbed.react(monkaEmoji);
    }
}