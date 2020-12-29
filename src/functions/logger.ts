import { DiscordAPIError, TextChannel } from 'discord.js';
import GuideBot from '../ClientClass';
// import { version as _version } from '.../package.json';
import * as Discord from 'discord.js';

/*
    Logger class for easy and aesthetically pleasing console logging.  by Évelyne Lachance
*/
const chalk = require('chalk');
var moment = require('moment');

export default class Logger {
	client: GuideBot;
	logsServer: Discord.TextChannel;
	logsTimebot: Discord.TextChannel;

	constructor(_client) {
		this.client = _client;
	}

	async init() {
		let serverLucas = this.client.guilds.cache.get('645153111538794496');
		// @ts-ignore
		this.logsServer = await this.client.channels.fetch(
			this.client.config.discord.logs.server
		);
		// @ts-ignore
		this.logsTimebot = await this.client.channels.fetch(
			this.client.config.discord.logs.timebot
		);
		// console.log('Logger Ready (: ');
	}

	error(content) {
		console.error(content);
		this.default(content);
	}
	warn(content) {
		console.warn(content);
		this.default(content);
	}
	debug(content) {
		this.default('[DEBUG] ' + content);
	}
	cmd(content) {
		this.default('[CMD] ' + content);
	}
	none(content) {
		this.default('[] ' + content);
	}
	log(content) {
		this.default(content);
	}
	ready(content) {
		this.default('[READY] ' + content);
	}

	default(_content) {
		console.log(_content);
		if (this.client.ready) {
			this.discord(_content);
		}
	}

	discord(_content) {
		this.logsServer.send(`${_content}`);

		// let channel = this.client.channels.get('645171221104689152');
		// c.send('Pong');
		// const exampleEmbed = {
		// 	color: 0xf6b436,
		// 	// title: 'T.I.M.E Bot',
		// 	// url: 'https://timebots5275.com/',
		// 	author: {
		// 		name: 'T.I.M.E Bot',
		// 		url: 'https://timebots5275.com/',
		// 		icon_url:
		// 			'https://images.squarespace-cdn.com/content/59c96af19f7456ec37988859/1547608155061-17G10BA9MJPY1ZW611MU/TIME+Bots+Logo+changed+to+all+black2+%281%29.png?format=1500w&content-type=image%2Fpng',
		// 	},
		// 	description: `${_content}`,
		// 	// thumbnail: {
		// 	// 	url:
		// 	// 		'https://images.squarespace-cdn.com/content/59c96af19f7456ec37988859/1547608155061-17G10BA9MJPY1ZW611MU/TIME+Bots+Logo+changed+to+all+black2+%281%29.png?format=1500w&content-type=image%2Fpng',
		// 	// },

		// 	timestamp: new Date(),
		// 	footer: {
		// 		text: 'Date',
		// 		// icon_url:
		// 		// 	'https://images.squarespace-cdn.com/content/59c96af19f7456ec37988859/1547608155061-17G10BA9MJPY1ZW611MU/TIME+Bots+Logo+changed+to+all+black2+%281%29.png?format=1500w&content-type=image%2Fpng',
		// 	},
		// };

		// let a = {
		// 	title: 'Help Command',
		// 	description:
		// 		'Use -help <commandname> for details\n`- help ping`\n\n== System ==\n` - ping`: Test the latency from the Server to the Discord API. Ping Pong. :ping_pong: \n` - readline` : read Line\n` - reboot` : Shuts down the bot. If running under PM2, bot will restart automatically.\n` - stats` : Gives some useful bot statistics\n',
		// 	color: 16167990,
		// 	footer: {
		// 		text: '1/4',
		// 	},
		// };

		// this.logsServer.send({ embed: a });
	}

	// console(content, type = 'log') {
	// 	const timestamp = `[${moment().format('YYYY-MM-DD HH:mm:ss')}]:`;
	// 	let returnMessage = '';
	// 	switch (type) {
	// 		case 'log': {
	// 			returnMessage = `${timestamp} ${chalk.bgBlue(
	// 				type.toUpperCase()
	// 			)} ${content} `;
	// 		}
	// 		case 'warn': {
	// 			returnMessage = `${timestamp} ${chalk.black.bgYellow(
	// 				type.toUpperCase()
	// 			)} ${content} `;
	// 		}
	// 		case 'error': {
	// 			returnMessage = `${timestamp} ${chalk.bgRed(
	// 				type.toUpperCase()
	// 			)} ${content} `;
	// 		}
	// 		case 'debug': {
	// 			returnMessage = `${timestamp} ${chalk.green(
	// 				type.toUpperCase()
	// 			)} ${content} `;
	// 		}
	// 		case 'cmd': {
	// 			returnMessage = `${timestamp} ${chalk.black.bgWhite(
	// 				type.toUpperCase()
	// 			)} ${content}`;
	// 		}
	// 		case 'ready': {
	// 			returnMessage = `${timestamp} ${chalk.black.bgGreen(
	// 				type.toUpperCase()
	// 			)} ${content}`;
	// 		}
	// 		case 'none': {
	// 			returnMessage = `${timestamp} ${content}`;
	// 		}
	// 		// default:
	// 		// 	throw new TypeError(
	// 		// 		"Logger type must be either warn, debug, log, ready, cmd or error."
	// 		// 	);
	// 	}

	// 	// console.log(type);
	// 	console.log(returnMessage);
	// }
}
// export var error = (args) => {
// 	Logger(args, 'error');
// };
// export var warn = (args) => {
// 	Logger(args, 'warn');
// };
// export var debug = (args) => {
// 	Logger(args, 'debug');
// };
// export var cmd = (args) => {
// 	Logger(args, 'cmd');
// };
// export var log = (args) => {
// 	Logger(args, 'log');
// };
// export var ready = (args) => {
// 	Logger(args, 'ready');
// };
// export var none = (args) => {
// 	Logger(args, 'none');
// };

// module.exports = {
// 	log,
// };
