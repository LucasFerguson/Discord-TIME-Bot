import GuideBot from '../ClientClass';
import { subteams as _subteams } from '../database/subteams.json';
import * as fs from 'fs';
import * as Click from 'clickup.js';
// const Click = require('clickup.js');

export default class ClickUp {
	subteams = _subteams;
	client: GuideBot;
	clickup: Click;

	constructor(_client) {
		this.client = _client;
		this.subteams = _subteams; // JSON.parse();
		this.clickup = new Click(this.client.config.clickupToken);

		// console.log(this.subteams);
	}

	getSub(name) {
		// this.subteams.
		// return
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
	}
}
