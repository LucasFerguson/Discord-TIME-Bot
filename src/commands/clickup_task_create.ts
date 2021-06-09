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
		name: 'clickup_task_create',
		category: 'ClickUp',
		description: 'Create task.',
		usage: 'clickup team <subteam> <task name>',
	},
};

thisCommand.run = async (client, message, args, level) => {
	// incorrect parameters
	if (!args[0] || !args[1]) {
		let output = '';

		let subteams = await client.database.getAllSubteams();

		subteams.forEach((team) => {
			output += `${team.name}\n`;
		});

		const exampleEmbed = {
			color: 0xe7e7e7,
			title: 'ClickUp - Subteams',
			description: `${output}`,
			// footer: {
			// 	text: `${page + 1}/2`,
			// },
		};
		message.channel.send({ embed: exampleEmbed });

		return;
	}
	//correct parameters

	message.channel.startTyping();

	let teamName = '';
	args.forEach((s) => {
		teamName += s;
	});

	// get database data
	let team = await client.database.getSubteam(teamName);
	let body = await client.clickup.folders.getLists(team.id.clickup);
	body = body.body;


	try {
		// client.logger.log(out);

		const exampleEmbed = {
			color: 0xe7e7e7,
			title: `ClickUp - ${team.name}`,
			description: `Task ID : Task URL \n${output}`,
			// footer: {
			// 	text: `${page + 1}/2`,
			// },
			author: {
				name: `ClickUp - ${team.name}`,
				icon_url:
					'https://clickup.com/landing/images/for-se-page/clickup.png',
			},
		};
		message.channel.send({ embed: exampleEmbed });
	} catch (error) {
		message.channel.send('Team not Found');

		client.logger.log(error);
	}

	message.channel.stopTyping();
};

export default thisCommand;
