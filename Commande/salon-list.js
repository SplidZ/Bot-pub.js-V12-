const Discord = require('discord.js');
const path = require('path');

module.exports = {
    name: 'salon-list',
    run: async (message, args, client) => {
    if(!args[0]){
        let texte = '__Voici la liste des salons publicitaire du serveur.__\n';
        const channels = require(path.resolve(path.join('./database/main.json')));
        for(channel in channels[message.guild.id]){
            texte = texte + `\n> <#${channel}>, **ID**: ${channel}`;
        }
        message.channel.send(
            new Discord.MessageEmbed()
                .setTitle('📃・Salons de publicité')
                .setColor('GREEN')
                .setDescription(texte + '\n\nPour en ajouter, faites ``=salon-add`` et pour en enlever, ``=salon-remove``.')
                .setFooter(`${client.user.username}`)
        )
        
    }
    
}}
