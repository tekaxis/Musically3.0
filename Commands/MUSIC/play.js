const Command = require('../../Structures/Command');
const discord = require("discord.js")
module.exports = class extends Command {

    constructor(...args) {
        super(...args, {
            name: "play",
            aliases: ['p'],
            description: 'Mostra o ping do bot',
            category: 'Utilitario'
        });
    }

    async run(client, message, args, player) {





        try {

            const getAttachmentURL = (message) => (message.attachments.first() || {}).url;

            if (!args[0] && !getAttachmentURL(message)) {

                return message.error(`Forneça um nome ou a URL da música desejada`)
            }

            let player = client.poru.players.get(message.guild.id)
            if (!player) {
                player = await client.poru.createConnection({
                    guildId: message.guild.id,
                    voiceChannel: message.member.voice.channel.id,
                    textChannel: message.channel.id,
                    region: message.member.voice.channel?.rtcRegion,
                    deaf: true,
                })
            }

            if (!args[0] && getAttachmentURL) {

                const query = getAttachmentURL(message);

                const attachments = await this.client.poru.resolve(query);

                const { tracks } = attachments;
                let track = tracks.shift();
                track.info.requester = message.author;
                track.info.title = track.info.author;

                player.queue.add(track)
                if (!player.isPlaying && !player.isPaused) player.play();

                if (player?.currentTrack) {

                    let e = new discord.EmbedBuilder()
                        .setColor(client.config.color)
                        .setTitle(`Música adicionada - Posição ${client.queue.get(message.guild.id).queue.length}`)
                        .setDescription(`[${track.info.title}](${track.info.uri}) - ${track.info.requester}`)

                    return message.channel.send({ embeds: [e] })


                }
            }


            if (client.regex(args.join())) {
              return  message.send(`Não utilize sites pornograficos, caso se repita você será banido ${client.user.username}.`)
         }

            const resolve = await client.poru.resolve(args.join(' '), "spotify");
            const { loadType, tracks, playlistInfo } = resolve;
      
            if (loadType === "PLAYLIST_LOADED") {

               message.send(`${tracks.length} músicas carregadas de : \`${playlistInfo.name} \``);
                for (let x of resolve.tracks) {
                    x.info.requester = message.author;
                    player.queue.add(x);

                }
                if (!player.isPlaying && !player.isPaused) {
                    return player.play();
                }
            } else if (loadType === "SEARCH_RESULT" || loadType === "TRACK_LOADED") {
                const track = tracks.shift()
                track.info.requester = message.author;
                player.queue.add(track);

                let e = new discord.EmbedBuilder()
                    .setColor("Blue")
                    .setTitle(`Música carregada - Posição ${player.queue.length}`)
                    .setDescription(`${track.info.author} - ${track.info.title}`)

                if(player.isPlaying){
                message.channel.send({ embeds: [e] })
                }

                if (!player.isPlaying && !player.isPaused) return player.play();

            } else if (loadType === "NO_MATCHES") {

                return message.send(`Nenhuma música encontrada. Tente ser mais especifico, incluindo nome do artista ou album`)


            } else {

                return message.send(`Nenhuma música encontrada. Tente ser mais especifico, incluindo nome do artista ou album`)
            }







        } catch (e) {

            console.log(e)

        }







    }
}