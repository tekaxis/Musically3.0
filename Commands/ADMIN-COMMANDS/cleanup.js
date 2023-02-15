const Command = require('../../Structures/Command');
const discord = require("discord.js")
const Guild = require("../../models/Guild");
module.exports = class extends Command {

    constructor(...args) {
        super(...args, {
            name: "cleanup",
            aliases :['clean'],
            description: `
Limpa as mensagens do bot.
[Admin]`,
        });
    }

    async run(client, message, args, player) {
        const guild = await Guild.findOne({guildID:message.guild.id}) || new Guild({guildID: message.guild.id})

        let messages = await message.channel.messages.fetch({ limit: 100 });

        messages = messages.filter((m) => m.author.id === client.user.id || m.content.startsWith(guild.prefix));

        let length = messages.size
        message.channel.bulkDelete(messages, true);



        let msg = await message.success(`Limpando \`${length}\` mensagens.`)


        setTimeout(function () {
            msg.delete().catch(e => null)
        }, 5000);

    }}