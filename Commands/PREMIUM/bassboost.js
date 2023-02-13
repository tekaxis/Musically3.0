const Command = require('../../Structures/Command');
const discord = require("discord.js")
const Guild = require("../../models/Guild");
module.exports = class extends Command {

    constructor(...args) {
        super(...args, {
            name: "bassboost",
            aliases: ['bb', 'bass'],
            description: `Show the current bassboost level.
          \` [Premium, DJ]\`    ​
            ..bassboost <boost factor>
            Sets the bassboost from -5 (max treble) to 5 (max bass).
          \` [Premium, DJ]\`    ​
            ..bassboost <off | low | medium | high | extreme | earrape>
            Sets the bassboost level (off | low | medium | high | extreme | earrape).
          \` [Premium, DJ]\``,
        });
    }

    async run(client, message, args, player) {

        if(!args[0]){

            return message.send(`Bassboost set to \`${player.filters.band || 0}.0x\``)
        

        }

        if (args[0] === "off") {


            player.filters. clearFilters()
         return message.send(`Bassboost set to \`${player.filters.band || 0}.0x\``)
        } else if (args[0] === "low") {

            player.filters.setEqualizer(1, 1)
            return message.send(`Bassboost set to \`${player.filters.band || 0}.0x\``)
        } else if (args[0] === "medium") {

            player.filters.setEqualizer(2, 2)
            return message.send(`Bassboost set to \`${player.filters.band || 0}.0x\``)
        } else if (args[0] === "high") {

            player.filters.setEqualizer(3, 3)
            return message.send(`Bassboost set to \`${player.filters.band || 0}.0x\``)
        } else if (args[0] === "extreme") {

            player.filters.setEqualizer(4, 4)
            return message.send(`Bassboost set to \`${player.filters.band || 0}.0x\``)
        } else if(args[0] ==="earrape"){

            player.filters.setEqualizer(5,5)
            return message.send(`Bassboost set to \`${player.filters.band || 0}.0x\``)
   


        }else if(isNaN(args[0])){

            return message.error(`
            Invalid argument provided.
            Have a look at \`.help bassboost\``)
        }




if(args[0]>5){

    player.filters.setEqualizer(5,5)
    return message.send(`Bassboost set to \`${player.filters.band || 0}.0x\``)



}else if(args[0] < -5){

    player.filters.setEqualizer(-5,-5)
    return message.send(`Bassboost set to \`${player.filters.band || 0}.0x\``)

}




player.filters.setEqualizer(args[0],args[0]);
return message.send(`Bassboost set to \`${player.filters.band || 0}.0x\``)



















        }}