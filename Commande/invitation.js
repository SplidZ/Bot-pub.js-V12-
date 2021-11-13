const Discord = require('discord.js')

module.exports = {
    name: 'invitation',
    run: async (message, args, client) => {

        let help = new Discord.MessageEmbed()
        .setColor(`GREEN`)
        .setTitle(`Lien d'invitation de ${client.user.username}`)
        .setDescription(`**Voici le lien d'invitation de ${client.user.username}**\n➜ [Cliquez ici](https://discord.com/api/oauth2/authorize?client_id=906455442698407956&permissions=536870911991&scope=bot)`)

    return message.channel.send(help)
    }}
