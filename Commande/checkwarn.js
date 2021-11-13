const db = require("quick.db")
const discord = require('discord.js')
module.exports = {
    name: "checkwarn",
    run: async (message, args, client) => {

    const user = message.mentions.members.first() || message.author
    
  
    let warnings = db.get(`warnings_${message.guild.id}_${user.id}`)
    
    
    if(warnings === null) warnings = 0;
    
    
    message.channel.send(`${user} as **${warnings}** avertisement(s)`)
  
  
  }
}
