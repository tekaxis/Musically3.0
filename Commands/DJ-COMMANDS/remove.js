const Command = require('../../Structures/Command');
const discord = require("discord.js")
module.exports = class extends Command {

    constructor(...args) {
        super(...args, {
            name: "remove",
            aliases: ['rm','de','delete'],
            description: `Remove a specific song from the queue.
            [DJ]
            ​
            .remove cleanup
            Removes songs from users which left the voice channel.
            [DJ]
            ​
            .remove doubles
            Remove duplicate songs from the queue.
            [DJ]
            ​
            .remove range <from> <to>
            Remove a range of tracks from the queue.
            [DJ]`,
        });
    }

    async run(client, message, args, player) {


        if(args[0] ==="doubles"){

            const newQueue = {};
            for (const song of player.queue) {
                if (newQueue[song.info.indentifier] === undefined) newQueue[song.info.indentifier] = song;
            }
            player.queue = Object.values(newQueue);



        }

        if(!args[0] || isNaN(args[0])){
            return message.send(`You forgot the track id to move.`);
        }

        if(args[0] < 1 || args[0] > player.queue.length ){


            return message.error(`There's no song with index \`${args[0]}\` in the queue.`)


        }

        let iToRemove = parseInt(args[0], 10);
        player.queue.splice(--iToRemove, 1)[0];
        return message.react("👌")
       

   

    }}