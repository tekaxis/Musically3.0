const Event = require('../../Structures/Event');

module.exports = class extends Event {

async run() {

this.client.user.setActivity("PARAS DOCS")
this.client.poru.init(this.client)

		console.log([
			`Logged in as ${this.client.user.tag}`,
			`Loaded ${this.client.commands.size} commands!`,
      `Loaded ${this.client.slash.size} slash commands!`,
			
			`Loaded ${this.client.events.size} events!`
		].join('\n'));
      
  
}};