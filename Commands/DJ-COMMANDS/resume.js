const Command = require('../../Structures/Command');
const discord = require("discord.js")
module.exports = class extends Command {

    constructor(...args) {
        super(...args, {
            name: "resume",
            aliases: ['continue'],
            description: `
PResumes the current paused song.
[DJ]`,
        });
    }

    async run(client, message, args, player) {


        if (!player.isPaused) {
            return message.send(`The song is not paused.`)
        }

        player.pause(false);

        return message.success(`Resumed the song.`)


    }
}