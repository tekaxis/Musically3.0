const { EmbedBuilder,PermissionsBitField} = require("discord.js")
const Event = require('../../Structures/Event');
const Guild = require("../../models/Guild")
const User = require("../../models/User")
const discord = require("discord.js");
const config = require("../../config.json");
const Player = require("../../Structures/PlayerHandler")
module.exports = class extends Event {

  async run(message) {

    if (!message.guild) return

    message.send = ((query) => {
      let embed = new EmbedBuilder()
        .setColor(config.color)
        .setDescription(query)

      return message.channel.send({ embeds: [embed] })
    })

    message.error = (async (query) => {
      let embed = new EmbedBuilder()
        .setColor("Red")
        .setDescription(query)
      return message.channel.send({ embeds: [embed] })
    })

    message.success = (async (query) => {
      let embed = new EmbedBuilder()
        .setColor("Blue")
        .setDescription(query)

      return message.channel.send({ embeds: [embed] })
    })

    message.warn = (async (query) => {
      let embed = new EmbedBuilder()
        .setColor("Yellow")
        .setDescription(query)

      return message.channel.send({ embeds: [embed] })
    })



    const client = this.client
    let guild = await Guild.findOne({ guildID: message.guild.id }) || new Guild({ guildID: message.guild.id })
    message.guildData = guild
  

    if(message.channel.id === guild.manager.channelID){

      new Player(this.client,message)
      return 
    }

    let prefix = guild.prefix || client.config.prefix;
    //let prefix = client.config.prefix;

    if(message.author.bot) return
    const hellobhai = new RegExp(`^<@!?${client.user.id}>( |)$`);


    if (message.content.match(hellobhai)) {
      let raw = new discord.ActionRowBuilder().addComponents(
        new discord.ButtonBuilder()
            .setStyle(5)
            .setURL(`${client.config.url}premium`)
            .setLabel(`PREMIUM`),
        new discord.ButtonBuilder()
            .setStyle(5)
            .setURL(`https://top.gg/bot/747382802625986630/vote`)
            .setLabel(`VOTE`),   
  )
  
      const embed = new EmbedBuilder()
        .setColor(client.config.color)
        .setTitle(`Settings for this server `)
        .setDescription(`
The prefix is set to \`${prefix}\`
Server Id : ${message.guild.id} `)
      message.channel.send({ embeds: [embed],components:[raw] }).catch(null)
    };





    if (message.author.bot) return;
    if (!message.guild) return;


    const prefixMention = new RegExp(`^<@!?${client.user.id}> `);
    const paras = message.content.match(prefixMention) ? message.content.match(prefixMention)[0] : prefix;


    if (!message.content.startsWith(paras)) return;









    // If message.member is uncached, cache it.
    if (!message.member)
      message.member = await message.guild.fetchMember(message);

    const args = message.content
      .slice(paras.length)
      .trim()
      .split(/ +/g);
    const cmd = args.shift().toLowerCase();

    if (cmd.length === 0) return;

    // Get the command
    let command = client.commands.get(cmd);
    // If none is found, try to find it by alias
    if (!command) command = client.commands.get(client.aliases.get(cmd));

    // If a command is finally found, run the command
    //if (command) command.run(client, message, args);

    if (!command) return;


  /*  if (guild.premium.status && guild.premium.expireAt < Date.now()) {
      guild.premium.expireAt = 0;
      guild.premium.status = false;
      guild.premium.author = null;
      guild.t27 = false;
      guild.autoplay = false;
      guild.color = "#303133";
      guild.image = null;
      await guild.save();
    }
*/

    if (message.channel.type === 0) {

      if (!message.guild.members.cache.get(this.client.user.id)) await message.guild.members.fetch(this.client.user.id);
      if (!message.channel.permissionsFor(client.user.id).toArray().includes("SendMessages")) {
        return;
      }


      if (!message.channel.permissionsFor(client.user.id).toArray().includes("EmbedLinks")) {


        return message.channel.send({ content: 'I need Embed links permissions!' })




      }

      if (!message.guild.members.me.permissions.has(PermissionsBitField.resolve('ViewChannel'))) return;

    }







    let user = await User.findOne({ userID: message.author.id }) || new User({ userID: message.author.id });
    
    message.userData = user;

    if (user.blacklist) {
      return message.error(`You have been blacklisted from bot 
**CONTACT US**
[Support Server](${client.config.support})
Mail us - support@parasdocs.tech
        
        `, message.channel)
    }





    if (command.userPermission) {
      let neededPerms = []
      command.userPermission.forEach(p => {
        if (!message.member.permissions.has(PermissionsBitField.resolve(p))) neededPerms.push("`" + p + "`")
      })
      if (neededPerms.length) return message.error(`You need ${neededPerms.join(", ")} permission(s) to run the command!`);
    }

    
const player = this.client.poru.get(message.guild.id)

    

 
    if (!this.client.config.owner.includes(message.author.id)) {
      if (!client.cooldowns.has(command.name)) {
        client.cooldowns.set(command.name, new discord.Collection());
      }
      const now = Date.now();
      const timestamps = client.cooldowns.get(command.name);
      const cooldownAmount = Math.floor(command.cooldown || 5000);
      if (!timestamps.has(message.author.id)) {
        timestamps.set(message.author.id, now);
        setTimeout(() => timestamps.delete(message.author.id), cooldownAmount);
      }
      else {
        const expirationTime = timestamps.get(message.author.id) + cooldownAmount;
        const timeLeft = (expirationTime - now) / 1000;
        if (now < expirationTime && timeLeft > 0.9) {
          return message.send(`This command is on cooldown for another ${timeLeft.toFixed(1)} `)
        }
        timestamps.set(message.author.id, now);
        setTimeout(() => timestamps.delete(message.author.id), cooldownAmount);
      }
    }
    //  if (!message.channel.permissionsFor(client.user).has("SEND_MESSAGES")) return;

    //if (!message.channel.permissionsFor(client.user).has("EMBED_LINKS")) return;










    if (command) command.run(client, message, args,player);





  }
};