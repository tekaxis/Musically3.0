const Command = require('../../Structures/Command');
const discord = require("discord.js")
const prettyMilliseconds = require('pretty-ms');

function millisToDuration(ms) {
    return prettyMilliseconds(ms, { colonNotation: true, secondsDecimalDigits: 0 });
}
function durationToMillis(dur) {
    return dur.split(':').map(Number).reduce((acc, curr) => curr + acc * 60) * 1000;
}

function progress(current, total, size = 11) {
    const percent = current / total * size;
    const progbar = new Array(size).fill('▬');
    progbar[Math.round(percent)] = ':radio_button:';
    return {
        bar: progbar.join(''),
        percent
    };
} 
module.exports = class extends Command {

    constructor(...args) {
        super(...args, {
            name: "songinfo",
            aliases: ["si", "np", "song", "nowplaying"],
            description: `.songinfo
            Vartamaan mein chalae ja rahe geet ka vivaran dikhaata hai.
            [Everyone]
            ​
            .songinfo <song number>
            Kataar mein ek vishisht geet ka vivaran dikhaata hai.`,
            category: 'MUSIC'
        });
    }

    async run(client, message, args, player) {




if(!args[[0]]){

    let song = player.currentTrack;

   let process = progress(player.position,player.currentTrack.info.length);

    let embed = new discord.EmbedBuilder()
    .setColor("Blue")
    .setTitle(`${song.info.author} - ${song.info.title}`)
    .setDescription(`
    ~ Requested by ${song.info.requester}
    
${process.bar}
[${millisToDuration(player.position)}/${millisToDuration(player.currentTrack.info.length)}]
    `)


    return message.channel.send({embeds:[embed]})
}



    }}