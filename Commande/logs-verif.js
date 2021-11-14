const Discord = require('discord.js');
const path = require('path');
const fs = require('fs');

module.exports = {
    name: 'logs-channel',
    run: async (message, args, client) => {
        
        if(!message.member?.hasPermission("ADMINISTRATOR")) return message.channel.send(`Vous n'avez pas la permission pour ajouter le salon de verification publicitaire`)

    let removePubChannelMessageEmbed = await message.channel.send(
        new Discord.MessageEmbed()
            .setTitle(':hourglass: Ajout d\'un salon')
            .setColor('GREEN')
            .setDescription('Bienvenue dans le menu d\'ajout d\'un salon de logs publicitaire.\n\n*`Si vous souhaitez quittez, écrivez cancel à la place.`*')
            .setFooter(`${client.user.username}`)
    )

    let error = false;
    let channel;
    await message.channel.awaitMessages(m => m.author.id === message.author.id, {
        max: 1,
        time: 30000,
        errors: ["time"]
    }).then(collected => {
        channel = collected.first().content;
        collected.first().delete();
    }).catch((err) => {
        error = true;
        removePubChannelMessageEmbed.edit(
            new Discord.MessageEmbed()
            .setTitle(':x:・Erreur...')
            .setColor('GREEN')
            .setDescription("Vous n'avez pas entrer de salon.")
            .setFooter(`${client.user.username}`)
        );
        return;
    });
    channel = channel.replace('<', '').replace('#', '').replace('>', '');
    if(channel === 'cancel'){
        return message.channel.send('Annulation ⌛').then((message)=>{message.delete({timeout:20})}).then(message.channel.send(`Annulation avec succès :white_check_mark:`))
    }
    if(error) return;
    let salon = message.guild.channels.cache.find(c => c.id === channel);
    if(!salon){
        return removePubChannelMessageEmbed.edit(
            new Discord.MessageEmbed()
                .setTitle(':x:・Erreur...')
                .setColor('GREEN')
                .setDescription('Ce salon est introuvable.')
                .setFooter(`${client.user.username}`)
        )
    }

    let server = require(path.resolve(path.join('./database/main.json')));
    if(!server[message.guild.id]){
        server[message.guild.id] = {

        }
    }
    let ch = server[message.guild.id][salon.id];

    if(ch){
        return removePubChannelMessageEmbed.edit(
            new Discord.MessageEmbed()
                .setTitle(':x:・Erreur...')
                .setColor('GREEN')
                .setDescription('Ce salon ne peut pas être un salon publicitaire et un salon de pub en même temps.')
                .setFooter(`${client.user.username}`)
        )
    }

    setverifchannel(message.guild.id, salon.id);
    removePubChannelMessageEmbed.edit(
        new Discord.MessageEmbed()
            .setTitle('✅・Succès')
            .setColor('GREEN')
            .setDescription('Le salon de logs des vérification de publicité est désormais <#' + salon.id + '>')
            .setFooter(`${client.user.username}`)
    )
    
    // Fonctions

    async function setverifchannel(serverID, channelID) {
        let server = require(path.resolve(path.join('./database/logs.json')));
        if(!server[serverID]){
            server[serverID] = {
                logsChannel: channelID
            }
        }else {
            server[serverID] = {
                logsChannel: channelID
            }
        }
        fs.writeFile(path.resolve(path.join('./database/logs.json')), JSON.stringify(server, null, 2), (err) => {
            if(err) console.log(err)
        });
    
    }
}}
