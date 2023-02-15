const Command = require('../../Structures/Command');
const discord = require("discord.js")
const Guild = require("../../models/Guild");
const {PermissionsBitField} = require("discord.js")
module.exports = class extends Command {

    constructor(...args) {
        super(...args, {
            name: "unban",
            aliases :['ub'],
            description: `
Desbloqueia usuários para voltarem a usar o bot.
[Admin]`,
        });
    }

    async run(client, message, args, player) {

        const guild = await Guild.findOne({guildID:message.guild.id}) || new Guild({guildID: message.guild.id})


        let member = message.mentions.members.first() || message.guild.members.cache.get(args[0]);


       if(!guild.banned.includes(member.user.id)){


            message.warn(`Membro \`${member.user.tag}\` não está bloqueado de usar o bot.`);
        }


        guild.banned.remove(member.user.id);
        await guild.save();


        return message.success(`Membro \`${member.user.tag}\` foi desbloqueado e pode usar o bot novamente.`)








    


    }}