import { Command } from '../config/Command';

let thisCommand: Command = {
	run: async (client, message, args, level) => {},
	conf: {
		enabled: true,
		guildOnly: false,
		aliases: ['User'],
		permLevel: 0,
	},

	help: {
		name: 'clickupUser',
		category: 'User',
		description: 'Get all ClickUp tasks someone is assigned to.',
		usage: 'clickupGetTasks [User]',
	},
};

thisCommand.run = async (client, message, args, level) => {
	message.channel.send(`ClickUp`);
	/**
	 * -clickup tasks
	 * -clickup
	 * -clickup
	 * -clickup
	 */
};

export default thisCommand;
