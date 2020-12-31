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
		name: 'ping',
		category: 'System',
		description:
			'Test the latency from the Server to the Discord API. Ping Pong. 🏓 ',
		usage: 'ping',
	},
};

thisCommand.run = async (client, message, args, level) => {
	// eslint-disable-line no-unused-vars
	let now = Date.now();
	const msg = await message.channel.send('Ping?');
	msg.edit(
		`Pong! Bot Latency is [${
			msg.createdTimestamp - message.createdTimestamp
		} ms]. API Latency is [${Math.round(client.ws.ping)} ms]`
	);
};

export default thisCommand;
