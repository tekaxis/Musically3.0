const PoruEvent = require('../Structures/PoruEvent');
const discord = require("discord.js");
const Guild = require("../models/Guild")
module.exports = class extends PoruEvent {

    async run(client, player, track) {


        

        return client.helper.reset(client,player)

    }}