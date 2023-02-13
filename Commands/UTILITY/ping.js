const Command = require('../../Structures/Command');
const discord = require("discord.js")
module.exports = class extends Command {

    constructor(...args) {
        super(...args, {
            name: "ping",
            aliases:['latency'],
            description : `
**.ping**
Shows the latency of the bot.
\`[Everyone]\`
​
**.ping ws**
Shows the websocket latency of the bot.
\`[Everyone]\`
​
**.ping rest**
Shows the rest latency of the bot.
\`[Everyone]\`
            
            `
        });
    }

    async run(client, message) {


            let embed = new discord.EmbedBuilder()
                .setColor(client.config.color)
                
                .setDescription(`:green_circle: \`${client.ws.ping} ms\``);



                return message.channel.send({embeds:[embed]});
            
            
    }
}