import { Command } from '../config/Command';
import { Task } from '../config/Task';

let thisCommand: Command = {
	run: async (client, message, args, level) => {},
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
		usage: 'clickupTeam [subteam]',
	},
};

thisCommand.run = async (client, message, args, level) => {
	message.channel.startTyping();

	if (!args[0]) {
		let output = '';

		client.database.subteams.forEach((team) => {
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

	try {
		// get a specific task
		// const { body } = await clickup.lists.getTasks("48453100"); // frputk https://app.clickup.com/2293969/v/f/18948674/6345890
		let teamName = '';
		args.forEach((s) => {
			teamName += s;
		});

		let team = client.database.getSub(teamName);
		console.log('team ' + team);
		let body = await client.clickup.folders.getLists(team.clickup.id); // frputk https://app.clickup.com/2293969/v/f/18948674/6345890

		body = body.body;

		// interface task {
		// 	name: string;
		// }

		interface list {
			name: string;
			id: string;
			tasks: [Task];
		}

		let all: list[] = [];

		for (let i = 0; i < body.lists.length; i++) {
			let tasks = await client.clickup.lists.getTasks(body.lists[i].id);
			tasks = tasks.body.tasks;

			all.push({
				name: body.lists[i].name,
				id: body.lists[i].id,
				tasks: tasks,
			});
		}

		// for (let i = 0; i < all[1].tasks.length; i++) {
		// 	// const element = all[i];
		// client.logger.log(all[0].tasks[0]);
		// }

		let output = '';
		all.forEach((list) => {
			output += '**List Name : ' + list.name + '**\n';
			// client.logger.log();
			list.tasks.forEach((task) => {
				output += ` ${task.id} : [${task.name}](${task.url})\n`;
			});
			output += '\n';
		});

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
		// if (error.response) {
		// 	// The request was made and the server responded with a status code
		// 	// that falls out of the range of 2xx
		// 	client.logger.log(error.response.body);
		// 	client.logger.log(error.response.statusCode);
		// 	client.logger.log(error.response.headers);
		// } else if (error.request) {
		// 	// The request was made but no response was received
		// 	client.logger.log(error.request);
		// } else {
		// 	// Something happened in setting up the request that triggered an Error
		// 	console.log('Error', error.message);
		// }
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
