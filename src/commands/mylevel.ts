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
		name: 'mylevel',
		category: 'User',
		description:
			'Tells you your permission level for the current message location.',
		usage: 'mylevel',
	},
};

thisCommand.run = async (client, message, args, level) => {
	let friendly = 'null';
	for (let i = 0; i < client.configLevels.length; i++) {
		if (client.configLevels[i].level == level) {
			friendly = client.configLevels[i].name;
		}
	}
	message.reply(`Your permission level is: Level ${level} - ${friendly}`);
};

export default thisCommand;
