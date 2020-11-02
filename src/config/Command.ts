import * as Discord from 'discord.js';

import GuideBot from '../ClientClass';

export interface Command {
	run: {
		(
			client: GuideBot,
			message: Discord.Message,
			args: string[],
			level: number
		): Promise<void>;
	};
	conf: {
		enabled: boolean;
		guildOnly: boolean;
		aliases: string[]; //['h', 'help'];
		permLevel: number;
	};

	help: {
		name: string; // 'help';
		category: string; // 'Miscelaneous';
		description: string; // 'Displays all the available commands for your permission level.';
		usage: string; // 'help [command]';
	};
}

let a: Command;
