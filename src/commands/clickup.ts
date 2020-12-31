import { Command } from '../config/Command';

let thisCommand: Command = {
	run: async (client, message, args, level) => {},
	conf: {
		enabled: true,
		guildOnly: false,
		aliases: ['cu'],
		permLevel: 0,
	},

	help: {
		name: 'clickup',
		category: 'ClickUp',
		description: 'ClickUp',
		usage: 'clickup',
	},
};

thisCommand.run = async (client, message, args, level) => {
	// client.logger.log('Run Smart Command');
	let cmd = client.getCommand('clickup_' + args.shift());
	if (cmd.help.name == 'null') {
		let helpCommand = client.getCommand('help');
		helpCommand.run(client, message, ['ClickUp'], level);
	} else {
		cmd.run(client, message, args, level);
	}

	/**
	 * -clickup all
	 * -clickup task
	 * -clickup team
	 * -clickup user
	 */
};

export default thisCommand;
