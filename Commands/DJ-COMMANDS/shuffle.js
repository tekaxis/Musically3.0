const Command = require('../../Structures/Command');
const discord = require("discord.js")
module.exports = class extends Command {

    constructor(...args) {
        super(...args, {
            name: "shuffle",
            aliases: ['mix'],
            description: 'Mistura as músicas na fila.',
        });
    }

    async run(client, message, args, player) {


  if(player.queue.length < 3){

    return message.send(`Necessário ao menos \`3\` músicas na fila para embaralhar.`)
  }


    }}