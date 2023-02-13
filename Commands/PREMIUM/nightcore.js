const Command = require('../../Structures/Command');
const discord = require("discord.js")
const Guild = require("../../models/Guild");
module.exports = class extends Command {

    constructor(...args) {
        super(...args, {
            name: "nightcore",
            description: `Toggles the nightcore filter.
          \` [Premium, DJ]\``,
        });
    }

    async run(client, message, args, player) {


        player.filters.setNightcore(!player.filters.nightcore)

        return message.success(`Nightcore mode ${player.filters.nightcore ? "enabled" : "disabled"} `)












    }}