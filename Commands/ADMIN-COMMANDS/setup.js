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
            aliases :['start'],
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
            topic : `<:hydra_play:971015680600199178> Pausa/continua a música.
            <:hydra_stop:971015680696672356> Cancela e limpa toda fila.
            <:hydra_skip:971015680654729216> Pula a música atual.
            <:hydra_loop_off:971015680629559296> Troca os modos de loop.
            <:hydra_shuffle:971015680633741312> Mistura as músicas da playlist.
            <:hydra_button_green:974274003659292682> Adiciona a música atual a sua playlist privada.
            <:hydra_button_red:974274003663482880> Remove a música atual de sua playlist privada.`,
            reason : ``

        })



        let channel = message.guild.channels.cache.get(x.id);

      //  let attach = new Discord.AttachmentBuilder",{name:"hydra.jpg"} )
    

        /*let embed = new Discord.EmbedBuilder()
        .setImage({
            url:"https://cdn.discordapp.com/attachments/1035561055939723334/1035561057390960680/hydra_banner.png"})

*/
        channel.send("Feito com muito carinho por Carlu#6635").then (x => {



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
                  .setLabel(" Adicionar a playlist"),
                  new discord.ButtonBuilder()
                  .setCustomId("REMOVE_TRACK_FROM_PLAYLIST")
                  .setStyle(ButtonStyle.Danger)
                  .setLabel("Remover da playlist"),
        

              )













        let content = `
 _ _
**Fila:**
Entre em um canal de voz e adicione músicas digitando pelo nome ou sua URL aqui.`

        let e = new Discord.EmbedBuilder()
            .setImage("https://i.imgur.com/FQOWLBW.png")
            .setColor("Purple")
            .setTitle(`Nenhuma música tocando no momento`)
            .setDescription(`
[Convite](https://discord.com) | [Painel](https://discord.com) | [Comandos](https://discord.com) | [Suporte](https://discord.com)    

  
            
            `)
            .setFooter({text:`O prefixo do servidor é ${guild.prefix}`})



   channel.send({embeds:[e],content:content,components:[raw,raw2]}).then(async (x) => {

guild.manager.channelID = channel.id;
guild.manager.messageID = x.id;
await guild.save()

    })


        })



    }}