const Discord = require('discord.js')

module.exports = {
    name: 'support',
    run: async (message, args, client) => {

        let help = new Discord.MessageEmbed()
        .setColor(`GREEN`)
        .setTitle(`Support de ${client.user.username}`)
        .setDescription(`**Voici le lien du support de ${client.user.username}**\n➜ [Cliquez ici]()`)

    return message.channel.send(help)
    }}
