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
                .setColor('#2f3136')
                .setDescription('Hey ! Bienvenue dans le menu d\'ajout d\'un salon publicitaire. Pour ajouté le salon souhaité, envoyer ci-dessous la mention du salon voulu.\n\n*`Si vous souhaitez quittez, écrivez cancel à la place.`*')
                .setFooter('๖̶ζ͜͡AD MEGHOST#5492/Shoguntoto (ショグントト)#1376')
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
            .setColor('#2f3136')
            .setDescription("Vous n'avez pas entrer de salon. Annulation...")
            .setTimestamp()
        );
        return;
    });
    channel = channel.replace('<', '').replace('#', '').replace('>', '');
    if(channel === 'cancel'){
        return message.channel.send('Annulation...');
    }
    if(error) return;
    let salon = message.guild.channels.cache.find(c => c.id === channel);
    if(!salon){
        return addPubChannelMessageEmbed.edit(
            new Discord.MessageEmbed()
                .setTitle(':x:・Erreur...')
                .setColor('#2f3136')
                .setDescription('Oops, on dirait que ce salon est introuvable. Assurez vous que je puisse voir le salon, ainsi que je puisse écrire dedans.')
                .setTimestamp()
        )
    }

    addpubchannel(message.guild.id, salon.id);
    addPubChannelMessageEmbed.edit(
        new Discord.MessageEmbed()
            .setTitle(':white_check_mark:・Succès')
            .setColor('#2f3136')
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
                slowmode: '',
                color: '#2f3136',
                bypassRole: 'Aucun',
                lastMessageID: 'Aucun'
            }
            server[serverID][channelID].messageEmbed = {
                description: `**__:mag_right: | Pour éviter que ta publicité ne soit refusée :__**\n*➜ Votre publicité doit avoir une description minimum !\n➜ Merci de respecter les TOS et le règlement !*`,
                footer: '๖̶ζ͜͡AD MEGHOST#5492/Shoguntoto (ショグントト)#1376'
            }
        }
        fs.writeFile(path.resolve(path.join('./database/main.json')), JSON.stringify(server, null, 2), (err) => {
            if(err) console.log(err)
        });
    
    }
}}
