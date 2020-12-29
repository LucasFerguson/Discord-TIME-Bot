import GuideBot from '../ClientClass';
// import { subteams as _subteams } from '../../../database/subteams.json';
// import * as fs from 'fs';

import * as admin from 'firebase-admin';
import * as tokens from '../../tokens/token.lock.json';
import { SubTeam } from '../config/SubTeam';

export default class Database {
	client: GuideBot;
	app: admin.app.App;
	db: FirebaseFirestore.Firestore;
	subteams;

	constructor(_client) {
		this.client = _client;

		// console.log(this.subteams);

		//Initialize on Cloud Functions
		// admin = require('firebase-admin');
		this.app = admin.initializeApp({
			credential: admin.credential.cert(
				<admin.ServiceAccount>tokens.googleFirebase
			),
		});

		this.db = this.app.firestore();
	}

	async init() {
		// this.client.logger.log('Database Ready');

		console.log('Database Ready (: ');
	}

	async getAllSubteams(): Promise<SubTeam[]> {
		let subteams = [];
		let collection = await this.db.collection('subteams').get();
		collection.docs.forEach((doc) => {
			subteams.push({ name: doc.id, id: doc.data() });
		});
		return subteams;
	}

	async getSubteam(teamName: string): Promise<SubTeam> {
		let subteams = await this.getAllSubteams();

		let team: SubTeam;
		subteams.forEach((t) => {
			if (t.name == teamName) {
				team = t;
			}
		});

		return team;
	}

	async updateUsers() {
		let serverid = '480598748074868768';
		// Get the Guild and store it under the variable "list"
		const guild = this.client.guilds.cache.get(serverid);
		const members = await guild.members.fetch();
		members.forEach((user) => {
			console.log(user);
		});
		// Iterate through the collection of GuildMembers from the Guild getting the username property of each member
		// guild.members..members.cache.forEach((member) =>
		// 	console.log("member = " + member.user.username)
		// );
		// guild.members
		// 	.fetch()
		// 	.then((user) => {
		// 		console.log(
		// 			user.forEach((u) => {
		// 				if (!u.user.bot) {
		// 					userlist.push(u);
		// 				}
		// 			})
		// 		);
		// 	})
		// 	.then(() => {
		// 		// console.log(userlist);
		// 		// fs.writeFile("./file.json", userlist).catch(console.error);

		// 		let userData = [];

		// 		userlist.forEach((u) => {
		// 			console.log(u.displayName);
		// 			userData.push({ displayName: u.displayName, id: u.id });
		// 		});

		// 		let json = JSON.stringify(userData);

		// 		console.log(json);

		// 		fs.writeFile('./src/storage/file.json', json, function (err) {
		// 			if (err) return console.log(err);
		// 			console.log('userlist > file.json');
		// 		});
		// 	})
		// 	.catch(console.error);

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
