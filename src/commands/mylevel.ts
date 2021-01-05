import { Command } from '../config/Command';

let thisCommand: Command = {
	run: async (client, message, args, level) => {},
	conf: {
		enabled: true,
		guildOnly: false,
		aliases: ['level'],
		permLevel: 0,
	},

	help: {
		name: 'mylevel',
		category: 'User',
		description: 'Your permission level for the server.',
		usage: 'mylevel',
	},
};

thisCommand.run = async (client, message, args, level) => {
	let nameOfLevel = 'null';
	for (let i = 0; i < client.configLevels.length; i++) {
		if (client.configLevels[i].level == level) {
			nameOfLevel = client.configLevels[i].name;
		}
	}
	message.reply(`Your permission level is: Level ${level} - ${nameOfLevel}`);
};

export default thisCommand;
