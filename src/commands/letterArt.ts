import { Command } from '../config/Command';
import { Task } from '../config/Task';

let thisCommand: Command = {
	run: async (client, message, args, level) => { },
	conf: {
		enabled: true,
		guildOnly: false,
		aliases: [''],
		permLevel: 0,
	},

	help: {
		name: 'letterArt',
		category: 'User',
		description: 'TIME Bot Letter Art',
		usage: 'letterart',
	},
};

thisCommand.run = async (client, message, args, level) => {

	message.channel.send('```' + client.botInfo.letterArt + '```');
};

export default thisCommand;
