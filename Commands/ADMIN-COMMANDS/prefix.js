const Command = require('../../Structures/Command');
const discord = require("discord.js")
const Guild = require("../../models/Guild");
module.exports = class extends Command {

    constructor(...args) {
        super(...args, {
            name: "prefix",
            description: `
           .prefix
           Mostra o prefixo atual.
           [Admin]
           
           .prefix <novo prefixo>
           Altera o prefixo atual para um novo de sua preferencia.
           [Admin]`,
        });
    }

    async run(client, message, args, player) {
        const guild = await Guild.findOne({guildID:message.guild.id}) || new Guild({guildID: message.guild.id})



        




        guild.prefix = args[0];
        await guild.save();
        return message.success(`Prefix set to: \`${guild.prefix} \``)
      










    }}