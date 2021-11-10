const Discord = require('discord.js')

module.exports = {
    name: 'invitation',
    run: async (message, args, client) => {

        let help = new Discord.MessageEmbed()
        .setColor(`GREEN`)
        .setTitle(`Lien d'invitation de ${client.user.username}`)
        .setDescription(`**Voici le lien d'invitation de ${client.user.username}**\n➜ [Cliquez ici](https://discord.com/api/oauth2/authorize?client_id=848139058450137139&permissions=8&scope=bot)`)

    return message.channel.send(help)
    }}