
const discord = require("discord.js")
const prettyms = require("pretty-ms");

class Player {

    constructor(client, message) {

        this.client = client
        this.message = message;
        this.player = client.poru.get(message.guild.id) || null;
        this.init();

    }


    async init() {
            this.player = this.client.poru.get(this.message.guild.id)
        if (this.message.author.id === this.client.user.id) {

            setTimeout(async () => {
                if (this.message.deletable) await this.message.delete().catch(e => null)
            }, 5000)
        } else {

            if (this.message.deletable) await this.message.delete().catch(e => null)
        }
        if (!this.message.member.voice.channel?.id) return
        if (this.player && this.compareVoiceChannel()) return;


        const mentionPrefixRegex = RegExp(`^<@!?${this.client.user.id}> `);
        const prefix = this.message.content.match(mentionPrefixRegex) ? this.message.content.match(mentionRegexPrefix)[0] : this.message.guildData.prefix;

        this.cmd = null, this.args = null;

        if (this.message.content.startsWith(prefix)) {

            this.args = this.message.content
                .slice(prefix.length)
                .trim()
                .split(/ +/g);
            this.cmd = this.args.shift().toLowerCase();
        } else {
            this.args = this.message.content.trim().split(/ +/);
            this.cmd = this.args.shift().toLowerCase();
        }


        if (this.cmd.length === 0) return;

        let command = this.client.commands.get(this.cmd);

        if (!command) command = this.client.commands.get(this.client.aliases.get(this.cmd));

        if (command) command.run(this.client, this.message, this.args || this.message.content.slice(prefix.length).trim().split(/ +/g),this.player);

        else {

            if (this.message.guildData.voiceChannels.length && !this.message.guildData.voiceChannels.includes(this.message.member.voice.channel?.id)) return;
            return this.play();

        }

    }


    async play() {

        const args = this.message.content.trim().split(/ +/);

        if (this.client.regex(args.join())) {
            return this.message.send(`As of recent events we've removed YouTube as a supported platform from ${this.client.user.username}.`).then(x => {
                setTimeout(() => {
                    x.delete().catch(e => null)
                }, 5000)
            })
        }

        this.player = await this.client.poru.createConnection({
            guildId: this.message.guild.id,
            voiceChannel: this.message.member.voice.channel.id,
            textChannel: this.message.channel.id,
            region: this.message.member.voice.channel?.rtcRegion,
            deaf: true,
        })

        const resolve = await this.client.poru.resolve(args.join(' '), "spotify");
        const { loadType, tracks, playlistInfo } = resolve;

        if (loadType === "PLAYLIST_LOADED") {

            this.message.send(`${tracks.length} tracks queued from : \`${playlistInfo.name} \``);
            for (let x of resolve.tracks) {
                x.info.requester = this.message.author;
                this.player.queue.add(x);

            }
             this.update()
         
            if (!this.player.isPlaying && !this.player.isPaused) {
                 this.player.play();
             }
        } else if (loadType === "SEARCH_RESULT" || loadType === "TRACK_LOADED") {
            const track = tracks.shift()
            track.info.requester = this.message.author;
            this.player.queue.add(track);
            this.update()
            if (!this.player.isPlaying && !this.player.isPaused) return  this.player.play();
            


        } else if (loadType === "NO_MATCHES") {

            return this.message.send(`No songs found. Try to be as specific as possible by only including song title and artist name!`)


        } else {

            return this.message.send(`No songs found. Try to be as specific as possible by only including song title and artist name!`)
        }
    }




async update(){


    const channel =  this.message.guild.channels.cache.get(this.message.guildData.manager.channelID)
   const message = await channel?.messages.fetch(this.message.guildData.manager.messageID)

    const player = this.client.poru.get(this.message.guild.id);
    if (!player) return this.reset();


    let loop = false,num =1;
    if (player.loop == "TRACK") loop= "song";
    else if (player.loop ==="QUEUE") loop = "queue";

    const embed = new discord.EmbedBuilder()
    .setTitle(`[${this.millisToDuration(player.currentTrack.info.length)}] - ${player.currentTrack.info.title}`)
    .setDescription(
      this.message.guildData.requester
        ? `${
            player.currentTrack.info.requester
              ? `Requested by: ${player.currentTrack.info.requester}`
              : " _ _"
          }`
        : "_ _"
    )
    .setColor("Purple")
    .setImage(player.currentTrack.info.image)
    .setFooter({text:
      `${player.queue.length} songs in queue | Volume: ${
        player.filters.volume * 100
      }%${player.isPaused ? " | Song paused" : ""}${
        loop ? ` | Loop: ${loop}` : ""
      }`
     } );
  const content = `** **\n**__Queue list:__**\n\n${
    player.queue.length > 15 ? `And **${player.queue.length - 15}** more...\n` : ""
  }${
    player.queue.length > 0
      ? `${player.queue
          .slice(0, 15)
          .map(
            (n) => `${num++}. ${n.info.author} - ${n.info.title} - [${this.millisToDuration(n.info.length)}]`
          )
          .reverse()
          .join("\n")}`
      : "Join a voice channel and queue songs by name or url in here."
  }`;

  message.edit({embeds:[embed],content:content});










}





 durationToMillis(dur) {
    return dur.split(':').map(Number).reduce((acc, curr) => curr + acc * 60) * 1000;
}

 millisToDuration(ms) {
    return prettyms(ms, { colonNotation: true, secondsDecimalDigits: 0 });
}




async createPlayer(){


   return  await this.client.poru.createConnection({
        guildId: this.message.guild.id,
        voiceChannel: this.message.member.voice.channel.id,
        textChannel: this.message.channel.id,
        region: this.message.member.voice.channel?.rtcRegion,
        deaf: true,
    })







}



    compareVoiceChannel() {

        if (this.message?.member.voice.channelId !== this.message.guild.members.me.voice.channelId) {

            return true
        } else {

            return false;
        }



    }





}



module.exports = Player