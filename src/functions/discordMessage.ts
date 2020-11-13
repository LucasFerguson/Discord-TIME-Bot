import { DiscordAPIError, TextChannel } from 'discord.js';
import GuideBot from '../ClientClass';
import config from '../config';
// import { version as _version } from '.../package.json';
import * as Discord from 'discord.js';

/*
    Logger class for easy and aesthetically pleasing console logging.  by Évelyne Lachance
*/
const chalk = require('chalk');
var moment = require('moment');

export default class DiscordMessage {
	client: GuideBot;

	constructor(_client) {
		this.client = _client;
	}

	discord(_content) {
		// let channel = this.client.channels.get('645171221104689152');
		// c.send('Pong');
		const exampleEmbed = {
			color: 0xf6b436,
			// title: 'T.I.M.E Bot',
			// url: 'https://timebots5275.com/',
			author: {
				name: 'T.I.M.E Bot',
				url: 'https://timebots5275.com/',
				icon_url:
					'https://images.squarespace-cdn.com/content/59c96af19f7456ec37988859/1547608155061-17G10BA9MJPY1ZW611MU/TIME+Bots+Logo+changed+to+all+black2+%281%29.png?format=1500w&content-type=image%2Fpng',
			},
			description: `${_content}`,
			// thumbnail: {
			// 	url:
			// 		'https://images.squarespace-cdn.com/content/59c96af19f7456ec37988859/1547608155061-17G10BA9MJPY1ZW611MU/TIME+Bots+Logo+changed+to+all+black2+%281%29.png?format=1500w&content-type=image%2Fpng',
			// },

			timestamp: new Date(),
			footer: {
				text: 'Date',
				// icon_url:
				// 	'https://images.squarespace-cdn.com/content/59c96af19f7456ec37988859/1547608155061-17G10BA9MJPY1ZW611MU/TIME+Bots+Logo+changed+to+all+black2+%281%29.png?format=1500w&content-type=image%2Fpng',
			},
		};
		// this.logsServer.send({ embed: exampleEmbed });

		// this.logsServer.send(`${_content}`);
	}
}
