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
		name: 'null',
		category: 'System',
		description: 'null',
		usage: 'null',
	},
};

thisCommand.run = async (client, message, args, level) => {
	let r = await message.channel.send(
		`Command ${message.content} not found. 3`
	);
	if (message.guild) {
		setTimeout(() => {
			r.edit(`Command ${message.content} not found. 2`);
		}, 2000);
		setTimeout(() => {
			r.edit(`Command ${message.content} not found. 1`);
		}, 4000);
		setTimeout(() => {
			r.delete();
			// message.delete();
		}, 6000);
	}
};

export default thisCommand;
