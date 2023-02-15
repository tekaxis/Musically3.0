const Command = require('../../Structures/Command');
const discord = require("discord.js")
module.exports = class extends Command {

    constructor(...args) {
        super(...args, {
            name: "resume",
            aliases: ['continue'],
            description: `
Continua uma música pausada.
`,
        });
    }

    async run(client, message, args, player) {


        if (!player.isPaused) {
            return message.send(`A música não está pausada.`)
        }

        player.pause(false);

        return message.success(`Continuando a música.`)


    }
}