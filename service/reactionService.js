module.exports = {
    name: 'reactionService',
    description: 'Gives a role on a message reaction',
    async execute(message, args, Discord, client, channel){

        const monkaRole = message.guild.roles.cache.find(role => role.name === "MONKA");

        const monkaEmoji = message.guild.emojis.cache.find(emoji => emoji.name === 'YEP') ;

        let embed = new Discord.MessageEmbed()
            .setColor('#e42643')
            .setTitle('Choose a role!')
            .setDescription('Choosing a role will allow you to see role channels!\n\n\ ' + ` ${monkaEmoji}  for all monkas`);

        let messageEmbed = await message.channel.send(embed);
        messageEmbed.react(monkaEmoji);


        client.on('messageReactionAdd', async (reaction, user) => {
            if (reaction.message.partial) await reaction.message.fetch();
            if (reaction.partial) await reaction.message.fetch();
            if (user.bot) return;
            if (!reaction.message.guild) return;

            if (reaction.message.channel.id == channel){
                if(reaction.emoji.name === 'YEP'){
                    await reaction.message.guild.members.cache.get(user.id).roles.add(monkaRole);
                }
            } else {
                return;
            }
        });
        client.on('messageReactionRemove', async (reaction, user) => {
            if (reaction.message.partial) await reaction.message.fetch();
            if (reaction.partial) await reaction.message.fetch();
            if (user.bot) return;
            if (!reaction.message.guild) return;

            if (reaction.message.channel.id == channel){
                console.log('was here');
                if(reaction.emoji.name === monkaEmoji){
                    await reaction.message.guild.members.cache.get(user.id).roles.remove(monkaRole);
                }
            } else {
                return;
            }
        });

    }
}