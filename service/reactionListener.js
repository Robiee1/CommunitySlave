module.exports = {
    name: 'reactionListener',
    description: 'Gives a role on a message reaction',
    async execute(message, Discord, client, channel) {


            const monkaRole = message.guild.roles.cache.find(role => role.name === "MONKA");

            const monkaEmoji = message.guild.emojis.cache.find(emoji => emoji.name === 'YEP') ;
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