const discord = require("discord.js");

module.exports = {
    name: 'ban',
    run: async (message, args, client) => {
        if (!message.member.hasPermission('BAN_MEMBERS')) return;
        let utilisateur = message.mentions.members.first() || message.guild.member(args[0])
        temps = args[1];
        raison = args.splice(0, 1).join(" ");
        if (!utilisateur) return message.channel.send('Vous devez mentionner un utilisateur !');
        message.guild.members.ban(utilisateur.id);
        let embed = new discord.MessageEmbed()
    .setTitle("Ban !")
    .setDescription(`Membre banni : ${utilisateur} (${utilisateur.id})`)
    .setColor("#ff2050")
    .setFooter(`Banni par ${message.author.username} commande crée par : Shoguntoto (ショグントト)#1376 & ๖̶ζ͜͡AD MEGHOST#5492`);
   
    message.channel.send(embed)
    }};
