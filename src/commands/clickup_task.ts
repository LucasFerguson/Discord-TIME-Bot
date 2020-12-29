import { Command } from '../config/Command';
import { Task } from '../config/Task';

let thisCommand: Command = {
	run: async (client, message, args, level) => {},
	conf: {
		enabled: true,
		guildOnly: false,
		aliases: ['clickup_task'],
		permLevel: 0,
	},

	help: {
		name: 'clickup_task',
		category: 'ClickUp',
		description: 'Get task with id.',
		usage: 'clickup task <task id>',
	},
};

thisCommand.run = async (client, message, args, level) => {
	// incorrect parameters
	if (args.length == 1) {
	} else {
		message.channel.send('incorrect parameters');
		let help = client.getCommand('h');
		help.run(client, message, ['clickup_task'], level);
		return;
	}

	message.channel.startTyping();

	let taskID = args[0];
	let get = await client.clickup.tasks.get(taskID, {});

	let task: Task = get.body;

	let output = '';
	output += `task.folder.name = ${task.folder.name} : ID ${task.folder.id}\n`;
	output += `task.list.name = ${task.list.name} : ID ${task.list.id}\n`;
	output += `task.url = ${task.url}\n`;
	output += `\n`;
	output += `task.status.status = ${task.status.status}\n`;
	output += `task.status.color = ${task.status.color}\n`;
	console.log(task.status.color.substring(1));

	const exampleEmbed = {
		color: `0x${task.status.color.substring(1)}`,
		title: `Name: ${task.name} (${task.id})`,
		description: `${output}`,
		// footer: {
		// 	text: `${page + 1}/2`,
		// },
	};
	message.channel.send({ embed: exampleEmbed });
	message.channel.stopTyping();
};

export default thisCommand;
