const { MessageEmbed } = require('discord.js')

module.exports = {
    name: "bot-info",
    run: async (message, args, client) => {
  
        message.delete()
        const embed = new MessageEmbed()
            .setThumbnail(client.user.displayAvatarURL())
            .setTitle(`Info de ${client.user.username}`)
            .setColor('8B008B')
            .addFields(
                {
                    name: ':crown: Créateur :',
                    value: ` Shoguntoto (ショグントト)#1376 & ๖̶ζ͜͡AD MEGHOST#5492`,
                    inline: false
                },
                {
                    name: ':game_die: Serveurs :',
                    value: `Regarde ${client.guilds.cache.size} servers.`,
                    inline: false
                },
                {
                    name: ':scroll: Channels :',
                    value: `Regarde ${client.channels.cache.size} channels.`,
                    inline: false
                },
                {
                    name: ':people_hugging: Total utilisateur :',
                    value: `Regarde ${client.guilds.cache.reduce((acc, guild) => acc + guild.memberCount, 0)} utilisateurs.`,
                    inline: false
                },
                {
                    name: '⏳ Ping :',
                    value: `${Math.round(client.ws.ping)}ms`,
                    inline: false
                },
                {
                    name: '😇 Création :',
                    value: client.user.createdAt.toLocaleDateString("FR-fr"),
                    inline: false
                }
            )
            .setTimestamp()
        await message.channel.send(embed)
    }
}
