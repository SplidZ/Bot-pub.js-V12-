const Discord = require('discord.js')

module.exports = {
    name: 'help',
    run: async (message, args, client) => {

        let help = new Discord.MessageEmbed()
        .setColor(`GREEN`)
        .setTitle(`Help de ${client.user.username}`)
        .setDescription('**👋 Salut** ' + `${message.author},` + '\n**❗ Mon prefix est `q!`**\n\n**:gear: ➜ Configuration**\n`verif-channel` : Ajouté le salon de vérification\n`salon-add` : Ajouté un salon publicitaire.\n`salon-remove` : Retiré un salon publicitaire.\n`salon-list` : Voir les salon publicitaire.\n\n**🚨 ➜ Modération**\n`ban` : Bannir un membre.\n`kick` : Expulser un membre.\n`warn` : Avertir un membre.\n`checkwarn` : Voir le nombre de warn d\'un utilisateur.\n`reset-warn` : Enlever les warn d\'un utilisateur.\n\n**:robot: ➜ Bot**\n`bot-info` : Affiche les info du bot.\n`invitation` : Envoie le lien d\'invitation du bot.\n`support` : Envoie le serveur support du bot.\n`ping` : Affiche les ping du bot.\n\n[Invitation](https://discord.com/api/oauth2/authorize?client_id=906455442698407956&permissions=536870911991&scope=bot) | [Support](https://discord.gg/Xjf5mE4PPn)')
.setFooter('By Shoguntoto (ショグントト)#1376 & ๖̶ζ͜͡AD MEGHOST')
    return message.channel.send(help)
    }}
