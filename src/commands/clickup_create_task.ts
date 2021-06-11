import { Command } from '../config/Command';
import { Task } from '../config/Task';

let thisCommand: Command = {
	run: async (client, message, args, level) => { },
	conf: {
		enabled: true,
		guildOnly: false,
		aliases: ['taskcreate', 'createtask'],
		permLevel: 0,
	},

	help: {
		name: 'clickup_create_task',
		category: 'ClickUp',
		description: 'Create task.',
		usage: 'createtask <subteam name> <list number> <task name>',
	},
};

thisCommand.run = async (client, message, args, level) => {
	// incorrect parameters

	if (!args[0] || !args[1] || !args[2]) {
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
		message.channel.send('Incorrect Parameters. ' + thisCommand.help.usage);

		message.channel.send({ embed: exampleEmbed });

		return;
	}
	//correct parameters

	message.channel.startTyping();

	let subteamName = '' + args[0];
	let listNumber = Number.parseInt(args[1]);
	let taskName = '';
	for (let i = 2; i < args.length; i++) {
		taskName += args[i] + " ";
	}

	// get database data
	let team = await client.database.getSubteam(subteamName);
	if (team == null) {
		message.channel.send('Error: Unknown Subteam');
		return;
	}
	let body = await client.clickup.folders.getLists(team.id.clickup);
	body = body.body;

	interface list {
		name: string;
		id: string;
	}

	let allSubteamLists: list[] = [];

	for (let i = 0; i < body.lists.length; i++) {
		allSubteamLists.push({
			name: body.lists[i].name,
			id: body.lists[i].id,
		});
	}

	let response = await client.clickup.lists.createTask(allSubteamLists[listNumber - 1].id, { "name": taskName });

	if (response.statusCode == 200) {
		message.channel.send("```New Task Created!\n Task Name: \"" + taskName + "\" List: \"" + allSubteamLists[listNumber - 1].name + "\"```");
	} else {
		message.channel.send("```Error: Could not create new task. statusCode = " + response.statusCode + "```");
	}

	message.channel.stopTyping();
};

export default thisCommand;
