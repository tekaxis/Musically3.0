const Command = require('../../Structures/Command');
const Discord = require("discord.js")
const discord = require('discord.js')
const Guild = require("../../models/Guild");
const {ChannelType, ButtonStyle} = require("discord.js")
const {emojis}= require("../../config.json")
module.exports = class extends Command {

    constructor(...args) {
        super(...args, {
            name: "setup",
            aliases :['clean'],
           description: `
           .prefix
           Show the current prefix.
           [Admin]
           
           .prefix <new prefix>
           Lets you set a new prefix.
           [Admin]`,
        });
    }

    async run(client, message, args, player) {
        const guild = await Guild.findOne({guildID:message.guild.id}) || new Guild({guildID: message.guild.id})




      let x  = await  message.guild.channels.create({
            name : client.config.channelName,
            type: ChannelType.GuildText,
            topic : `<:hydra_play:971015680600199178> Pause/Resume the song.
            <:hydra_stop:971015680696672356> Stop and empty the queue.
            <:hydra_skip:971015680654729216> Skip the song.
            <:hydra_loop_off:971015680629559296> Switch between the loop modes.
            <:hydra_shuffle:971015680633741312> Shuffle the queue.
            <:hydra_button_green:974274003659292682> Add the current song to your private playlist.
            <:hydra_button_red:974274003663482880> Remove the current song from your private playlist.`,
            reason : ``

        })



        let channel = message.guild.channels.cache.get(x.id);

      //  let attach = new Discord.AttachmentBuilder",{name:"hydra.jpg"} )
    

        /*let embed = new Discord.EmbedBuilder()
        .setImage({
            url:"https://cdn.discordapp.com/attachments/1035561055939723334/1035561057390960680/hydra_banner.png"})

*/
        channel.send({files:["https://cdn.discordapp.com/attachments/1035561055939723334/1035561057390960680/hydra_banner.png"]}).then (x => {



            const raw = new discord.ActionRowBuilder().addComponents(

                new discord.ButtonBuilder()
                
                  .setCustomId("play")
                  .setStyle(ButtonStyle.Secondary)
                  .setEmoji(emojis.play),
                new discord.ButtonBuilder()
                  .setCustomId("skip")
                  .setStyle(ButtonStyle.Secondary)
                  .setEmoji(emojis.skip),
          
                new discord.ButtonBuilder()
                  .setCustomId("stop")
                  .setStyle(ButtonStyle.Secondary)
                  .setEmoji(emojis.stop),
          
                new discord.ButtonBuilder()
                  .setCustomId("loop")
                  .setStyle(ButtonStyle.Secondary)
                  .setEmoji(emojis.loop),
          
                new discord.ButtonBuilder()
                  .setCustomId("shuffle")
                  .setStyle(ButtonStyle.Secondary)
                  .setEmoji(emojis.shuffle)
              )


              const raw2 = new discord.ActionRowBuilder().addComponents(

                new discord.ButtonBuilder()
                  .setCustomId("ADD_TRACK_TO_PLAYLIST")
                  .setStyle(ButtonStyle.Success)
                  .setLabel("Add to Playlist"),
                  new discord.ButtonBuilder()
                  .setCustomId("REMOVE_TRACK_FROM_PLAYLIST")
                  .setStyle(ButtonStyle.Danger)
                  .setLabel("Remove from Playlist"),
        

              )













        let content = `
 _ _
**Queue list:**
Join a voice channel and queue songs by name or url in here.`

        let e = new Discord.EmbedBuilder()
            .setImage("https://cdn.hydra.bot/hydra_no_music.png")
            .setColor("Purple")
            .setTitle(`No song playing currently`)
            .setDescription(`
[Invite](https://discord.com) | [Dashboard](https://discord.com) | [Commands](https://discord.com) | [Support](https://discord.com)    

  
            
            `)
            .setFooter({text:`Prefix for this server is ${guild.prefix}`})



   channel.send({embeds:[e],content:content,components:[raw,raw2]}).then(async (x) => {

guild.manager.channelID = channel.id;
guild.manager.messageID = x.id;
await guild.save()

    })


        })



    }}