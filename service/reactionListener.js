module.exports = {
    name: 'reactionListener',
    description: 'Gives a role on a message reaction',
    async execute(reaction, user, client, channelId){
        client.on('messageReactionAdd', async (reaction, user) => {
            const monkaRole = reaction.message.guild.roles.cache.find(role => role.name === "MONKA");
            if (reaction.message.partial) await reaction.message.fetch();
            if (reaction.partial) await reaction.message.fetch();
            if (user.bot) return;
            if (!reaction.message.guild) return;

            if (reaction.message.channel.id == channelId) {
                if (reaction.emoji.name === 'YEP') {
                    await reaction.message.guild.members.cache.get(user.id).roles.add(monkaRole);
                }
            } else {
                return;
            }
        });
        client.on('messageReactionRemove', async (reaction, user) => {
            const monkaRole = reaction.message.guild.roles.cache.find(role => role.name === "MONKA");
            if (reaction.message.partial) await reaction.message.fetch();
            if (reaction.partial) await reaction.message.fetch();
            if (user.bot) return;
            if (!reaction.message.guild) return;

            if (reaction.message.channel.id == channelId){
                if(reaction.emoji.name === 'YEP'){
                    await reaction.message.guild.members.cache.get(user.id).roles.remove(monkaRole);
                }
            } else {
                return;
            }
        });
    }
}