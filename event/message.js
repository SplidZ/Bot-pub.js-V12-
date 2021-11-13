const { prefix } = require('../config.json');

module.exports = {
        name: 'message',
        async execute(client, message, ) {
            
            if (message.author.bot) return
            if (message.channel.type == "dm") return;

            const args = message.content.slice(prefix.length).trim().split(' ')
            const commandName = args.shift().toLowerCase();
            const command = client.commands.get(commandName)

            if (!message.content.startsWith(prefix) || message.author.bot) return;
            if (!command) return
    
            
            try {
                command.run(message, args, client)
                
                } catch (error) {
                     message.channel.send('**:x: Je suis désoler mais il y à eu une erreur durant l\'execution du code By ๖̶ζ͜͡AD MEGHOST et Shoguntoto (ショグントト)**')
                };
            }
        }
