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
	// await message.reply('Bot is shutting down.');
	// await Promise.all(client.commands.map((cmd) => client.unloadCommand(cmd)));

	let reply = await message.reply(
		'The bot will now shut down.\n' +
			'Confirm with a thumb up or deny with a thumb down.'
	);

	reply.react('👍').then((r) => {
		reply.react('👎');
	});

	// Reacts so the user only have to click the emojis
	// message.react('👍').then((r) => {
	// 	message.react('👎');
	// });

	// First argument is a filter function
	reply
		.awaitReactions(
			(reaction, user) =>
				user.id == message.author.id &&
				(reaction.emoji.name == '👍' || reaction.emoji.name == '👎'),
			{ max: 1, time: 30000 }
		)
		.then((collected) => {
			if (collected.first().emoji.name == '👍') {
				message.reply('Shutting down...').then(() => {
					collected.first().users.remove(message.author.id);
					process.exit();
				});
			} else message.reply('Operation canceled.');
		})
		.catch(() => {
			message.reply('No reaction after 30 seconds, operation canceled');
		});
};

export default thisCommand;
