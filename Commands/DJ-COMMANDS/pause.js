const Command = require('../../Structures/Command');
const discord = require("discord.js")
module.exports = class extends Command {

    constructor(...args) {
        super(...args, {
            name: "pause",
            aliases: ['break'],
            description: `
Pauses the current playing song.
[DJ]`,
        });
    }

    async run(client, message, args, player) {


        if (player.isPaused) {
            return message.send(`The song is already paused.`)
        }

        player.pause(true);

        return message.success(`Paused the song.`)


    }
}