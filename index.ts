import { promisify } from 'util';
import * as fs from 'fs';
var readdir = promisify(fs.readdir);

import * as Discord from 'discord.js';

// import { GuideBot } from './src/ClientClass';
import GuideBot from './src/ClientClass';

// Default Intents the bot needs.
// By default GuideBot needs Guilds, Guild Messages and Direct Messages to work.
// For join messages to work you need Guild Members, which is privileged and requires extra setup.
// For more info about intents see the README.
const intents = ['GUILDS', 'GUILD_MESSAGES', 'DIRECT_MESSAGES'];

// This is your client. Some people call it `bot`, some people call it `self`,
// or `bot.something`, this is what we're refering to. Your client.
const client = new GuideBot(); //const client = new GuideBot({ ws: { intents: intents } });

// We're doing real fancy node 8 async/await stuff here, and to do that
// we need to wrap stuff in an anonymous function. It's annoying but it works.

const init = async () => {
	// Here we load **commands** into memory, as a collection, so they're accessible
	// here and everywhere else.
	const cmdFiles = await readdir(__dirname + '/src/commands/');
	client.logger.debug(`Loading a total of ${cmdFiles.length / 2} commands.`);

	cmdFiles.forEach((file) => {
		if (!file.endsWith('.js')) return;
		const filename = file.split('.')[0];
		client.loadCommand(filename);
	});

	client.logger.none('');

	// Then we load events, which will include our message and ready event.
	const evtFiles = await readdir(__dirname + '/src/events/');
	client.logger.debug(`Loading a total of ${evtFiles.length / 2} events.`);

	evtFiles.forEach((file) => {
		if (!file.endsWith('.js')) return;
		const filename = file.split('.')[0];
		client.logger.log(`Loading Event: ${filename}`);
		const event = require(`./src/events/${filename}`);

		// Bind the client to any event, before the existing arguments
		// provided by the discord.js event.
		// This line is awesome by the way. Just sayin'.
		client.on(filename, event.bind(null, client));
	});

	// Here we login the client.
	client.login('NzYzMjAxODk0MDE3NDAwODcz.X30RJw.Jh4Ekm2gryN002AMLhVrplFgmGM');

	// End top-level async/await function.
};

init();

// let serverid = "480598748074868768"; // CHANGE CHANGE CHANGE CHANGE

// /**
//  * @type {Discord.GuildMember[]} userlist
//  */
// let userlist = [];

// client.on("ready", () => {
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

// 			fs.writeFile("./src/storage/file.json", json, function (err) {
// 				if (err) return console.log(err);
// 				console.log("userlist > file.json");
// 			});
// 		})
// 		.catch(console.error);

// 	console.log(userlist);
// });

// client.on("message", (msg) => {
// 	if (msg.author.bot) return;

// 	// if (msg.guild === null) {
// 	// 	console.log("dm = true");
// 	// }

// 	consoleLog(msg.author.username + " " + msg.content);

// 	if (msg.content == "xhelp" || msg.content == "help") {
// 		let string = "";
// 		string += "```\n";
// 		string += "Documentation\n";
// 		string += "\n";
// 		string += "Run command \n";
// 		string += "Example\n";
// 		string += "    xhelp\n";
// 		string += "    xping\n";
// 		string += "\n```";

// 		msg.channel.send(string);
// 	}

// 	if (!(msg.content.startsWith("x") || msg.content.startsWith("X"))) return;

// 	if (msg.content === "xping") {
// 		msg.reply(
// 			"Pong  :ping_pong:  [" +
// 				(Date.now() - msg.createdTimestamp) +
// 				" ms]"
// 		);
// 	}
// 	if (msg.content == "xpong") {
// 		msg.reply(
// 			"Ping  :ping_pong:  [" +
// 				(Date.now() - msg.createdTimestamp) +
// 				" ms]"
// 		);
// 	}

// 	// Admin //
// 	if (msg.author.id != "340297379070738433") return; // CHANGE CHANGE CHANGE CHANGE

// 	if (msg.content == "xend") {
// 		userlist.forEach((u) => {
// 			console.log(u.displayName);
// 			u.send("x").then((ch) => {
// 				ch.channel.messages.fetch().then((m) => {
// 					m.forEach((m) => {
// 						if (m.author.bot) {
// 							m.delete().catch((err) => {
// 								console.log(err);
// 							});
// 						}
// 					});
// 				});
// 			});
// 		});
// 	}

// 	if (msg.content == "xget") {
// 		userlist.forEach((u) => {
// 			if (u.id == "480902673428905989") {
// 				console.log(u.displayName);
// 				console.log(u.user.dmChannel);
// 			}
// 		});
// 	}

// 	if (msg.content == "xrunstart") {
// 		userlist.forEach((u) => {
// 			if (u.roles.cache.has("717185795907256370")) {
// 				// CHANGE CHANGE CHANGE CHANGE
// 			}
// 			if (!u.user.bot) {
// 				u.createDM(true).then(() => {
// 					let string = "";
// 					string +=
// 						"Hello, I'm the Discord Bot for the TIME Bots 5275.\n";
// 					string += "Created By  :  Lucas Ferguson\n";
// 					string += "Latest Version  :  0.0.2\n";
// 					string += "Updated Date  :  10/30/2020\n";
// 					string += "\n";
// 					string += "Your User Info\n";
// 					string += "Name  : " + u.displayName + "\n";
// 					string += "UserID  :  " + u.user.id + "\n";
// 					string += "\n";
// 					// string +=
// 					// 	'**Respond with "Yes" if you received this message**\n';
// 					u.send(string);

// 					u.send('Type "Help" for a list of commands');
// 				});
// 			}
// 		});
// 		msg.reply("running");
// 	}
// });
// let startDate = Date.now();

// function consoleLog(message) {
// 	let user = client.users.cache.get("340297379070738433");
// 	user.send(message);

// 	var dir = "./log";

// 	if (!fs.existsSync(dir)) {
// 		fs.mkdirSync(dir);
// 	}

// 	let date = Date.now();
// 	let timeStamp = date - startDate;

// 	message = "[" + timeStamp + "ms] " + message;

// 	process.stdout.write("\n" + message);
// 	// log.push(message);
// 	// fs.writeFileSync("./log", message);
// 	fs.open("./log/log.txt.log", "a", 666, function (e, id) {
// 		fs.write(id, message + "\n", null, "utf8", function () {
// 			fs.close(id, function () {
// 				// console.log("file is updated");
// 			});
// 		});
// 	});

// 	// this.serverLucas = discordClient.guilds.cache.get(config.myServerID);

// 	// if (message.length <= 2000) {
// 	// 	this.serverLucas.systemChannel.send(message);
// 	// } else {
// 	// 	this.serverLucas.systemChannel.send(
// 	// 		"Warning: Message over 2000 characters"
// 	// 	);
// 	// }
// }

// client.login("NzYzMjAxODk0MDE3NDAwODcz.X30RJw.Jh4Ekm2gryN002AMLhVrplFgmGM");
