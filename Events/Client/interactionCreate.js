const discord = require("discord.js")
const Event = require('../../Structures/Event');
const { ButtonStyle, AutoModerationRuleKeywordPresetType } = require("discord.js")
const Playlist = require("../../models/Playlist")

module.exports = class extends Event {

    async run(interaction) {


        if (interaction.isButton()) {



            const player = this.client.poru.players.get(interaction.guild.id);

            if (!player) return interaction.deferUpdate()
            if (!interaction.member.voice?.channel?.id) return interaction.deferUpdate()
            if (interaction.member.voice.channel.id !== player.voiceChannel) return interaction.deferUpdate()


            switch (interaction.customId) {

                case "play": {

                    const row = interaction.message.components[0];
                    const row2 = interaction.message.components[1]
                    player.pause(!player.isPaused);

                    row.components[0] = new discord.ButtonBuilder()
                        .setCustomId("play")
                        .setStyle(ButtonStyle.Secondary)
                        .setEmoji(player.isPaused ? this.client.config.emojis.play : this.client.config.emojis.pause);

                    await interaction.update({ components: [row, row2] });

                    break;

                }

                case "skip":
                    {

                        player.stop();
                        interaction.deferUpdate();
                        break;
                    }

                case "stop":
                    {

                        player.queue.clear();
                        player.stop();
                        interaction.deferUpdate();
                        break;
                    }
                case "loop":
                    {


                        let embed = new discord.EmbedBuilder()
                            .setColor(this.client.config.color)
                        if (player.loop === "NONE") {

                            player.setLoop("QUEUE")
                            embed.setDescription(`Looping the queue activated.`)
                        } else if (player.loop === "QUEUE") {
                            player.setLoop("TRACK");
                            embed.setDescription(`Looping the current song enabled.`)
                        } else if (player.loop === "TRACK") {
                            player.setLoop("NONE")
                            embed.setDescription(`Looping disabled.`)
                        }


                        let loop = false
                        if (player.loop === "TRACK") loop = true
                        if (player.loop === "QUEUE") loop = true


                        const row = interaction.message.components[0];
                        const row2 = interaction.message.components[1]
                        console.log(loop, player.loop)
                        row.components[3] = new discord.ButtonBuilder()
                            .setCustomId("loop")
                            .setStyle(ButtonStyle.Secondary)
                            .setEmoji(loop ? this.client.config.emojis.loop_on : this.client.config.emojis.loop);


                        await interaction.update({ components: [row, row2] });


                        interaction.followUp({ embeds: [embed] })
                        break;

                    }
                case "shuffle":
                    {

                        player.queue.shuffle()
                        interaction.deferUpdate();
                        break;
                    }
                case "ADD_TRACK_TO_PLAYLIST":
                    {

                        let playlist = await Playlist.findOne({ userID: interaction.user.id, name: "fav" })

                        if (!playlist) {
                            playlist = await Playlist.create({ userID: interaction.user.id, name: "fav" })
                            playlist.timestamp = Date.now()

                        }

                        playlist.tracks.push(player.currentTrack.info.title)
                        playlist.tracks = [...new Set(playlist.tracks)];
                        await playlist.save();


                        let embed = new discord.EmbedBuilder()
                            .setColor("Blue")
                            .setDescription(`Song added to \`fav\`.`)


                        return interaction.reply({ embeds: [embed] })



                    }

                case "REMOVE_TRACK_FROM_PLAYLIST":
                    {

                        let playlist = await Playlist.findOne({ userID: interaction.user.id, name: "fav" })

                        if (!playlist) {
                            playlist = await Playlist.create({ userID: interaction.user.id, name: "fav" })
                            playlist.timestamp = Date.now()

                        }

                        if (!playlist.tracks.length) return interaction.deferUpdate()

                        playlist.tracks =  playlist.tracks.filter(e => e !== player.currentTrack.info.title)
                        await playlist.save();


                 
                            
                        let embed = new discord.EmbedBuilder()
                        .setColor("Blue")
                        .setDescription(`Song removed from \`fav\`.`)


                    return interaction.reply({ embeds: [embed] })






                        }








            }





        }





    }
}