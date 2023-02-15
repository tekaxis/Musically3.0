const Command = require('../../Structures/Command');
const discord = require("discord.js")
module.exports = class extends Command {

    constructor(...args) {
        super(...args, {
            name: "leave",
            aliases: ['dc','sair'],
            description: 'Disconecta o bot do canal de voz atual.',
        });
    }

    async run(client, message, args, player) {


        player?.destroy();
        return message.react("👌");

    }}