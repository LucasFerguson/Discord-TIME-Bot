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
		usage: 'clickup ',
	},
};

thisCommand.run = async (client, message, args, level) => {
	message.channel.send(`ClickUp`);

	if (!message.guild) {
		// Get Users Tasks
		console.log('not message.guild');
		let cmd = client.getCommand('clickupUser');
		cmd.run(client, message, [message.author.id], level);
	} else if (message.guild) {
		console.log('message.guild' + message.channel.id);
	}

	/**
	 * -clickup tasks
	 * -clickup
	 * -clickup
	 * -clickup
	 */
};

export default thisCommand;
