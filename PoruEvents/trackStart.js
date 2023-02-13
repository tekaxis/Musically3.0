const PoruEvent = require('../Structures/PoruEvent');
const discord = require("discord.js");
const Guild = require("../models/Guild")
module.exports = class extends PoruEvent {

    async run(client, player, track) {
const data = await Guild.findOne({guildID :player.guildId});

if(data?.manager?.channelID){

    return client.helper.update(client,player)
}

const reuester = data.requester ? ` - ${player.currentTrack.info.requester}` : " ";

const channel = client.channels.cache.get(player.textChannel)
        let embed = new discord.EmbedBuilder()
        .setColor(`Blue`)
        .setTitle(`Now Playing`)
        .setDescription(`${track.info.author} - ${track.info.title}  ${reuester}`)


        return channel.send({embeds:[embed]});



    }}