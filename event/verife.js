const Discord = require('discord.js');
const path = require('path');
const fs = require('fs');
const moment = require('moment');
const ms = require('ms')

module.exports = {
    name: 'message',
    async execute(client, message, args) {

    if (message.channel.type === 'dm') return;
    if(message.author.bot) { return; }
    if (!message.channel.permissionsFor(client.user).has('SEND_MESSAGES')) { return; }
    
        const config = require(path.resolve(path.join('./database/main.json')));
        if(config[message.guild.id]){
            if(config[message.guild.id][message.channel.id]){
                let messages = require(path.resolve(path.join('./database/messages.json')));
                if(!messages[message.channel.id]){
                    messages[message.channel.id] = {   
                    }
                }
                
                if(!messages[message.channel.id][message.author.id]){
                    messages[message.channel.id][message.author.id] = {
                        lastMessageDate: new Date()
                    }
                    fs.writeFile(path.resolve(path.join('./database/messages.json')), JSON.stringify(messages, null, 2), (err) => {
                        if(err) console.log(err)
                    });
                    
                    let guild = client.guilds.cache.get('792838064639705138');

                    let verifchannel = require(path.resolve(path.join('./database/verifchannel.json')));
                    if(!verifchannel[message.guild.id]) return;
                    let channel = client.channels.cache.find(c => c.id === verifchannel[message.guild.id].verifChannel);
                
                    let messagemsg = await  channel.send({embed : {color : "GREEN", title: `Publicité en attente`, description:`───────────────────────────\n**Contenu de la publicité : :arrow_heading_down:**\n───────────────────────────\n\n${message}\n\n───────────────────────────\n**Informations Publicitaires :**\nUtilisateur : ${message.author} | \`${message.author.tag}\`\nID : \`${message.author.id}\`\nSalon : <#${message.channel.id}>\n───────────────────────────\n[Lien du message](https://discord.com/channels/${message.guild.id}/${message.channel.id}/${message.id})`}})
                    messagemsg.react('✅');
                    messagemsg.react('❌');
                    messagemsg.react('🗑️');

                    const filtre = (reaction, user) => {
                        return ['✅', '❌', '🗑️'].includes(reaction.emoji.name) && user.id != client.user.id;
                    };

                    messagemsg.awaitReactions(filtre, { max: 1, time: 21600000, errors: ['time'] }).then(collected => {
                        let reaction = collected.first();
                        if (reaction.emoji.name === '✅') {
                            messagemsg.delete();

                            let logschannel = require(path.resolve(path.join('./database/logs.json')));
                            if(!logschannel[message.guild.id]) return;
                            let channel = client.channels.cache.find(c => c.id === logschannel[message.guild.id].logsChannel);
                        
                            let logs = channel.send({embed : {color : "GREEN", title: `Publicité valider`, description:`───────────────────────────\n**Informations Publicitaires :**\nUtilisateur : ${message.author} | \`${message.author.tag}\`\nID : \`${message.author.id}\`\nSalon : <#${message.channel.id}>\n\n[Lien du message](https://discord.com/channels/${message.guild.id}/${message.channel.id}/${message.id})\n───────────────────────────\n**Contenu de la publicité : :arrow_heading_down:**\n───────────────────────────\n\n${message}\n\n───────────────────────────`}})
                            return;
                        }
                        if (reaction.emoji.name === '🗑️') {
                            message.delete();
                            messagemsg.delete();

                            return;
                        } else if(reaction.emoji.name === '❌'){
                            messagemsg.reactions.removeAll().catch(error => console.error('Failed to clear reactions: ', error));
                            messagemsg.react('1️⃣');
                            messagemsg.react('2️⃣');
                            messagemsg.react('3️⃣');
                            messagemsg.react('4️⃣');
                            messagemsg.react('5️⃣');
                            messagemsg.react('6️⃣');
                            messagemsg.react('✏️');
                            const filter = (reaction, user) => {
                                return ['1️⃣', '2️⃣', '3️⃣', '4️⃣', '5️⃣', '6️⃣', '✏️'].includes(reaction.emoji.name) && user.id != client.user.id;
                            };
                            messagemsg.awaitReactions(filter, { max: 1, time: 21600000, errors: ['time'] }).then(async (collected) => {
                                reaction = collected.first();
                                message.delete();
                                messagemsg.delete();
                                if (reaction.emoji.name === '1️⃣') {
                                    message.author.send('Vôtre publicité a été refusée. Raison: ``Contenue à caractère pornographique.``')

                                    let logschannel = require(path.resolve(path.join('./database/logs.json')));
                                    if(!logschannel[message.guild.id]) return;
                                    let channel = client.channels.cache.find(c => c.id === logschannel[message.guild.id].logsChannel);
                                
                                    let logs = channel.send({embed : {color : "RED", title: `Publicité refusé`, description:`───────────────────────────\n**Informations Publicitaires :**\nUtilisateur : ${message.author} | \`${message.author.tag}\`\nID : \`${message.author.id}\`\nSalon : <#${message.channel.id}>\nRaison : Contenue à caractère pornographique.\n\n───────────────────────────\n**Contenu de la publicité : :arrow_heading_down:**\n───────────────────────────\n\n${message}\n\n───────────────────────────`}})
                                } else if(reaction.emoji.name === '2️⃣'){
                                    message.author.send('Vôtre publicité a été refusée. Raison: ``Publicité pour un serveur invite reward.``')

                                    let logschannel = require(path.resolve(path.join('./database/logs.json')));
                                    if(!logschannel[message.guild.id]) return;
                                    let channel = client.channels.cache.find(c => c.id === logschannel[message.guild.id].logsChannel);
                                
                                    let logs = channel.send({embed : {color : "RED", title: `Publicité refusé`, description:`───────────────────────────\n**Informations Publicitaires :**\nUtilisateur : ${message.author} | \`${message.author.tag}\`\nID : \`${message.author.id}\`\nSalon : <#${message.channel.id}>\nRaison : Publicité pour un serveur invite reward.\n\n───────────────────────────\n**Contenu de la publicité : :arrow_heading_down:**\n───────────────────────────\n\n${message}\n\n───────────────────────────`}})
                                } else if(reaction.emoji.name === '3️⃣') {
                                    message.author.send('Vôtre publicité a été refusée. Raison: ``Contenue à caractère raciste, haineux ou autre.``')

                                    let logschannel = require(path.resolve(path.join('./database/logs.json')));
                                    if(!logschannel[message.guild.id]) return;
                                    let channel = client.channels.cache.find(c => c.id === logschannel[message.guild.id].logsChannel);
                                
                                    let logs = channel.send({embed : {color : "RED", title: `Publicité refusé`, description:`───────────────────────────\n**Informations Publicitaires :**\nUtilisateur : ${message.author} | \`${message.author.tag}\`\nID : \`${message.author.id}\`\nSalon : <#${message.channel.id}>\nRaison : Contenue à caractère raciste, haineux ou autre.\n\n───────────────────────────\n**Contenu de la publicité : :arrow_heading_down:**\n───────────────────────────\n\n${message}\n\n───────────────────────────`}})
                                } else if(reaction.emoji.name === '4️⃣'){
                                    message.author.send('Vôtre publicité a été refusée. Raison: ``Lien d\'invitation invalide.``')

                                    let logschannel = require(path.resolve(path.join('./database/logs.json')));
                                    if(!logschannel[message.guild.id]) return;
                                    let channel = client.channels.cache.find(c => c.id === logschannel[message.guild.id].logsChannel);
                                
                                    let logs = channel.send({embed : {color : "RED", title: `Publicité refusé`, description:`───────────────────────────\n**Informations Publicitaires :**\nUtilisateur : ${message.author} | \`${message.author.tag}\`\nID : \`${message.author.id}\`\nSalon : <#${message.channel.id}>\nRaison : Lien d\'invitation invalide.\n\n───────────────────────────\n**Contenu de la publicité : :arrow_heading_down:**\n───────────────────────────\n\n${message}\n\n───────────────────────────`}})
                                } else if(reaction.emoji.name === '5️⃣'){
                                    message.author.send('Vôtre publicité à été refusée. Raison: ``Pub dans le mauvais salon.``')

                                    let logschannel = require(path.resolve(path.join('./database/logs.json')));
                                    if(!logschannel[message.guild.id]) return;
                                    let channel = client.channels.cache.find(c => c.id === logschannel[message.guild.id].logsChannel);
                                
                                    let logs = channel.send({embed : {color : "RED", title: `Publicité refusé`, description:`───────────────────────────\n**Informations Publicitaires :**\nUtilisateur : ${message.author} | \`${message.author.tag}\`\nID : \`${message.author.id}\`\nSalon : <#${message.channel.id}>\nRaison : Pub dans le mauvais salon.\n\n───────────────────────────\n**Contenu de la publicité : :arrow_heading_down:**\n───────────────────────────\n\n${message}\n\n───────────────────────────`}})
                                } else if(reaction.emoji.name === '6️⃣'){
                                    message.author.send('Vôtre publicité à été refusée. Raison: ``Publicité sans description.``')

                                    let logschannel = require(path.resolve(path.join('./database/logs.json')));
                                    if(!logschannel[message.guild.id]) return;
                                    let channel = client.channels.cache.find(c => c.id === logschannel[message.guild.id].logsChannel);
                                
                                    let logs = channel.send({embed : {color : "RED", title: `Publicité refusé`, description:`───────────────────────────\n**Informations Publicitaires :**\nUtilisateur : ${message.author} | \`${message.author.tag}\`\nID : \`${message.author.id}\`\nSalon : <#${message.channel.id}>\nRaison : Publicité sans description.\n\n───────────────────────────\n**Contenu de la publicité : :arrow_heading_down:**\n───────────────────────────\n\n${message}\n\n───────────────────────────`}})
                                } else if(reaction.emoji.name === '✏️'){
                                    let user = reaction.users.cache.last();
                                    await user.send(
                                      new Discord.MessageEmbed()
                                        .setTitle(`WARN`)
                                        .setColor('RED')
                                        .setDescription("Vous avez choisis de mettre vôtre propre raison de suppressions. Veuillez l'entrer ci-dessous.")
                                    )
                                    let channel = user.dmChannel;
                                    if (!channel) channel = await user.createDM();
                                    let filterCustomReason = (msgReason) => msgReason.author.id === user.id;
                                    channel.awaitMessages(filterCustomReason, { max: 1, time: 10000, errors: ['time'] }).then((collected => {
                                      message.author.send(`Vôtre publicité à été refusée. Raison: \`${collected.first().content}\``)
                                      user.send(`La publicité de **${message.author.tag}** a bien été supprimée.`)

                                      let logschannel = require(path.resolve(path.join('./database/logs.json')));
                                      if(!logschannel[message.guild.id]) return;
                                      let channel = client.channels.cache.find(c => c.id === logschannel[message.guild.id].logsChannel);
                                  
                                      let logs = channel.send({embed : {color : "RED", title: `Publicité refusé`, description:`───────────────────────────\n**Informations Publicitaires :**\nUtilisateur : ${message.author} | \`${message.author.tag}\`\nID : \`${message.author.id}\`\nSalon : <#${message.channel.id}>\nRaison : ${collected.first().content}\n\n───────────────────────────\n**Contenu de la publicité : :arrow_heading_down:**\n───────────────────────────\n\n${message}\n\n───────────────────────────`}})
                                    })).catch(collected => {
                                      console.log(collected)
                                    })
                                }
                            })
                            .catch(collected => {
                                console.log(collected);
                            });
                        }
                        return;
                    })
                    .catch(collected => {
                        messagemsg.delete();
                        message.author.send('Aucun modérateur n\'est disponnible pour vérifier vôtre publicité.')
                    });
                    return;
                }
                fs.writeFile(path.resolve(path.join('./database/messages.json')), JSON.stringify(messages, null, 2), (err) => {
                    if(err) console.log(err)
                });

                messages = require(path.resolve(path.join('./database/messages.json')));

                let guild = client.guilds.cache.get('792838064639705138');

                    let verifchannel = require(path.resolve(path.join('./database/verifchannel.json')));
                    if(!verifchannel[message.guild.id]) return;
                    let channel = client.channels.cache.find(c => c.id === verifchannel[message.guild.id].verifChannel);
                
                    let messagemsg = await  channel.send({embed : {color : "GREEN", title: `Publicité en attente`, description:`───────────────────────────\n**Contenu de la publicité : :arrow_heading_down:**\n───────────────────────────\n\n${message}\n\n───────────────────────────\n**Informations Publicitaires :**\nUtilisateur : ${message.author} | \`${message.author.tag}\`\nID : \`${message.author.id}\`\nSalon : <#${message.channel.id}>\n───────────────────────────\n[Lien du message](https://discord.com/channels/${message.guild.id}/${message.channel.id}/${message.id})`}})
                    messagemsg.react('✅');
                    messagemsg.react('❌');
                    messagemsg.react('🗑️');

                    const filtre = (reaction, user) => {
                        return ['✅', '❌', '🗑️'].includes(reaction.emoji.name) && user.id != client.user.id;
                    };

                    messagemsg.awaitReactions(filtre, { max: 1, time: 21600000, errors: ['time'] }).then(collected => {
                        let reaction = collected.first();
                        if (reaction.emoji.name === '✅') {
                            messagemsg.delete();

                            let logschannel = require(path.resolve(path.join('./database/logs.json')));
                            if(!logschannel[message.guild.id]) return;
                            let channel = client.channels.cache.find(c => c.id === logschannel[message.guild.id].logsChannel);
                        
                            let logs = channel.send({embed : {color : "GREEN", title: `Publicité valider`, description:`───────────────────────────\n**Informations Publicitaires :**\nUtilisateur : ${message.author} | \`${message.author.tag}\`\nID : \`${message.author.id}\`\nSalon : <#${message.channel.id}>\n\n[Lien du message](https://discord.com/channels/${message.guild.id}/${message.channel.id}/${message.id})\n───────────────────────────\n**Contenu de la publicité : :arrow_heading_down:**\n───────────────────────────\n\n${message}\n\n───────────────────────────`}})
                            return;
                        }
                            if (reaction.emoji.name === '🗑️') {
                                message.delete();
                                messagemsg.delete();

                                return;
                        } else if(reaction.emoji.name === '❌'){
                            messagemsg.reactions.removeAll().catch(error => console.error('Failed to clear reactions: ', error));
                            messagemsg.react('1️⃣');
                            messagemsg.react('2️⃣');
                            messagemsg.react('3️⃣');
                            messagemsg.react('4️⃣');
                            messagemsg.react('5️⃣');
                            messagemsg.react('6️⃣');
                            messagemsg.react('✏️');
                            const filter = (reaction, user) => {
                                return ['1️⃣', '2️⃣', '3️⃣', '4️⃣', '5️⃣', '6️⃣', '✏️'].includes(reaction.emoji.name) && user.id != client.user.id;
                            };
                            messagemsg.awaitReactions(filter, { max: 1, time: 21600000, errors: ['time'] }).then(async (collected) => {
                                reaction = collected.first();
                                message.delete();
                                messagemsg.delete();
                                if (reaction.emoji.name === '1️⃣') {
                                    message.author.send('Vôtre publicité a été refusée. Raison: ``Contenue à caractère pornographique.``')

                                    let logschannel = require(path.resolve(path.join('./database/logs.json')));
                                    if(!logschannel[message.guild.id]) return;
                                    let channel = client.channels.cache.find(c => c.id === logschannel[message.guild.id].logsChannel);
                                
                                    let logs = channel.send({embed : {color : "RED", title: `Publicité refusé`, description:`───────────────────────────\n**Informations Publicitaires :**\nUtilisateur : ${message.author} | \`${message.author.tag}\`\nID : \`${message.author.id}\`\nSalon : <#${message.channel.id}>\nRaison : Contenue à caractère pornographique.\n\n───────────────────────────\n**Contenu de la publicité : :arrow_heading_down:**\n───────────────────────────\n\n${message}\n\n───────────────────────────`}})
                                } else if(reaction.emoji.name === '2️⃣'){
                                    message.author.send('Vôtre publicité a été refusée. Raison: ``Publicité pour un serveur invite reward.``')

                                    let logschannel = require(path.resolve(path.join('./database/logs.json')));
                                    if(!logschannel[message.guild.id]) return;
                                    let channel = client.channels.cache.find(c => c.id === logschannel[message.guild.id].logsChannel);
                                
                                    let logs = channel.send({embed : {color : "RED", title: `Publicité refusé`, description:`───────────────────────────\n**Informations Publicitaires :**\nUtilisateur : ${message.author} | \`${message.author.tag}\`\nID : \`${message.author.id}\`\nSalon : <#${message.channel.id}>\nRaison : Publicité pour un serveur invite reward.\n\n───────────────────────────\n**Contenu de la publicité : :arrow_heading_down:**\n───────────────────────────\n\n${message}\n\n───────────────────────────`}})
                                } else if(reaction.emoji.name === '3️⃣') {
                                    message.author.send('Vôtre publicité a été refusée. Raison: ``Contenue à caractère raciste, haineux ou autre.``')

                                    let logschannel = require(path.resolve(path.join('./database/logs.json')));
                                    if(!logschannel[message.guild.id]) return;
                                    let channel = client.channels.cache.find(c => c.id === logschannel[message.guild.id].logsChannel);
                                
                                    let logs = channel.send({embed : {color : "RED", title: `Publicité refusé`, description:`───────────────────────────\n**Informations Publicitaires :**\nUtilisateur : ${message.author} | \`${message.author.tag}\`\nID : \`${message.author.id}\`\nSalon : <#${message.channel.id}>\nRaison : Contenue à caractère raciste, haineux ou autre.\n\n───────────────────────────\n**Contenu de la publicité : :arrow_heading_down:**\n───────────────────────────\n\n${message}\n\n───────────────────────────`}})
                                } else if(reaction.emoji.name === '4️⃣'){
                                    message.author.send('Vôtre publicité a été refusée. Raison: ``Lien d\'invitation invalide.``')

                                    let logschannel = require(path.resolve(path.join('./database/logs.json')));
                                    if(!logschannel[message.guild.id]) return;
                                    let channel = client.channels.cache.find(c => c.id === logschannel[message.guild.id].logsChannel);
                                
                                    let logs = channel.send({embed : {color : "RED", title: `Publicité refusé`, description:`───────────────────────────\n**Informations Publicitaires :**\nUtilisateur : ${message.author} | \`${message.author.tag}\`\nID : \`${message.author.id}\`\nSalon : <#${message.channel.id}>\nRaison : Lien d\'invitation invalide.\n\n───────────────────────────\n**Contenu de la publicité : :arrow_heading_down:**\n───────────────────────────\n\n${message}\n\n───────────────────────────`}})
                                } else if(reaction.emoji.name === '5️⃣'){
                                    message.author.send('Vôtre publicité à été refusée. Raison: ``Pub dans le mauvais salon.``')

                                    let logschannel = require(path.resolve(path.join('./database/logs.json')));
                                    if(!logschannel[message.guild.id]) return;
                                    let channel = client.channels.cache.find(c => c.id === logschannel[message.guild.id].logsChannel);
                                
                                    let logs = channel.send({embed : {color : "RED", title: `Publicité refusé`, description:`───────────────────────────\n**Informations Publicitaires :**\nUtilisateur : ${message.author} | \`${message.author.tag}\`\nID : \`${message.author.id}\`\nSalon : <#${message.channel.id}>\nRaison : Pub dans le mauvais salon.\n\n───────────────────────────\n**Contenu de la publicité : :arrow_heading_down:**\n───────────────────────────\n\n${message}\n\n───────────────────────────`}})
                                } else if(reaction.emoji.name === '6️⃣'){
                                    message.author.send('Vôtre publicité à été refusée. Raison: ``Publicité sans description.``')

                                    let logschannel = require(path.resolve(path.join('./database/logs.json')));
                                    if(!logschannel[message.guild.id]) return;
                                    let channel = client.channels.cache.find(c => c.id === logschannel[message.guild.id].logsChannel);
                                
                                    let logs = channel.send({embed : {color : "RED", title: `Publicité refusé`, description:`───────────────────────────\n**Informations Publicitaires :**\nUtilisateur : ${message.author} | \`${message.author.tag}\`\nID : \`${message.author.id}\`\nSalon : <#${message.channel.id}>\nRaison : Publicité sans description.\n\n───────────────────────────\n**Contenu de la publicité : :arrow_heading_down:**\n───────────────────────────\n\n${message}\n\n───────────────────────────`}})
                                } else if(reaction.emoji.name === '✏️'){
                                    let user = reaction.users.cache.last();
                                    await user.send(
                                      new Discord.MessageEmbed()
                                        .setTitle(`WARN`)
                                        .setColor('RED')
                                        .setDescription("Vous avez choisis de mettre vôtre propre raison de suppressions. Veuillez l'entrer ci-dessous.")
                                    )
                                    let channel = user.dmChannel;
                                    if (!channel) channel = await user.createDM();
                                    let filterCustomReason = (msgReason) => msgReason.author.id === user.id;
                                    channel.awaitMessages(filterCustomReason, { max: 1, time: 10000, errors: ['time'] }).then((collected => {
                                      message.author.send(`Vôtre publicité à été refusée. Raison: \`${collected.first().content}\``)
                                      user.send(`La publicité de **${message.author.tag}** a bien été supprimée.`)

                                      let logschannel = require(path.resolve(path.join('./database/logs.json')));
                                      if(!logschannel[message.guild.id]) return;
                                      let channel = client.channels.cache.find(c => c.id === logschannel[message.guild.id].logsChannel);
                                  
                                      let logs = channel.send({embed : {color : "RED", title: `Publicité refusé`, description:`───────────────────────────\n**Informations Publicitaires :**\nUtilisateur : ${message.author} | \`${message.author.tag}\`\nID : \`${message.author.id}\`\nSalon : <#${message.channel.id}>\nRaison : ${collected.first().content}\n\n───────────────────────────\n**Contenu de la publicité : :arrow_heading_down:**\n───────────────────────────\n\n${message}\n\n───────────────────────────`}})
                                    })).catch(collected => {
                                      console.log(collected)
                                    })
                                }
                            })
                            .catch(collected => {
                                console.log(collected);
                            });
                        }
                        return;
                    })
                    .catch(collected => {
                        messagemsg.delete();
                        message.author.send('Aucun modérateur n\'est disponnible pour vérifier vôtre publicité.')
                    });
                    return;
            }
        }
    }}
