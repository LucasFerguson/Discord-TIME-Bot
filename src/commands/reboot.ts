import { Command } from '../config/Command';

let thisCommand: Command = {
	run: async (client, message, args, level) => {},
	conf: {
		enabled: true,
		guildOnly: false,
		aliases: [],
		permLevel: 10,
	},

	help: {
		name: 'reboot',
		category: 'System',
		description:
			'Shuts down the bot. If running under PM2, bot will restart automatically.',
		usage: 'reboot',
	},
};

thisCommand.run = async (client, message, args, level) => {
	// eslint-disable-line no-unused-vars
	await message.reply('Bot is shutting down.');
	// await Promise.all(client.commands.map((cmd) => client.unloadCommand(cmd)));
	process.exit(0);
};

export default thisCommand;
