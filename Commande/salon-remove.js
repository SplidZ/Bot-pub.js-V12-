const Discord = require('discord.js');
const path = require('path');
const fs = require('fs');

module.exports = {
    name: 'salon-remove',
    run: async (message, args, client) => {

        if(!message.member?.hasPermission("ADMINISTRATOR")) return

    let removePubChannelMessageEmbed = await message.channel.send(
        new Discord.MessageEmbed()
            .setTitle(':hourglass:・Ajout d\'un salon')
            .setColor('GREEN')
            .setDescription('Bienvenue dans le menu de suppression d\'un salon publicitaire.\n\n*`Si vous souhaitez quittez, écrivez cancel à la place.`*')
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
    let ch = server[message.guild.id][salon.id];

    if(!ch){
        return removePubChannelMessageEmbed.edit(
            new Discord.MessageEmbed()
                .setTitle(':x:・Erreur...')
                .setColor('GREEN')
                .setDescription('Ce salon n\'est pas défini en tant que salon publicitaire.')
                .setFooter(`${client.user.username}`)
        )
    }

    removepubchannel(message.guild.id, salon.id);
    removePubChannelMessageEmbed.edit(
        new Discord.MessageEmbed()
            .setTitle('✅・Succès')
            .setColor('GREEN')
            .setDescription('Le salon <#' + salon.id + '> à correctement été supprimé !')
            .setFooter(`${client.user.username}`)
    )

    // Fonctions

    async function removepubchannel(serverID, channelID) {
        let server = require(path.resolve(path.join('./database/main.json')));
        delete server[serverID][channelID];
        fs.writeFile(path.resolve(path.join('./database/main.json')), JSON.stringify(server, null, 2), (err) => {
            if(err) console.log(err)
        });
    
    }
}}
