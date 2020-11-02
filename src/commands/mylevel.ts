let { GuideBot } = require('../ClientClass.js');
import * as Discord from 'discord.js';

/**
 * @param { GuideBot } client
 * @param { Discord.Message } message
 */
exports.run = async (client, message, args, level) => {
	let friendly = 'null';
	for (let i = 0; i < client.configLevels.length; i++) {
		if (client.configLevels[i].level == level) {
			friendly = client.configLevels[i].name;
		}
	}
	message.reply(`Your permission level is: Level ${level} - ${friendly}`);
};

exports.conf = {
	enabled: true,
	guildOnly: false,
	aliases: [],
	permLevel: 0,
};

exports.help = {
	name: 'mylevel',
	category: 'Miscelaneous',
	description:
		'Tells you your permission level for the current message location.',
	usage: 'mylevel',
};
