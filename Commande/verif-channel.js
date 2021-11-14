const Discord = require('discord.js');
const path = require('path');
const fs = require('fs');

module.exports = {
    name: 'verif-channel',
    run: async (message, args, client) => {
        
        if(!message.member?.hasPermission("ADMINISTRATOR")) return message.channel.send(`Vous n'avez pas la permission pour ajouter le salon de verification publicitaire`)

    let removePubChannelMessageEmbed = await message.channel.send(
        new Discord.MessageEmbed()
            .setTitle(':hourglass: Ajout d\'un salon')
            .setColor('GREEN')
            .setDescription('Hey ! Bienvenue dans le menu de setup du salon de vérification des publicité. Envoyer ci-dessous la mention du salon voulu.\n\n*`Si vous souhaitez quittez, écrivez cancel à la place.`*')
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
                .setDescription('Oops, on dirait que ce salon est introuvable. Assurez vous que je puisse voir le salon, ainsi que je puisse écrire dedans.')
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
            .setDescription('Le salon de vérification des publicité est désormais <#' + salon.id + '>')
            .setFooter(`${client.user.username}`)
    )
     salon.send({embed : {color : "GREEN", title: `Salon de verification publicitaire`, description:`**__Voici les options de verification publicitaire :__**\n\n> :white_check_mark:・Validé la publicité.\n> :x:・Refusé la publicité.\n> :wastebasket:・Supprimé la publicité sans warn.\n\n**__Liste des refus :__**\n\n> :one:・Contenue à caractère pornographique.\n> :two:・Publicité pour un serveur invite reward.\n> :three:・Contenue à caractère raciste, haineux ou autre.\n> :four:・Lien d'invitation invalide.\n> :five:・Pub dans le mauvais salon.\n> :six:・Publicité sans description.\n> :pencil2:・Mettre sa propre raison.`}})
    
    // Fonctions

    async function setverifchannel(serverID, channelID) {
        let server = require(path.resolve(path.join('./database/verifchannel.json')));
        if(!server[serverID]){
            server[serverID] = {
                verifChannel: channelID
            }
        }else {
            server[serverID] = {
                verifChannel: channelID
            }
        }
        fs.writeFile(path.resolve(path.join('./database/verifchannel.json')), JSON.stringify(server, null, 2), (err) => {
            if(err) console.log(err)
        });
    
    }
}}
