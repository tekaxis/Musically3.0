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
Lets you unban users from controlling the bot.
[Admin]`,
        });
    }

    async run(client, message, args, player) {

        const guild = await Guild.findOne({guildID:message.guild.id}) || new Guild({guildID: message.guild.id})


        let member = message.mentions.members.first() || message.guild.members.cache.get(args[0]);


       if(!guild.banned.includes(member.user.id)){


            message.warn(`User \`${member.user.tag}\` is not banned from requesting songs.`);
        }


        guild.banned.remove(member.user.id);
        await guild.save();


        return message.success(`User \`${member.user.tag}\` has been unbanned and can request songs again.`)








    


    }}