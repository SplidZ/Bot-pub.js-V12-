const { MessageEmbed } = require("discord.js")
const db = require("quick.db")

module.exports = {
    name: "warn",
    run: async (message, args, client) => {
    if(!message.member.hasPermission("BAN_MEMBERS")) {
      return message.channel.send("vous n'avez pas les permissions requises !")
    }
    
    const user = message.mentions.members.first()
    
    if(!user) {
      return message.channel.send("Mentionner le membre a warn")
    }
    
    if(message.mentions.users.first().bot) {
      return message.channel.send("Vous pouvez pas warn un bot u_u")
    }
    
    if(message.author.id === user.id) {
      return message.channel.send("Tu ne peux pas te warn -_-")
    }
    
    if(user.id === message.guild.owner.id) {
      return message.channel.send("Tu ne peux pas warn le fondateur, bien tenté ! o-o")
    }

    const reason = args.slice(1).join(" ")
    
    if(!reason) {
      return message.channel.send("Donner une raison")
    }
    
    let warnings = db.get(`warnings_${message.guild.id}_${user.id}`)
    
    if(warnings === 3) {
      return message.channel.send(`${message.mentions.users.first().username} a obtenu 3 warn`)
    }
    
    if(warnings === null) {
      db.set(`warnings_${message.guild.id}_${user.id}`, 1)
      user.send(`Vous avez été warn sur **${message.guild.name}** car ${reason}`)
      await message.channel.send(`Tu as bien warn **${message.mentions.users.first().username}** car ${reason}`)
    } else if(warnings !== null) {
        db.add(`warnings_${message.guild.id}_${user.id}`, 1)
       user.send(`Vous avez été warn  sur **${message.guild.name}** car ${reason}`)
      await message.channel.send(`Membre warn **${message.mentions.users.first().username}** car ${reason}`)
    }
    
  
  } 
}
