const Command = require('../../Structures/Command');
const discord = require("discord.js")
const Guild = require("../../models/Guild");
module.exports = class extends Command {

    constructor(...args) {
        super(...args, {
            name: "requester",
            description: `
            .requester
            Enables/disables if the requester is shown on each track.
            [Admin] ​
          `,
        });
    }

    async run(client, message, args, player) {


        const guild = await Guild.findOne({guildID:message.guild.id}) || new Guild({guildID: message.guild.id})












     
        if(guild.requester === true){

                guild.requester = false;
                await guild.save();

                return message.success(`:x: __**Requester is no longer shown permanently on each track.**__`);


        } else {

            guild.requester = true;
            await guild.save();

            return message.success(`:white_check_mark: __**Requester will be shown permanently on each track.**__`);



        }
        
    
    }}