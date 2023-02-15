const Command = require('../../Structures/Command');
const discord = require("discord.js")
const Guild = require("../../models/Guild");

module.exports = class extends Command {

    constructor(...args) {
        super(...args, {
            name: "help",
            aliases:['h'],
            description : `
            Mostra o menu de ajuda.           
            `
        });
    }

    async run(client, message,args) {


if(args[0]){



    let command = client.commands.get(args[0]) || client.commands.get(client.aliases.get(args[0]));


    if(command){

        

        let embed = new discord.EmbedBuilder()
        .setColor("Blue")
        .setAuthor({name:`Ajuda: ${command.name}`,iconURL:client.user.displayAvatarURL()})  
        .setDescription(`
Comandos alternativos: \`${command.aliases}\`
${command.description}

`)


        return message.channel.send({embeds:[embed]});
    





    }











}




        const guild = await Guild.findOne({guildID:message.guild.id}) || new Guild({guildID: message.guild.id})


            let embed = new discord.EmbedBuilder()
                .setColor("Blue")
                .setAuthor({name:"Help Command",iconURL:client.user.displayAvatarURL()})  
                .setDescription(`
                **Everyone commands**
                \`help\`, \`ping\`, \`play\`, \`queue\`, \`songinfo\`
                
                **DJ commands**
                \`clear\`, \`leave\`, \`loop\`, \`move\`, \`pause\`, \`remove\`, \`replay\`, \`resume\`, \`seek\`, \`shuffle\`, \`skip\`, \`stop\`
                            
                **Admin commands**
                \`announce\`, \`ban\`, \`cleanup\`, \`fix\`, \`language\`, \`limit\`, \`playlists\`, \`prefix\`, \`requester\`, \`setdj\`, \`setup\`, \`setvc\`, \`unban\`
                          
                **Premium commands**
                \`24/7\`, \`autoplay\`, \`bassboost\`, \`demon\`, \`filter\`, \`nightcore\`, \`speed\`, \`vaporwave\`, \`volume\`
                               
                **Web Dashboard**
                View commands | Configure settings
                                
                `)


                return message.channel.send({embeds:[embed]});
            
            
    }
}