import { Command } from '../config/Command';

let thisCommand: Command = {
	run: async (client, message, args, level) => {},
	conf: {
		enabled: true,
		guildOnly: false,
		aliases: ['User'],
		permLevel: 0,
	},

	help: {
		name: 'clickupUser',
		category: 'ClickUp',
		description: 'Get all ClickUp tasks someone is assigned to.',
		usage: 'clickupGetTasks [User]',
	},
};

thisCommand.run = async (client, message, args, level) => {
	client.clickup.getAllTasks();

	return;
	try {
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
		client.logger.log(all[0].tasks[0]);
		// }

		let output = '';
		all.forEach((list) => {
			output += '**List Name : ' + list.name + '**\n';
			// client.logger.log();
			list.tasks.forEach((task) => {
				output += `TASK : [${task.name}](${task.url})\n`;
			});
			output += '\n';
		});

		// client.logger.log(out);

		const exampleEmbed = {
			color: 0xe7e7e7,
			title: `ClickUp - ${team.name}`,
			description: `${output}`,
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
		if (error.response) {
			// The request was made and the server responded with a status code
			// that falls out of the range of 2xx
			client.logger.log(error.response.body);
			client.logger.log(error.response.statusCode);
			client.logger.log(error.response.headers);
		} else if (error.request) {
			// The request was made but no response was received
			client.logger.log(error.request);
		} else {
			// Something happened in setting up the request that triggered an Error
			console.log('Error', error.message);
		}
		client.logger.log(error.options);
	}
};

export default thisCommand;
