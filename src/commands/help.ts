/*
The HELP command is used to display every command's name and description
to the user, so that he may see what commands are available. The help
command is also filtered by level, so if a user does not have access to
a command, it is not shown to them. If a command name is given with the
help command, its extended help is shown.
*/
import { Message } from 'discord.js';
import GuideBot from '../ClientClass';
import { Command } from '../config/Command';

let thisCommand: Command = {
	run: async (client, message, args, level) => {},
	conf: {
		enabled: true,
		guildOnly: false,
		aliases: ['h', 'help'],
		permLevel: 0,
	},

	help: {
		name: 'help',
		category: 'User',
		description:
			'Displays all the available commands for your permission level.',
		usage: 'help <command>',
	},
};

thisCommand.run = async (client, message, args, level) => {
	// If no specific command is called, show all filtered commands.

	// if (!args[0]) {
	// 	// Filter all commands by which are available for the user's level, using the <Collection>.filter() method.
	// 	const myCommands = message.guild
	// 		? client.commands.filter(
	// 				(cmd) => client.levelCache[cmd.conf.permLevel] <= level
	// 		  )
	// 		: client.commands.filter(
	// 				(cmd) =>
	// 					client.levelCache[cmd.conf.permLevel] <= level &&
	// 					cmd.conf.guildOnly !== true
	// 		  );

	// 	// Here we have to get the command names only, and we use that array to get the longest name.
	// 	// This make the help commands "aligned" in the output.
	// const commandNames = myCommands.keyArray();
	// const longest = commandNames.reduce(
	// 	(long, str) => Math.max(long, str.length),
	// 	0
	// 	);

	let responseMessage = '';

	let categories = [
		{ name: 'User', arr: [], page: 0 },
		{ name: 'ClickUp', arr: [], page: 0 },
		{ name: 'System', arr: [], page: 1 },
	];

	client.commands.forEach((c) => {
		for (let i = 0; i < categories.length; i++) {
			if (categories[i].name == c.help.category) {
				categories[i].arr.push(c);
			}
		}
	});
	let page = 0;

	if (!args[0]) {
		// message.channel.send(output);

		// const exampleEmbed = {
		// 	color: 0xf6b436,
		// 	title: 'Help Command',
		// 	description: `${output}`,
		// 	footer: {
		// 		text: '1/4',
		// 	},
		// };

		let botMessage = await message.channel.send({
			embed: getpage(client, 0, categories),
		});

		await botMessage.react('◀️');
		await botMessage.react('▶️');
		// await botMessage.react('🔢');
		await botMessage.react('❌');

		let r1 = client.addReactionsListener(
			botMessage,
			'▶️',
			(reaction, user) => {
				botMessage.edit({ embed: getpage(client, 1, categories) });
				if (message.guild) {
					reaction.users.remove(user.id);
				}
			}
		);

		let r2 = client.addReactionsListener(
			botMessage,
			'◀️',
			(reaction, user) => {
				botMessage.edit({ embed: getpage(client, 0, categories) });
				if (message.guild) {
					reaction.users.remove(user.id);
				}
			}
		);

		let r3 = client.addReactionsListener(
			botMessage,
			'❌',
			(reaction, user) => {
				r1.removeAllListeners();
				r2.removeAllListeners();
				r3.removeAllListeners();
				try {
					botMessage.delete();
				} catch (e) {}

				if (message.guild) {
					try {
						message.delete();
					} catch (e) {}
				}
			}
		);

		// botMessage
		// 	.awaitReactions(
		// 		(reaction, user) =>
		// 			user.id == message.author.id &&
		// 			(reaction.emoji.name == '◀️' ||
		// 				reaction.emoji.name == '▶️'),
		// 		{ max: 1, time: 30000 }
		// 	)
		// 	.then((collected) => {
		// 		if (collected.first().emoji.name == '▶️') {
		// 			collected.first().users.remove(message.author.id);
		// 			botMessage.edit({ embed: getpage(client, 1, categorys) });
		// 		}

		// 		if (collected.first().emoji.name == '◀️') {
		// 			collected.first().users.remove(message.author.id);
		// 			botMessage.edit({ embed: getpage(client, 0, categorys) });
		// 		}
		// 	})
		// 	.catch(() => {
		// 		client.logger.log(
		// 			'No reaction after 30 seconds, operation canceled'
		// 		);
		// 	});
	} else {
		// Show individual command's help.

		// try {
		// } catch (e) {

		// }

		let isCommand = true;

		for (let i = 0; i < categories.length; i++) {
			if (args[0].toLowerCase() == categories[i].name.toLowerCase()) {
				isCommand = false;
				client.logger.log('category ' + categories[i].name);

				let output = `\nUse ${client.config.defaultSettings.prefix}help <commandname> for details ***-help ping***`;
				output += `\nUse ${client.config.defaultSettings.prefix}help <command category> ***-help ClickUp***\n`;

				output += `\n**== __${categories[i].name} Commands__ ==**\n`;
				categories[i].arr.forEach((c) => {
					output += `***${client.config.defaultSettings.prefix}${c.help.name}*** : \`${c.help.description}\`\n`;
				});

				const exampleEmbed = {
					color: 0xe7e7e7,
					author: {
						name: `${categories[i].name} Commands`,
						icon_url: '',
					},

					description: `${output}`,
					footer: {
						text: `${page + 1}/1`,
					},
				};

				if (categories[i].name == 'ClickUp') {
					exampleEmbed.author.icon_url =
						'https://clickup.com/landing/images/for-se-page/clickup.png';
				}

				message.channel.send({
					embed: exampleEmbed,
				});
			}
		}

		if (isCommand) {
			let command = client.getCommand(args[0]);

			if (command) {
				let output = `${command.help.description}\n**Usage** : ${
					command.help.usage
				}\n**Aliases** : ${command.conf.aliases.join(', ')}`;
				const exampleEmbed = {
					color: 0xf6b436,
					title: `${client.config.defaultSettings.prefix}${command.help.name}`,
					description: `${output}`,
				};

				let botMessage = await message.channel.send({
					embed: exampleEmbed,
				});
			} else {
				message.channel.send(`${args[0]}, is not Found.`);
			}
		}

		// if (client.commands.has(command)) {
		// 	command = client.commands.get(command);
		// 	if (level < client.levelCache[command.conf.permLevel]) return;
		// 	message.channel.send(
		// 		`= ${command.help.name} = \n${
		// 			command.help.description
		// 		}\nusage:: ${
		// 			command.help.usage
		// 		}\naliases:: ${command.conf.aliases.join(", ")}\n= ${
		// 			command.help.name
		// 		} =`,
		// 		{ code: "asciidoc" }
		// 	);
		// }
	}
};

export default thisCommand;

function getpage(client: GuideBot, page: number, categories) {
	let output = `\nUse ${client.config.defaultSettings.prefix}help <commandname> for details ***-help ping***`;
	output += `\nUse ${client.config.defaultSettings.prefix}help <command category> ***-help ClickUp***\n`;

	categories.forEach((cat) => {
		if (cat.page != page) return;
		output += `\n**== __${cat.name} Commands__ ==**\n`;
		cat.arr.forEach((c) => {
			output += `***${client.config.defaultSettings.prefix}${c.help.name}*** : \`${c.help.description}\`\n`;
		});
	});

	const exampleEmbed = {
		color: 0xf6b436,
		title: 'Help Command',
		description: `${output}`,
		footer: {
			text: `${page + 1}/2`,
		},
	};
	// message.edit({ embed: exampleEmbed });

	return exampleEmbed;
}
