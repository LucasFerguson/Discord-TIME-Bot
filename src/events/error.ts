import GuideBot from '../ClientClass';
import * as Discord from 'discord.js';

module.exports = async (client: GuideBot, error) => {
	client.logger.error(
		`An error event was sent by Discord.js: \n${JSON.stringify(error)}`
	);
};
