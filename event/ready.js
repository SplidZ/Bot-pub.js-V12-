module.exports = {
    name: 'ready',
    once: true,

    async execute(client) {
        console.log(`Je suis connecter à ${client.user.username}`)

        var compteurStatus = 1
        setInterval(async () => {
            status = [`=help`,
                `${client.guilds.cache.size} serveurs`,
                `${client.guilds.cache.reduce((acc, guild) => acc + guild.memberCount, 0)} utilisateurs`
            ]
            compteurStatus = (compteurStatus + 1) % (status.length);
            client.user.setPresence({
                status: "online",
                activity: {
                    name: `${status[compteurStatus]}`,
                    type: "WATCHING",
                }
            })
        }, 5000);
    }
}