const Command = require('../../Structures/Command');
const discord = require("discord.js")
module.exports = class extends Command {

    constructor(...args) {
        super(...args, {
            name: "shuffle",
            aliases: ['sh'],
            description: 'Shuffle the queue.',
        });
    }

    async run(client, message, args, player) {


  if(player.queue.length < 3){

    return message.send(`Need at least \`3\` songs in the queue to shuffle.`)
  }


    }}