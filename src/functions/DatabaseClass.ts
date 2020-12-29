// @ts-nocheck

import GuideBot from '../ClientClass';
import { subteams as _subteams } from '../../../database/subteams.json';
import * as fs from 'fs';

export default class Database {
	subteams = _subteams;
	client: GuideBot;

	constructor(_client) {
		this.client = _client;
		this.subteams = _subteams; // JSON.parse();
		// console.log(this.subteams);
	}

	getSub(_name: string) {
		// this.subteams.
		// return
		for (let i = 0; i < this.subteams.length; i++) {
			if (
				this.subteams[i].name.toLowerCase().replace(' ', '') ==
				_name.toLowerCase()
			) {
				return this.subteams[i];
			}
		}
	}

	addUser() {}

	update() {
		let serverid = '480598748074868768'; // CHANGE CHANGE CHANGE CHANGE

		let userlist = [];
		console.log(`Logged in as ${this.client.user.tag}!`);
		// Get the Guild and store it under the variable "list"
		const guild = this.client.guilds.cache.get(serverid);

		// Iterate through the collection of GuildMembers from the Guild getting the username property of each member
		// guild.members.members.cache.forEach((member) =>
		// 	console.log('member = ' + member.user.username)
		// );
		guild.members
			.fetch()
			.then((user) => {
				console.log(
					user.forEach((u) => {
						if (!u.user.bot) {
							userlist.push(u);
						}
					})
				);
			})
			.then(() => {
				// console.log(userlist);
				// fs.writeFile("./file.json", userlist).catch(console.error);

				let userData = [];

				userlist.forEach((u) => {
					// console.log(u.displayName);
					userData.push({
						displayName: u.displayName,
						id: u.id,
						email: '',
					});
				});

				let json = JSON.stringify(userData);

				// console.log(json);

				fs.writeFile('./src/database/users.json', json, function (err) {
					if (err) return console.log(err);
					console.log('userlist > file.json');
				});
			})
			.catch(console.error);

		// console.log(userlist);
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
