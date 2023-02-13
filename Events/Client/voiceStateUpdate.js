const Event = require('../../Structures/Event');
const { ChannelType } = require('discord.js');
const discord = require("discord.js")
const Guild = require("../../models/Guild")
module.exports = class extends Event {

  async run(oldVoice, newVoice) {

    const player = this.client.poru.players.get(oldVoice.guild.id);
    if (!player) return;


    if (!newVoice.guild.members.me.voice.channel) {
       player.destroy()
    }

  }}