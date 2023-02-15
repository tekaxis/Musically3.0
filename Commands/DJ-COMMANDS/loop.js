const Command = require('../../Structures/Command');
const discord = require("discord.js")
module.exports = class extends Command {

    constructor(...args) {
        super(...args, {
            name: "loop",
            description: `
Alterna entre os três modos de loop (queue, song, off).

            ​
.loop queue
Loop na fila.
            ​
.loop song
Loop na música atual.
            ​
.loop off
Desativa todos os loops.
`,

        });
    }

    async run(client, message, args, player) {


        setTimeout(()=>{
            client.helper.update(client,player)
        },3000)
        
        if (!args[0]) {

            if (player.loop === "NONE") {

                player.setLoop("QUEUE");
                return message.success(`Loop da fila foi ativado`)
            } else if (player.loop === 'QUEUE') {
                player.setLoop("TRACK");
                return message.success(`Loop da música atual foi ativado.`)
            } else if (player.loop === "TRACK") {

                player.setLoop("NONE");
                return message.success(`Loop desativado.`)
            }

        } else if (args[0].toLowerCase() === 'off') {

            player.setLoop("NONE")
            return message.success(`Loop desativado.`)


        } else if (args[0].toLowerCase() === 'song') {

            player.setLoop("TRACK")
            return message.success(`Loop da música atual foi ativado.`)


        } else if (args[0].toLowerCase() === 'queue') {

            player.setLoop("QUEUE")
            return message.success(`Loop da fila foi ativado`)


        }


    }
}