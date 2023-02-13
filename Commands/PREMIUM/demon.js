const Command = require('../../Structures/Command');
const discord = require("discord.js")
const Guild = require("../../models/Guild");
module.exports = class extends Command {

    constructor(...args) {
        super(...args, {
            name: "demon",
            description: `Toggles the demon filter.
          \` [Premium, DJ]\``,
        });
    }

    async run(client, message, args, player) {



        if(player.filters.isDemon == null ||   player.filters.isDemon == false){

            player.filters.isDemon = true;
            player.filters.setVibrato({
                "frequency": 10.0, // 0 < x ≤ 14
                "depth": 0.9      // 0 < x ≤ 1
            
            })


                return message.success(`Demon mode active.`)


        }else {
            player.filters.isDemon = false;
            player.filters.setKaraoke(null)


            return message.success(`Demon mode disabled.`)


        }














    }}