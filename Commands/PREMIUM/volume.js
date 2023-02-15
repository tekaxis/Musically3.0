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
            Modifica o volume do bot.   
            **.volume default 1-200**
            Modifica o volume padrão do bot.
            `,
        });
    }

    async run(client, message, args, player) {


        if (!args[0]) {

            return message.success(`Volume está em \`${player.filters.volume * 100}%\``)
        } else if (isNaN(args[0])) {

            return message.error(`
            Invalid argument provided.
            Digite \`.help volume\``)
        }



        if (args[0] > 200) {


            player.setVolume(2);
            return message.success(`Volume está em \`${player.filters.volume * 100}%\``)


        } else if (args[0] < 0) {


            player.setVolume(0.01);
            return message.success(`Volume está em \`${player.filters.volume * 100}%\``)


        }


        player.setVolume(args[0] / 100);
        return message.success(`Volume está em \`${player.filters.volume * 100}%\``)




    }
}