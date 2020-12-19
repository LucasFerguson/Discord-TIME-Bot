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
		name: 'clickup_user',
		category: 'ClickUp',
		description: 'Get all ClickUp tasks someone is assigned to.',
		usage: 'clickupGetTasks [User]',
	},
};

thisCommand.run = async (client, message, args, level) => {
	client.clickup.getAllTasks();
};

export default thisCommand;
