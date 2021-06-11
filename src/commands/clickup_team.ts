import { Command } from '../config/Command';
import { Task } from '../config/Task';

let thisCommand: Command = {
	run: async (client, message, args, level) => { },
	conf: {
		enabled: true,
		guildOnly: false,
		aliases: ['subteam', 'team'],
		permLevel: 0,
	},

	help: {
		name: 'clickup_team',
		category: 'ClickUp',
		description: 'Get all ClickUp tasks for subteam.',
		usage: 'clickupTeam <subteam>',
	},
};

thisCommand.run = async (client, message, args, level) => {
	// incorrect parameters
	if (!args[0]) {
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

	interface list {
		name: string;
		id: string;
		tasks: [Task];
	}

	let all: list[] = [];
	let sub: list[] = [];

	for (let i = 0; i < body.lists.length; i++) {
		let tasks = await client.clickup.lists.getTasks(body.lists[i].id, {
			subtasks: true,
		});
		tasks = tasks.body.tasks;
		const reversed = tasks.reverse();
		// let temp = [];
		// for (let i = tasks.length; i >= 0; i--) {
		// 	temp.push(tasks[i]);
		// }
		// tasks = temp;

		// client.logger.log('tasks');
		// client.logger.log(tasks);

		all.push({
			name: body.lists[i].name,
			id: body.lists[i].id,
			tasks: reversed,
		});
	}

	let output = '';
	let listNum = 1;
	all.forEach((list) => {
		output += '**List Name : ' + list.name + '  [' + listNum + ']**\n';
		list.tasks.forEach((task) => {
			if (task.parent == null) {
				output += ` ${task.id} : [${task.name}](${task.url})\n`;
			} else {
				output += ` |- ${task.id} : [${task.name}](${task.url})\n`;
			}
		});
		output += '\n';
		listNum++;
	});

	try {
		// client.logger.log(out);

		const exampleEmbed = {
			color: 0xe7e7e7,
			title: `ClickUp - ${team.name}`,
			description: `Task ID : Task URL \n${output.substring(0, 1990)}`,
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
	/**
	 * -clickup tasks
	 * -clickup
	 * -clickup
	 * -clickup
	 */

	message.channel.stopTyping();
};

export default thisCommand;
