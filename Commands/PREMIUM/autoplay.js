const Command = require('../../Structures/Command');
const discord = require("discord.js")
const Guild = require("../../models/Guild");
module.exports = class extends Command {

    constructor(...args) {
        super(...args, {
            name: "autoplay",
            aliases: ['ap','auto'],
            description: ``,
        });
    }

    async run(client, message, args, player) {


        const guild = await Guild.findOne({guildID:message.guild.id}) || new Guild({guildID: message.guild.id})



        if(guild.autoplay === true){

                guild.autoplay = false;
                await guild.save();

                return message.success(`Autoplay disabilitado`);


        } else {

            guild.autoplay = true;
            await guild.save();

            return message.success(`Autoplay habilitado`);



        }    

    }}