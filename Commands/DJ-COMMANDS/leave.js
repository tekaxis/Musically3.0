const Command = require('../../Structures/Command');
const discord = require("discord.js")
module.exports = class extends Command {

    constructor(...args) {
        super(...args, {
            name: "leave",
            aliases: ['dc','disconnect'],
            description: 'Disconnects the bot from its current voice channel.',
        });
    }

    async run(client, message, args, player) {


        player?.destroy();
        return message.react("👌");

    }}