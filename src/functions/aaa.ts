// const Clickup = require('clickup.js');
// import ClickUp from './ClickUp';
// import config from '../config';

// const clickup = new ClickUp(config.clickupToken);

// import GuideBot from '../ClientClass';
// import { subteams as _subteams } from '../database/subteams.json';
// import * as fs from 'fs';
// // import ClickUp from 'clickup.js';
// // const ClickUp = require('clickup.js');
// const Clickup = require('clickup.js');
// const clickup = new Clickup('token');

// export default class ClickUpClass {
// 	subteams = _subteams;
// 	client: GuideBot;
// 	clickup: ClickUp;

// 	constructor(_client) {
// 		this.client = _client;
// 		this.subteams = _subteams; // JSON.parse();
// 		// this.clickup = new ClickUp(this.client.config.clickupToken);
// 		let c = new ClickUp();

// 		this.client.logger.ready('ClickUp Ready');
// 	}

// 	getSub(name) {
// 		for (let i = 0; i < this.subteams.length; i++) {
// 			if (this.subteams[i].name == name) {
// 				return this.subteams[i];
// 			}
// 		}
// 	}

// 	addUser() {}

// 	update() {
// 		let serverid = '480598748074868768'; // CHANGE CHANGE CHANGE CHANGE

// 		let userlist = [];
// 		console.log(`Logged in as ${this.client.user.tag}!`);
// 		// Get the Guild and store it under the variable "list"
// 		const guild = this.client.guilds.cache.get(serverid);

// 		// Iterate through the collection of GuildMembers from the Guild getting the username property of each member
// 		// guild.members.members.cache.forEach((member) =>
// 		// 	console.log('member = ' + member.user.username)
// 		// );
// 		guild.members
// 			.fetch()
// 			.then((user) => {
// 				console.log(
// 					user.forEach((u) => {
// 						if (!u.user.bot) {
// 							userlist.push(u);
// 						}
// 					})
// 				);
// 			})
// 			.then(() => {
// 				// console.log(userlist);
// 				// fs.writeFile("./file.json", userlist).catch(console.error);

// 				let userData = [];

// 				userlist.forEach((u) => {
// 					// console.log(u.displayName);
// 					userData.push({
// 						displayName: u.displayName,
// 						id: u.id,
// 						email: '',
// 					});
// 				});

// 				let json = JSON.stringify(userData);

// 				// console.log(json);

// 				fs.writeFile('./src/database/users.json', json, function (err) {
// 					if (err) return console.log(err);
// 					console.log('userlist > file.json');
// 				});
// 			})
// 			.catch(console.error);
// 	}
// }
