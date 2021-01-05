import GuideBot from '../ClientClass';
import * as Discord from 'discord.js';
// import { version as _version } from '../../package.json';

/**
 * @param { GuideBot } client
 * @param { Discord.Message } message
 */
module.exports = async (client: GuideBot) => {
	// Log that the bot is online.
	await client.init();

	client.user.setActivity(`-help`, {
		type: 'PLAYING',
	});
	client.ready = true;

	client.logger.ready(
		`[${Date.now() - client.botInfo.startTime}ms] ${
			client.user.tag
		}, ready to serve ${client.users.cache.size} users in ${
			client.guilds.cache.size
		} servers.
		`
	);

	// client.logger.log('```' + client.letterArt + '```');

	// client.clickup.update();
};
