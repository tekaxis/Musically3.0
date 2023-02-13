const Command = require('../../Structures/Command');
const discord = require("discord.js")
const Guild = require("../../models/Guild");
module.exports = class extends Command {

    constructor(...args) {
        super(...args, {
            name: "speed",
            description: `Speeds up the current song.
          \` [Premium, DJ]\`    ​
            ..speed <speed factor>
            Sets the speed up to 2x.
          \` [Premium, DJ]\`    ​
            ..speed <slow | off | fast>
            Sets the speed level (slow | off | fast)
          \` [Premium, DJ]\``,
        });
    }

    async run(client, message, args, player) {


        if(!args[0]){

            return message.success(`Speed is set to ${player.filters.timescale?.speed||1}x`)
        }



        if(args[0] === "slow"){

            player.filters.setTimescale({
                speed: 0.5,
            })
            return message.success(`Speed is set to ${player.filters.timescale?.speed||0}x`)

        }else if(args[0] ==="fast"){

            player.filters.setTimescale({
                speed: 2.0,
            })
            return message.success(`Speed is set to ${player.filters.timescale?.speed||0}x`)

     }else if(args[0] ==="off"){

        player.filters.setTimescale({
            speed: 1.0,
        })
        return message.success(`Speed is set to ${player.filters.timescale?.speed||1}x`)

     }else if(isNaN(args[0])){

        return message.error(`
        Invalid argument provided.
        Have a look at \`.help speed\``)
    }




    if(args[0]>2){

        player.filters.setTimescale({
            speed: 2.0,
        })
        return message.success(`Speed is set to ${player.filters.timescale?.speed||1}x`)
  
    
    
    }else if(args[0] < -2){
    
        player.filters.setTimescale({
            speed: 2.0,
        })
        return message.success(`Speed is set to ${player.filters.timescale?.speed||1}x`)
  
    }
    
    
    
    
    player.filters.setTimescale({
        speed: args[0],
    })
    return message.success(`Speed is set to ${player.filters.timescale?.speed||1}x`)

    
    
    
    
    




    }}