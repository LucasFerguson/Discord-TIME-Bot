import GuideBot from '../ClientClass';
// import { subteams as _subteams } from '../../../database/subteams.json';
// import * as fs from 'fs';

export default class Database {
	client: GuideBot;

	constructor(_client) {
		this.client = _client;

		// console.log(this.subteams);
	}

	async init() {
		this.client.logger.log('Database Ready');
	}
}

// client.on('ready', () => {
// 	console.log(`Logged in as ${client.user.tag}!`);
// 	// Get the Guild and store it under the variable "list"
// 	const guild = client.guilds.cache.get(serverid);

// 	// Iterate through the collection of GuildMembers from the Guild getting the username property of each member
// 	// guild.members..members.cache.forEach((member) =>
// 	// 	console.log("member = " + member.user.username)
// 	// );
// 	guild.members
// 		.fetch()
// 		.then((user) => {
// 			console.log(
// 				user.forEach((u) => {
// 					if (!u.user.bot) {
// 						userlist.push(u);
// 					}
// 				})
// 			);
// 		})
// 		.then(() => {
// 			// console.log(userlist);
// 			// fs.writeFile("./file.json", userlist).catch(console.error);

// 			let userData = [];

// 			userlist.forEach((u) => {
// 				console.log(u.displayName);
// 				userData.push({ displayName: u.displayName, id: u.id });
// 			});

// 			let json = JSON.stringify(userData);

// 			console.log(json);

// 			fs.writeFile('./src/storage/file.json', json, function (err) {
// 				if (err) return console.log(err);
// 				console.log('userlist > file.json');
// 			});
// 		})
// 		.catch(console.error);

// 	console.log(userlist);
// });
