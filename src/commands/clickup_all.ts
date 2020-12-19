import { Command } from '../config/Command';
import { Folder } from '../config/Folder';

let thisCommand: Command = {
	run: async (client, message, args, level) => {},
	conf: {
		enabled: true,
		guildOnly: false,
		aliases: ['User'],
		permLevel: 0,
	},

	help: {
		name: 'clickup_all',
		category: 'ClickUp',
		description: 'Do not Run.',
		usage: 'clickupALL',
	},
};

thisCommand.run = async (client, message, args, level) => {
	message.channel.startTyping();

	let get = await client.clickup.spaces.getFolders('1280032');
	let folders: Folder[] = get.body.folders;

	// console.log(folders[0].lists[0].name);

	// folders.forEach((folder) => {
	// 	folder.lists.forEach((list) => {
	// 		console.log(list.id);
	// 		let gettasks = await this.lists.getTasks('1280032');
	// 	});
	// });
	let num = 0;
	let returnString = '';

	for (const folder of folders) {
		returnString += `*FOLDER NAME* : **${folder.name}** ${folder.id} \n`;

		for (const list of folder.lists) {
			// let gettasks = await client.clickup.lists.getTasks(list.id);
			returnString += `--*LIST* : **${list.name}** ${list.id} \n`;

			// let tasks: Task[] = gettasks.body.tasks;
			// for (const task of tasks) {
			// 	num++;
			// 	returnString += `			${num} TASK NAME ${task.name}  \n`;

			// 	// break;
			// }
		}
	}
	console.log(returnString);

	// let output = await client.clickup.getAllTasks();
	const exampleEmbed = {
		color: 0xe7e7e7,
		title: 'ClickUp - All',
		description: `${returnString}`,
		// footer: {
		// 	text: `${page + 1}/2`,
		// },
	};
	// console.log(returnString);
	message.channel.send({ embed: exampleEmbed });
	message.channel.stopTyping();
};

export default thisCommand;
