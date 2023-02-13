const Command = require('../../Structures/Command');
const discord = require("discord.js")
module.exports = class extends Command {

	constructor(...args) {
		super(...args, {
			aliases: ['eval'],
			description: 'eval command',
			category: 'Utilities'
		});
	}

	async run(client,message,args,player) {
 if(!client.config.owner.includes(message.author.id)) return
      const content = message.content
        .split(" ")
        .slice(1)
        .join(" ");
      const result = new Promise(resolve => resolve(eval(content)));

      return result
        .then(output => {
          if (typeof output !== "string") {
            output = require("util").inspect(output, { depth: 0 });
          }
          if (output.includes(this.client.token)) {
            output = output.replace(
              this.client.token,
              "NDFJSFJKDNMKDMJKADNJSDNJSDNJKSDFKSDJOKAdmksdmksdmksmdksmdk"
            );
          }
          message.channel.send(`\`\`\`js\n${output}\n\`\`\``);
        })
        .catch(err => {
          err = err.toString();
          if (err.includes(this.client.token)) {
            err = err.replace(this.client.token, "ABE SALE");
          }
          message.channel.send(`\`\`\`js\n${err}\n\`\`\``);
        });
    
}};