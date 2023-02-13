const Command = require('../../Structures/Command');
const discord = require("discord.js")
module.exports = class extends Command {

    constructor(...args) {
        super(...args, {
            name: "loop",
            description: `
Cycles through all three loop modes (queue, song, off).
[DJ]
            ​
.loop queue
Loop the queue.
[DJ]
            ​
.loop song
Loop the current playing song.
[DJ]
            ​
.loop off
Turn looping off
[DJ]'
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
                return message.success(`Looping the queue activated.`)
            } else if (player.loop === 'QUEUE') {
                player.setLoop("TRACK");
                return message.success(`Looping the current song enabled.`)
            } else if (player.loop === "TRACK") {

                player.setLoop("NONE");
                return message.success(`Looping disabled.`)
            }

        } else if (args[0].toLowerCase() === 'off') {

            player.setLoop("NONE")
            return message.success(`Looping disabled.`)


        } else if (args[0].toLowerCase() === 'song') {

            player.setLoop("TRACK")
            return message.success(`Looping the current song enabled.`)


        } else if (args[0].toLowerCase() === 'queue') {

            player.setLoop("QUEUE")
            return message.success(`Looping the queue activated.`)


        }


    }
}