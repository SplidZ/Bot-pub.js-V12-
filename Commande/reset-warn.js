const db = require("quick.db")
module.exports = {
    name: 'reset-warn',
    run: async (message, args, client) => {
    
    if(!message.member.hasPermission("ADMINISTRATOR")) {
      return message.channel.send("Vous n'avez pas les permissions requises !")
    }
    
    const user = message.mentions.members.first()
    
     if(!user) {
    return message.channel.send("Mentionner le membre qui doit ne plus avoir de warn")
    }
    
    if(message.mentions.users.first().bot) {
      return message.channel.send("Un bot n'a pas de warn")
    }
    
    if(message.author.id === user.id) {
      return message.channel.send("Tu peux pas reset tes warn seul petit malin u-u")
    }
    
 
    
    let warnings = db.get(`warnings_${message.guild.id}_${user.id}`)
    
    if(warnings === null) {
      return message.channel.send(`${message.mentions.users.first().username} n'a pas de warn`)
    }
    
    db.delete(`warnings_${message.guild.id}_${user.id}`)
    user.send(`Tous tes warn sur le serveur ${message.guild.name} ont été reset !`)
    await message.channel.send(`Les warn de ${message.mentions.users.first().username}ont bien été reset !`)
    
  
    
}
}
