const Command = require('../../Structures/Command');
const discord = require("discord.js")
module.exports = class extends Command {

    constructor(...args) {
        super(...args, {
            name: "skip",
            aliases: ['s','next'],
            description: `
.skip
Lets you skip the current song.
[DJ]
            ​
.skip <trackNumber>
Skips to a specific track in the queue.
[DJ]`,
        });
    }

    async run(client, message, args, player) {


        if(!args[0]){

            player.stop();
            return message.react("👌")
        }
       

        if(isNaN(args[0])) {
            return message.error(`
            Invalid argument provided.
            Have a look at \`.help skip\``)
        }

        if(player.queue.length < args[0]){

            message.success(`Skipped \`${player.queue.length}\` songs.`)
         return  player.queue.clear();


        } else{
                   player.queue.slice(0,args[0]);
                  return message.success(`Skipped \`${args[0]}\` songs.`)

        }










    }}