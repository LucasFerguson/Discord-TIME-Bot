/*
Reloads a command that\"s been modified
*/
import { Message } from 'discord.js';
import GuideBot from '../ClientClass';
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
		name: 'commandReload',
		category: 'System',
		description: 'Reloads a command thats been modified.',
		usage: 'commandReload <command>',
	},
};

thisCommand.run = async (client, message, args, level) => {
	if (args[0]) {
	} else {
		message.channel.send(
			`The command [] doesn't seem to exist, nor is it an alias. Try again!`
		);
		return;
	}

	let command = client.getCommand(args[0]);

	if (command.help.name == 'null') {
		message.channel.send(
			`The command [${args[0]}] doesn't seem to exist, nor is it an alias. Try again!`
		);
		return;
	}

	client.unloadCommand(args[0]);

	client.loadCommand(command.help.name);
};

export default thisCommand;
