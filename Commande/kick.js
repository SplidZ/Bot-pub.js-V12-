const discord = require("discord.js");

module.exports = {
    name: 'kick',
    run: async (message, args, client) => {
    if(!message.member.hasPermission("KICK_MEMBERS")) {
      return message.channel.send(`**${message.author.username}**, Tu as pas les permissions requises :/`)
    }
    
    if(!message.guild.me.hasPermission("KICK_MEMBERS")) {
      return message.channel.send(`**${message.author.username}**, Tu as pas les permissions requises :/`)
    }
        let target = message.mentions.members.first();
    
    if(!target) {
      return message.channel.send(`**${message.author.username}**, Mentionne le membre a kick !`)
    }
           if(target.id === message.author.id) {
     return message.channel.send(`**${message.author.username}**, Tu ne peut pas te kick :/`)
    }
         if(!args[1]) {
    return message.channel.send(`**${message.author.username}**, Pourquoi devrais-je le kick ?`)
  }
         let embed = new discord.MessageEmbed()
    .setTitle("Kick !")
    .setDescription(`Membre kick : ${target} (${target.id})`)
    .setColor("#ff2050")
    .setFooter(`kick par ${message.author.username} commande par : Shoguntoto (ショグントト)#1376 & ๖̶ζ͜͡AD MEGHOST#5492`);
    
    message.channel.send(embed)
    
    target.kick(args[1])}};
