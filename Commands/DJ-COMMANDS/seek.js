const Command = require('../../Structures/Command');
const durationPattern = /^[0-5]?[0-9](:[0-5][0-9]){1,2}$/;
const prettyMilliseconds = require('pretty-ms');

function millisToDuration(ms) {
    return prettyMilliseconds(ms, { colonNotation: true, secondsDecimalDigits: 0 });
}
function durationToMillis(dur) {
    return dur.split(':').map(Number).reduce((acc, curr) => curr + acc * 60) * 1000;
}
module.exports = class extends Command {

    constructor(...args) {
        super(...args, {
            name: "seek",
            description: `
Seeks to a specific position in the current song.
[DJ]`,
        });
    }

    async run(client, message, args, player) {

        let duration = args[0];

        if (!duration) {
            return message.error(`
            Invalid argument provided.
            Have a look at \`.help seek\``)
        }

        if (durationPattern.test(duration)) {

            let durationMs = durationToMillis(duration);
            if (durationMs > player.currentTrack.info.length) durationMs = player.currentTrack.length;
            await player.seekTo(durationMs);

            return message.success(`Seeked to \`${millisToDuration(durationMs)}\``);
        }


        if (isNaN(args[0])) {
            return message.error(`
            Invalid argument provided.
            Have a look at \`.help seek\``)
        }

        duration = player.position + args[0] * 1000;
        if (duration > player.currentTrack.info.length) duration = player.currentTrack.length;
        await player.seekTo(duration);

        return message.success(`Seeked to \`${millisToDuration(duration)}\``);



    }
}