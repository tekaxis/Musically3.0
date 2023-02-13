const Command = require('../../Structures/Command');
const discord = require("discord.js")
const Guild = require("../../models/Guild");
module.exports = class extends Command {

    constructor(...args) {
        super(...args, {
            name: "announce",
            description: `
            .announce
            Toggle sending of now playing messages on/off
            [Admin]
            ​
            .announce delete
            Toggle deletion of now playing messages on/off
            [Admin]`,
        });
    }

    async run(client, message, args, player) {


        const guild = await Guild.findOne({guildID:message.guild.id}) || new Guild({guildID: message.guild.id})




        if(args[0] ==="delete"){



            if(guild.delannounce === true){

                guild.delannounce = false;
                await guild.save();

                return message.success(`Now playing messages won't get deleted anymore.`);


        } else {

            guild.delannounce = true;
            await guild.save();

            return message.success(`Now playing messages will get deleted.`);



        }
        
    






        }






     
        if(guild.announce === true){

                guild.announce = false;
                await guild.save();

                return message.success(`Now playing messages won't be sent anymore`);


        } else {

            guild.announce = true;
            await guild.save();

            return message.success(`Now playing messages will be sent.`);



        }
        
    
    }}