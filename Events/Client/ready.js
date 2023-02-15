const Event = require('../../Structures/Event');

module.exports = class extends Event {

async run() {

this.client.user.setActivity("SENTE A PRESSÃO NENÉM")
this.client.poru.init(this.client)

		console.log([
			`Conectado como ${this.client.user.tag}`,
			`Carregado ${this.client.commands.size} comandos!`,
      `Carregado ${this.client.slash.size} comandos de barra!`,
			
			`Carregado ${this.client.events.size} eventos!`
		].join('\n'));
      
  
}};