const Command = require('../../Structures/Command');
const Guild = require("../../models/Guild");
module.exports = class extends Command {

    constructor(...args) {
        super(...args, {
            name: "24/7",
            aliases: ['247'],
            description: `Toggle the bot to stay 24/7 in the voice channel.
            [Premium, Admin]`,
        });
    }

    async run(client, message, args, player) {


        const guild = await Guild.findOne({guildID:message.guild.id}) || new Guild({guildID: message.guild.id})



        if(guild._247 === true){

                guild._247 = false;
                await guild.save();

                return message.success(`24/7 Disabled`);


        } else {

            guild._247 = true;
            await guild.save();

            return message.success(`24/7 Enabled`);



        }    

    }}