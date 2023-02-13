const Command = require('../../Structures/Command');
const discord = require("discord.js")
module.exports = class extends Command {

    constructor(...args) {
        super(...args, {
            name: "replay",
            aliases: ['rp','restart'],
            description: `Replay the current song. [DJ]`,
        });
    }

    async run(client, message, args, player) {


  
        player.seekTo(0)
        return message.react("👌");
    }}