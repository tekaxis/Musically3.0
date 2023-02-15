const Command = require('../../Structures/Command');
const discord = require("discord.js")
module.exports = class extends Command {

    constructor(...args) {
        super(...args, {
            name: "clear",
            aliases: ['c','limpar'],
            description: 'Limpa toda a fila.',
        });
    }

    async run(client, message, args, player) {


        if(player.queue.length === 0){
            return message.error(`Nenhuma música na fila.`)
        }
        player.queue.clear()

        return message.success(`A fila já está limpa.`)


    }}