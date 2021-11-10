const Discord = require('discord.js')

module.exports = {
    name: 'help',
    run: async (message, args, client) => {

        let help = new Discord.MessageEmbed()
        .setColor(`GREEN`)
        .setTitle(`Help de ${client.user.username}`)
        .setDescription('**👋 Salut** ' + `${message.author},` + '\n**❗ Mon prefix est `=`**\n\n**:gear: ➜ Configuration**\n`verif-channel` : Ajouté le salon de vérification\n`salon-add` : Ajouté un salon publicitaire.\n`salon-remove` : Retiré un salon publicitaire.\n`salon-list` : Voir les salon publicitaire.\n\n**:robot: ➜ Bot**\n`bot-info` : Affiche les info du bot.\n`invitation` : Envoie le lien d\'invitation du bot.\n`support` : Envoie le serveur support du bot.\n`ping` : Affiche les ping du bot.\n\n[Invitation](https://discord.com/api/oauth2/authorize?client_id=848139058450137139&permissions=8&scope=bot) | [Support](https://discord.gg/DU75nykhBG)')

    return message.channel.send(help)
    }}