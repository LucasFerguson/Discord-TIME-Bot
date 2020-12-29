import {
	token as _token,
	clickupToken as _clickupToken,
} from './token.lock.json';

export default {
	// Bot Owner, level 10 by default. You do not need to supply the owner ID, as the bot
	// will pull this information directly from its application page.
	owner: '340297379070738433',

	// Bot Admins, level 9 by default. Array of user ID strings.
	admins: [],

	// Bot Support, level 8 by default. Array of user ID strings
	support: [],

	// Your Bot's Token. Available on https://discordapp.com/developers/applications/me
	token: _token,
	clickupToken: _clickupToken,

	discord: {
		logs: {
			server: '645171221104689152',
			timebot: '772319136780910612',
		},
	},

	// Default per-server settings. These settings are entered in a database on first load,
	// And are then completely ignored from this file. To modify default settings, use the `conf` command.
	// DO NOT REMOVE THIS BEFORE YOUR BOT IS LOADED AND FUNCTIONAL.

	defaultSettings: {
		prefix: '-',
		modLogChannel: 'mod-log',
		modRole: 'Moderator',
		adminRole: 'Administrator',
		systemNotice: 'true',
		welcomeEnabled: 'false',
		welcomeChannel: 'welcome',
		welcomeMessage:
			'Say hello to {{user}}, everyone! We all need a warm welcome sometimes :D',
	},
};

// module.exports = config;
