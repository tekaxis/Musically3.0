module.exports = class PoruEvent {

	constructor(client, name, options = {}) {
		this.name =  options.name || name;
		this.client = client;
		this.type = options.once ? 'once' : 'on';
		this.emitter =  client.poru;
	}

	async run(...args) {
		throw new Error(`The run method has not been implemented in ${this.name}`);
	}

};