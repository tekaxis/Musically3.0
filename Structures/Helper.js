
const discord = require("discord.js")
const Guild = require("../models/Guild")
const prettyms = require("pretty-ms");


class Helper {


  async reset(client,player){

    const guild = client.guilds.cache.get(player.guildId) || client.guilds.fetch(player.guildId)
    const data  = await Guild.findOne({guildID: guild?.id});
    const channel = await guild.channels.cache.get(data.manager?.channelID)
    const message = await  channel?.messages.fetch(data.manager.messageID)



    let content = `
    _ _
   **Fila:**
   Entre em um canal de voz e adicione músicas digitando pelo nome ou sua URL aqui.`
   
           let e = new discord.EmbedBuilder()
               .setImage("https://i.imgur.com/FQOWLBW.png")
               .setColor("Purple")
               .setTitle(`Nenhuma música tocando no momento`)
               .setDescription(`
   [Convite](https://discord.com) | [Painel](https://discord.com) | [Comandos](https://discord.com) | [Suporte](https://discord.com)    
   
     
               
               `)
               .setFooter({text:`O prefixo do servidor é . ${data.prefix}`})
   


               message.edit({embeds:[e]})

  }


    async update(client,player){

        const guild = client.guilds.cache.get(player.guildId) || client.guilds.fetch(player.guildId)
        const data  = await Guild.findOne({guildID: guild?.id});

        const channel = await guild.channels.cache.get(data.manager?.channelID)
    
        const message = await  channel?.messages.fetch(data.manager.messageID)
        if (!player) return this.reset();
    
    
        let loop = false,num =1;
        if (player.loop == "TRACK") loop= true;
        else if (player.loop ==="QUEUE") loop = true;
    
        const embed = new discord.EmbedBuilder()
        .setTitle(`[${this.millisToDuration(player.currentTrack.info.length)}] - ${player.currentTrack.info.title}`)
        .setDescription(
          data.requester
            ? `${
                player.currentTrack.info.requester
                  ? `Solicitado por: ${player.currentTrack.info.requester}`
                  : ""
              }`
            : " _ _"
        )
        .setColor("Purple")
        .setImage(player.currentTrack.info.image)
        .setFooter({text:
          `${player.queue.length} músicas na fila | Volume: ${
            player.filters.volume * 100
          }%${player.isPaused ? " | Música pausada" : ""}${
            loop ? ` | Loop: ${player.loop.toLowerCase()}` : ""
          }`
         } );
      const content = `** **\n**__Fila:__**\n\n${
        player.queue.length > 15 ? `E **${player.queue.length - 15}** mais...\n` : ""
      }${
        player.queue.length > 0
          ? `${player.queue
              .slice(0, 15)
              .map(
                (n) => `${num++}. ${n.info.author} - ${n.info.title} - [${this.millisToDuration(n.info.length)}]`
              )
              .reverse()
              .join("\n")}`
          : "Entre em um canal de voz e adicione músicas digitando pelo nome ou sua URL aqui."
      }`;
      message.edit({embeds:[embed],content:content});
    
    
     }
    




     durationToMillis(dur) {
        return dur.split(':').map(Number).reduce((acc, curr) => curr + acc * 60) * 1000;
    }
    
     millisToDuration(ms) {
        return prettyms(ms, { colonNotation: true, secondsDecimalDigits: 0 });
    }
    
    
    
    








}


module.exports = Helper