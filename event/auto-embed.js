const path = require('path');

module.exports = {
    name: 'message',
    async execute(client, message, ) {
        
        if (message.author.bot) return
        if (message.channel.type == "dm") return;

        const config = require(path.resolve(path.join('./database/main.json')));
        if(config[message.guild.id]){
            if(config[message.guild.id][message.channel.id]){

        message.channel.messages.fetch().then(async m => {
            let msg = m.filter(e => e.author.id === client.user.id).first();
            if (msg) await msg.delete().catch(e => { return; });
            return message.channel.send({ embed: { color: `GREEN`, title: message.guild.name, image: { url: '' }, description: "**__:mag_right: | Pour éviter que ta publicité ne soit refusée :__**\n*➜ Votre publicité doit avoir une description minimum !\n➜ Merci de respecter les TOS et le règlement !*" }})
        })
        
    }
    
}}};
