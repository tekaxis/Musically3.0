const Command = require('../../Structures/Command');
const discord = require("discord.js")
module.exports = class extends Command {

    constructor(...args) {
        super(...args, {
            name: "stop",
            description: `Para o bot e limpa toda a fila.
            `,
        });
    }

    async run(client, message, args, player) {


        if(player?.queue.length === 0){
            return message.error(`Nenhuma música atualmente na fila.`)
        }
        player.queue.clear()

        return message.success(`A fila ja foi limpa`)


    }}