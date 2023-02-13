const { Signale } = require('signale');

module.exports = class Logger extends Signale {
	constructor(config, client) {
		super({
			config: config,
			types: {
				ready: {
					badge: '✅',
					color: 'green',
					label: '[INFO]',
					logLevel: 'info',
				},
				error: {
					badge: '🔴',
					color: 'red',
					label: '[Error]',
					logLevel: 'info',
				},
				
			},
		});
	}
};