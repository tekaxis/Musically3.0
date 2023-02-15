const Command = require('../../Structures/Command');
const discord = require("discord.js")
module.exports = class extends Command {

    constructor(...args) {
        super(...args, {
            name: "pause",
            aliases: [''],
            description: `
Pausa a música atual`,
        });
    }

    async run(client, message, args, player) {


        if (player.isPaused) {
            return message.send(`A música já esta pausada.`)
        }

        player.pause(true);

        return message.success(`Música pausada.`)


    }
}