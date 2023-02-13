const Command = require('../../Structures/Command');
const discord = require("discord.js")
const Guild = require("../../models/Guild");
module.exports = class extends Command {

    constructor(...args) {
        super(...args, {
            name: "prefix",
            description: `
           .prefix
           Show the current prefix.
           [Admin]
           
           .prefix <new prefix>
           Lets you set a new prefix.
           [Admin]`,
        });
    }

    async run(client, message, args, player) {
        const guild = await Guild.findOne({guildID:message.guild.id}) || new Guild({guildID: message.guild.id})



        




        guild.prefix = args[0];
        await guild.save();
        return message.success(`Prefix set to: \`${guild.prefix} \``)
      










    }}