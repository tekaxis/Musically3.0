const Command = require('../../Structures/Command');
const discord = require("discord.js")
const Guild = require("../../models/Guild");
const {PermissionsBitField} = require("discord.js")
module.exports = class extends Command {

    constructor(...args) {
        super(...args, {
            name: "ban",
            aliases :['b'],
            description: `
            .ban <user>
Bloqueia alguém de usar o bot.
[Admin]`,
        });
    }

    async run(client, message, args, player) {

        const guild = await Guild.findOne({guildID:message.guild.id}) || new Guild({guildID: message.guild.id})


        let member = message.mentions.members.first() || message.guild.members.cache.get(args[0]);


        if(member.permissions.has(PermissionsBitField.resolve("Administrator")) || member.permissions.has(PermissionsBitField.resolve("MangeGuild"))){


            return message.error(`Não pode bloquear usuários pois não tem alguma das seguintes permissões:
           \` Gerenciar servidor, Administrador\`.`)







        }
        if(guild.banned.includes(member.user.id)){


            message.warn(`User \`${member.user.tag}\` is already banned from requesting songs.`);
        }


        guild.banned.push(member.user.id);
        await guild.save();


        return message.success(`User \`${member.user.tag}\` has been banned from requesting songs.`)








    


    }}