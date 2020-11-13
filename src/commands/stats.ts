// Created By  :  Lucas Ferguson\nLatest Version  :  1.0.0\nUpdated Date  :  10/30/2020\n

import { Command } from '../config/Command';

let thisCommand: Command = {
	run: async (client, message, args, level) => {},
	conf: {
		enabled: true,
		guildOnly: false,
		aliases: [],
		permLevel: 0,
	},

	help: {
		name: 'stats',
		category: 'System',
		description: 'Gives some useful bot statistics',
		usage: 'stats',
	},
};

import { version } from 'discord.js';
var moment = require('moment');
require('moment-duration-format');

var { GuideBot } = require('../ClientClass.js');
import * as Discord from 'discord.js';

thisCommand.run = async (client, message, args, level) => {
	let duration = moment
		.duration(client.uptime)
		.format(' D [days], H [hrs], m [mins], s [secs]');
	let a = message.channel.send(
		`= STATISTICS =
• Mem Usage  :: ${(process.memoryUsage().heapUsed / 1024 / 1024).toFixed(2)} MB
• Uptime     :: ${duration}
• Users      :: ${client.users.cache.size.toLocaleString()}
• Servers    :: ${client.guilds.cache.size.toLocaleString()}
• Channels   :: ${client.channels.cache.size.toLocaleString()}
• Discord.js :: v${version}
• Node       :: ${process.version}`
	);

	a.then((messagebot) => {
		let x = 10;
		var intervalID = setInterval(function () {
			duration = moment
				.duration(client.uptime)
				.format(' D [days], H [hrs], m [mins], s [secs]');
			messagebot.edit(
				`= STATISTICS = ${x}
• Mem Usage  :: ${(process.memoryUsage().heapUsed / 1024 / 1024).toFixed(2)} MB
• Uptime     :: ${duration}
• Users      :: ${client.users.cache.size.toLocaleString()}
• Servers    :: ${client.guilds.cache.size.toLocaleString()}
• Channels   :: ${client.channels.cache.size.toLocaleString()}
• Discord.js :: v${version}
• Node       :: ${process.version}`
			);

			if (x <= 0) {
				messagebot.delete();
				message.delete();
				clearInterval(intervalID);
			}

			x--;
		}, 1000);
	});
};
export default thisCommand;
