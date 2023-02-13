const Command = require('../../Structures/Command');
const discord = require("discord.js")
const Guild = require("../../models/Guild");
module.exports = class extends Command {

    constructor(...args) {
        super(...args, {
            name: "vaporwave",
            aliases:['vw'],
            description: `Toggles the vaporwave filter.
          \` [Premium, DJ]\``,
        });
    }

    async run(client, message, args, player) {


        player.filters.setVaporwave(!player.filters.vaporwave)

        return message.success(`Vaporwave mode ${player.filters.vaporwave ? "enabled" : "disabled"} `)












    }}