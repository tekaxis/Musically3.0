const PoruEvent = require('../Structures/PoruEvent');

module.exports = class extends PoruEvent {

    async run(client,node) {

    client.logger.log(`${node.name} esta conectado!`)    
}}