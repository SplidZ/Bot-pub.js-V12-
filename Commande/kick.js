const { MessageEmbed} = require("discord.js")
   
  module.exports.run = async (client, message, args) => {
    const embed = new MessageEmbed()
      .setColor("2f3136")
      .setTitle(":x: Erreur")
   
      let member = message.mentions.members.first() || message.guild.members.cache.get(args[0]);
      var reason = args.slice(1).join(" ");
      if(!message.guild.me.hasPermission("KICK_MEMBERS")){
        embed.setDescription("Je dois avoir les permissions `KICK_MEMBERS` pour faire cette commande")
        embed.setTimestamp();
        return message.channel.send(embed);
      } else {
  if(!member){
      embed.setDescription("Merci de mentionner le membre à expulser")
      embed.setTimestamp();
      return message.channel.send(embed);
  } else {
    if (message.member.roles.highest.comparePositionTo(member.roles.highest) < 0){
      embed.setDescription("Vous ne pouvez expulser que les membres plus haut que vous")
      embed.setTimestamp();
      return message.channel.send(embed);
    } else {
      if(message.author.id === member.id){
        embed.setDescription("Vous ne pouvez pas vous expulser")
        embed.setTimestamp();
        return message.channel.send(embed);
      } else {
        if(member.id === message.guild.ownerID || member.id === client.user.id){
          embed.setDescription("Vous ne pouvez expulser l'owner ou m'expulser")
          embed.setTimestamp();
          return message.channel.send(embed);
        } else {
            if(!member.bannable){
              embed.setDescription("Vous ne pouvez pas expulser ce membre")
              embed.setTimestamp();
              return message.channel.send(embed);
            } else {
                if(!reason){
                    reason = "Aucun raison spécifiée";
                } else {
                    reason = reason;
                }
   
                await message.guild.members.kick(member.id, {
                    reason: reason
                }).catch(async (error) => {
                  await embed.setDescription(`Il y a eu une erreur : ${error}`)
                  await embed.setTimestamp();
                  return message.channel.send(embed);
                })
                await embed.setDescription(`${member} à bien été expulser \n Raison : ${reason}`)
                await embed.setTitle("Succès")
                await embed.setTimestamp();
                await message.channel.send(embed);
            }
          }
        }
      }
    }
  }
  member.createDM().then(channel => {
     embed.setTitle(`Vous avez été expulser de ${message.guild.name}`)
     embed.setDescription(`Raison : ${reason} \n Par : <@${message.author.id}>`)
     embed.setTimestamp();
     channel.send(embed);
  }).catch(error => console.log(error));
  }
  module.exports.help = {
    name: "kick", 
    description: "Permet d'expulser un membre", 
    args: true, 
    cooldown: 5,
    category: "🛠️ modération",
    permissions: ["KICK_MEMBERS"],
    usage: "@user <reason>",
    aliases: ['kick']
  }