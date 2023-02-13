const Command = require('../../Structures/Command');
const discord = require("discord.js")
module.exports = class extends Command {

    constructor(...args) {
        super(...args, {
            name: "clear",
            aliases: ['c','empty'],
            description: 'Clears the current queue.',
        });
    }

    async run(client, message, args, player) {


        if(player.queue.length === 0){
            return message.error(`There is currently no song in the queue.`)
        }
        player.queue.clear()

        return message.success(`The queue has been cleared.`)


    }}