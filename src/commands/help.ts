/*
The HELP command is used to display every command's name and description
to the user, so that he may see what commands are available. The help
command is also filtered by level, so if a user does not have access to
a command, it is not shown to them. If a command name is given with the
help command, its extended help is shown.
*/
let { GuideBot } = require('../ClientClass.js');
import * as Discord from 'discord.js';

/**
 * @param { GuideBot } client
 * @param { Discord.Message } message
 */
exports.run = (client, message, args, level) => {
	// If no specific command is called, show all filtered commands.

	client.commands;

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

	if (!args[0]) {
		const myCommands = client.commands;

		let longest = 0;
		client.commands.forEach((c) => {
			let a = c.help.name.length;
			if (a > longest) {
				longest = a;
			}
		});
		let currentCategory = '';
		let output = `= Command List =\n\n[Use ${client.config.defaultSettings.prefix}help <commandname> for details]\n`;
		const sorted = myCommands.sort((p, c) =>
			p.help.category > c.help.category
				? 1
				: p.help.name > c.help.name &&
				  p.help.category === c.help.category
				? 1
				: -1
		);
		sorted.forEach((c) => {
			const cat = c.help.category;
			if (currentCategory !== cat) {
				output += `\u200b\n== ${cat} ==\n`;
				currentCategory = cat;
			}
			output += `${client.config.defaultSettings.prefix}${
				c.help.name
			}${' '.repeat(longest - c.help.name.length)} :: ${
				c.help.description
			}\n`;
		});
		message.channel.send(output, {
			code: 'asciidoc',
			split: { char: '\u200b' },
		});
	} else {
		// Show individual command's help.

		let command = client.getCommand(args[0]);
		message.channel.send(
			`= ${command.help.name} = \n${command.help.description}\nusage:: ${
				command.help.usage
			}\naliases:: ${command.conf.aliases.join(', ')}\n= ${
				command.help.name
			} =`,
			{ code: 'asciidoc' }
		);

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

exports.conf = {
	enabled: true,
	guildOnly: false,
	aliases: ['h', 'help'],
	permLevel: 0,
};

exports.help = {
	name: 'help',
	category: 'Miscelaneous',
	description:
		'Displays all the available commands for your permission level.',
	usage: 'help [command]',
};
