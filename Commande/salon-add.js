const Discord = require('discord.js');
const path = require('path');
const fs = require('fs');

module.exports = {
    name: 'salon-add',
    run: async (message, args, client) => {

        if(!message.member?.hasPermission("ADMINISTRATOR")) return

        let addPubChannelMessageEmbed = await message.channel.send(
            new Discord.MessageEmbed()
                .setTitle(':hourglass:・Ajout d\'un salon')
                .setColor('GREEN')
                .setDescription('Bienvenue dans le menu d\'ajout d\'un salon publicitaire.\n\n*`Si vous souhaitez quittez, écrivez cancel à la place.`*')
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
        addPubChannelMessageEmbed.edit(
            new Discord.MessageEmbed()
            .setTitle(':x:・Erreur...')
            .setColor('GREEN')
            .setDescription("Vous n'avez pas entrer de salon.")
            .setTimestamp()
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
        return addPubChannelMessageEmbed.edit(
            new Discord.MessageEmbed()
                .setTitle(':x:・Erreur...')
                .setColor('GREEN')
                .setDescription('Ce salon est introuvable.')
                .setTimestamp()
        )
    }

    addpubchannel(message.guild.id, salon.id);
    addPubChannelMessageEmbed.edit(
        new Discord.MessageEmbed()
            .setTitle(':white_check_mark:・Succès')
            .setColor('GREEN')
            .setDescription('Le salon <#' + salon.id + '> à correctement été ajouté !')
            .setTimestamp()
    )

    // Fonctions

    async function addpubchannel(serverID, channelID) {
        let server = require(path.resolve(path.join('./database/main.json')));
        if(!server[serverID]){
            server[serverID] = {
                
            }
        }
        fs.writeFile(path.resolve(path.join('./database/main.json')), JSON.stringify(server, null, 2), (err) => {
            if(err) console.log(err)
        });
    
        server = require(path.resolve(path.join('./database/main.json')));
        let channel = server[serverID][channelID];
    
        if(!channel){
            server[serverID][channelID] = {
                lastMessageID: 'Aucun'
            }
        }
        fs.writeFile(path.resolve(path.join('./database/main.json')), JSON.stringify(server, null, 2), (err) => {
            if(err) console.log(err)
        });
    
    }
}}
