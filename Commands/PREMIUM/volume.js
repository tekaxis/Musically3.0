const Command = require('../../Structures/Command');
const discord = require("discord.js")
const Guild = require("../../models/Guild");
module.exports = class extends Command {

    constructor(...args) {
        super(...args, {
            name: "volume",
            aliases: ['vol', "v"],
            description: `
          **  .volume 1-200**
            Lets you change the bots output volume.
          \`[Premium, DJ]\`    
            **.volume default 1-200**
            Lets you change the bots default output volume.
          \`[Premium, DJ]\``,
        });
    }

    async run(client, message, args, player) {


        if (!args[0]) {

            return message.success(`Volume is at \`${player.filters.volume * 100}%\``)
        } else if (isNaN(args[0])) {

            return message.error(`
            Invalid argument provided.
            Have a look at \`.help volume\``)
        }



        if (args[0] > 200) {


            player.setVolume(2);
            return message.success(`Volume is set to \`${player.filters.volume * 100}%\``)


        } else if (args[0] < 0) {


            player.setVolume(0.01);
            return message.success(`Volume is set to \`${player.filters.volume * 100}%\``)


        }


        player.setVolume(args[0] / 100);
        return message.success(`Volume is set to \`${player.filters.volume * 100}%\``)




    }
}