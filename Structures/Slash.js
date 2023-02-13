module.exports = class Slash {

	constructor(client, name, options = {}) {
		this.client = client;
		this.name = options.name || name;
		this.description = options.description || 'No description provided.';
        this.userPermission = options.userPermission || [];
        this.botPermissions = options.botPermission || [];
 		this.category = options.category || 'Miscellaneous';
	
  }

 get interactionData() {
        return { name: this.name, description: this.description, options: this.options };
    }

	async run(interaction) {
		throw new Error(`Command ${this.name} doesn't provide a run method!`);
	}

};