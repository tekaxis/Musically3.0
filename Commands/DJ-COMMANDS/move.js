const Command = require('../../Structures/Command');
const discord = require("discord.js")

function moveArrayElement(arr, fromIndex, toIndex) {
    arr.splice(toIndex, 0, arr.splice(fromIndex, 1)[0]);
    return arr;
}

module.exports = class extends Command {

    constructor(...args) {
        super(...args, {
            name: "move",
            aliases: ['mv'],
            description: `
            Move the selected song to the top of the queue.
            [DJ]
            ​
            .move <from> <to>
            Move the selected song to the provided position.
            [DJ]
            ​
            .move swap <from> <to>
            Swap track positions in the queue.
            [DJ]
            ​
            .move last
            Move the last track in the queue to the top.
            [DJ]`,
        });
    }

    async run(client, message, args, player) {



if(args[0].toLowerCase() ==="last"){

let track = player.queue.pop();
player.queue.unshift(track);
return message.react(`👌`);


}else if(args[0].toLowerCase() ==="swap"){


if(!args[1] || isNaN(args[1]) || !args[2] || isNaN(args[2])){

return message.send(`You forgot the track id to move.`);

}

if(args[1] === args[2]){
    return message.error(`
    Invalid argument provided.
    Have a look at \`.help move\``)
}



moveArrayElement(player.queue, args[1] - 1, args[2] - 1);

return message.react(`👌`);



}



        if(!args[0] || isNaN(args[0])){
            return message.send(`You forgot the track id to move.`);
        }

        if(Number(args[0]) === 1){
            return message.error(`Song is already on position 1.`)
        }

        if(args[0] === args[1]){
            return message.error(`
            Invalid argument provided.
            Have a look at \`.help move\``)
        }

        if(args[0] < 1 || args[0] > player.queue.length || args[1] && (args[1] < 1 || args[1] > player.queue.length) ){


            return message.error(`There's no song with index \`${args[0]}\` in the queue.`)


        }
        if(args[0] && !args[1] || args[0] && isNaN(args[1])){


        const moved = player.queue[from - 1];
        delete player.queue[args[0] -1];
        player.queue.unshift(moved);
          return message.react(`👌`);

     }else if(args[0] && args[1]){

        moveArrayElement(player.queue, args[0] - 1, args[1] - 1);

        return message.react(`👌`);

     }


    }}