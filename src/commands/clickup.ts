import { Command } from '../config/Command';

let thisCommand: Command = {
	run: async (client, message, args, level) => {},
	conf: {
		enabled: true,
		guildOnly: false,
		aliases: [],
		permLevel: 0,
	},

	help: {
		name: 'clickup',
		category: 'User',
		description: 'Get all ClickUp tasks someone is assigned to.',
		usage: 'clickup [User]',
	},
};

thisCommand.run = async (client, message, args, level) => {
	message.channel.send(`ClickUp`);
};

export default thisCommand;
