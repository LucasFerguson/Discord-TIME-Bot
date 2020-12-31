import fs = require('fs');

import * as Discord from 'discord.js';
import Logger from './functions/logger';
import Database from './functions/DatabaseClass';
import ClickUp from './functions/ClickUp';

import { Command } from './config/Command';

import config from './config';
import configLevels from './configLevels';

var wait = require('util').promisify(setTimeout);

export default class GuideBot extends Discord.Client {
	/** @type { } */
	commands: Command[];
	config = config;
	configLevels = configLevels;
	aliases: any[];
	logger: Logger;
	database: Database;
	clickup: ClickUp;
	wait: any;
	settings: any;
	ready: boolean;
	letterArt: string;
	startTime: number;

	/**
	 * @param {import("discord.js").ClientOptions} options
	 */
	constructor(options?: Discord.ClientOptions) {
		super(options);

		// Here we load the config.js file that contains our token and our prefix values.
		this.config = config;

		// client.config.token contains the bot's token
		// client.config.prefix contains the message prefix
		this.configLevels = configLevels; // require('./configLevels.js');

		// Aliases and commands are put in collections where they can be read from,
		// catalogued, listed, etc.
		this.commands = [];
		this.aliases = [];

		// Now we integrate the use of Evie's awesome Enhanced Map module, which
		// essentially saves a collection to disk. This is great for per-server configs,
		// and makes things extremely easy for this purpose.
		// this.settings = {};

		//requiring the Logger class for easy console logging
		this.logger = new Logger(this);
		this.database = new Database(this);
		this.clickup = new ClickUp(this);

		// Basically just an async shortcut to using a setTimeout. Nothing fancy!
		this.wait = require('util').promisify(setTimeout);

		// Discord Server Logs
		this.ready = false;
	}

	async init() {
		let start, end;
		this.logger.debug('Loading a total of 3 functions.');

		start = Date.now();
		await this.logger.init();
		end = Date.now();
		this.logger.log(`Loading Function: Logger Ready (: [${end - start}ms]`);

		start = Date.now();
		await this.clickup.init();
		end = Date.now();
		this.logger.log(
			`Loading Function: ClickUp Ready (: [${end - start}ms]`
		);

		start = Date.now();
		await this.database.init();
		end = Date.now();
		this.logger.log(
			`Loading Function: Database Ready (: [${end - start}ms]`
		);

		this.logger.log('');
	}

	/**
	 * @param {string} stringC
	 */
	getCommand(stringC: string): Command {
		for (let c = 0; c < this.commands.length; c++) {
			if (
				this.commands[c].help.name.toLowerCase() ==
				stringC.toLowerCase()
			) {
				return this.commands[c];
			}

			for (let a = 0; a < this.commands[c].conf.aliases.length; a++) {
				if (
					this.commands[c].conf.aliases[a].toLowerCase() ==
					stringC.toLowerCase()
				) {
					return this.commands[c];
				}
			}
		}

		return this.getCommand('null');
	}

	addReactionsListener(
		message: Discord.Message,
		emoji: string,
		fun: (reaction: Discord.MessageReaction, user: Discord.User) => void
	): Discord.ReactionCollector {
		let filter = (reaction, user) => {
			return reaction.emoji.name === emoji;
		};

		let collector = message.createReactionCollector(filter, {
			time: 30000,
		});

		collector.on('collect', (reaction, user) => {
			console.log(`Collected ${reaction.emoji.name} from ${user.tag}`);
			fun(reaction, user);
		});

		collector.on('end', () => {
			console.log(`end createReactionCollector`);
			// reaction.remove();
			try {
				message.reactions.removeAll();
			} catch (e) {}
			// message.delete();
		});

		return collector;
	}

	/*
	PERMISSION LEVEL FUNCTION
	This is a very basic permission system for commands which uses "levels"
	"spaces" are intentionally left black so you can add them if you want.
	NEVER GIVE ANYONE BUT OWNER THE LEVEL 10! By default this can run any
	command!
	*/
	/**
	 * @param {Discord.Message} message
	 */
	permissionLevel(message) {
		let permlvl = 0;
		for (let i = 0; i < this.configLevels.length; i++) {
			try {
				if (this.configLevels[i].check(message)) {
					if (this.configLevels[i].level > permlvl) {
						permlvl = this.configLevels[i].level;
					}
				}
			} catch (e) {
				this.logger.error(e);
			}
		}
		return permlvl;
	}

	/* 
	COMMAND LOAD AND UNLOAD
	To simplify the loading and unloading of commands from multiple locations
	including the index.js load loop, and the reload function, these 2 ensure
	that unloading happens in a consistent manner across the board.
	*/
	/**
	 * @param {string} commandName
	 */
	loadCommand(commandName: string) {
		try {
			let start = Date.now();

			const props = require(`./commands/${commandName}`).default;
			this.commands.push(props);
			// this.logger.ready('Done with ' + commandPath);
			let end = Date.now();
			this.logger.log(
				`Loaded Command: ${props.help.name}, [${end - start}ms]`
			);
		} catch (e) {
			this.logger.error(`Unable to load command ${commandName}: ${e}`);
		}
	}

	/**
	 * @param {any} commandPath
	 * @param {any} commandName
	 */
	unloadCommand(commandName: string): boolean {
		this.logger.log(`Unloading Command: ${commandName}`);

		let index: number = -1;

		for (let c = 0; c < this.commands.length; c++) {
			if (
				this.commands[c].help.name.toLowerCase() ==
				commandName.toLowerCase()
			) {
				index = c;
			}

			for (let a = 0; a < this.commands[c].conf.aliases.length; a++) {
				if (
					this.commands[c].conf.aliases[a].toLowerCase() ==
					commandName.toLowerCase()
				) {
					index = c;
				}
			}
		}
		if (index == -1) {
			this.logger.warn(`Failed Unloading Command: ${commandName}`);
			return false;
		} else {
			this.commands.splice(index, 1);
		}
		return true;
	}

	/*
	MESSAGE CLEAN FUNCTION
	"Clean" removes @everyone pings, as well as tokens, and makes code blocks
	escaped so they're shown more easily. As a bonus it stringifies objects!
	*/
	/**
	 * @param {string} text
	 */
	clean(text) {
		// if (text && text.constructor.name == 'Promise') text = await text;
		if (typeof text !== 'string')
			text = require('util').inspect(text, { depth: 1 });

		text = text
			.replace(/`/g, '`' + String.fromCharCode(8203))
			.replace(/@/g, '@' + String.fromCharCode(8203))
			.replace(
				this.token,
				'mfa.VkO_2G4Qv3T--NO--lWetW_tjND--TOKEN--QFTm6YGtzq9PH--4U--tG0'
			);

		return text;
	}

	/* SETTINGS FUNCTIONS
	These functions are used by any and all location in the bot that wants to either
	read the current *complete* guild settings (default + overrides, merged) or that
	wants to change settings for a specific guild.
	*/

	// getSettings merges the client defaults with the guild settings. guild settings in
	// enmap should only have *unique* overrides that are different from defaults.
	/**
	 * @param {any} guild
	 */
	getSettings(guild) {
		// const defaults = this.settings.get("default") || {};
		// const guildData = guild ? this.settings.get(guild.id) || {} : {};
		// const returnObject = {};
		// Object.keys(defaults).forEach((key) => {
		// 	returnObject[key] = guildData[key] ? guildData[key] : defaults[key];
		// });
		return this.config.defaultSettings;
	}

	// writeSettings overrides, or adds, any configuration item that is different
	// than the defaults. This ensures less storage wasted and to detect overrides.
	/**
	 * @param {any} id
	 * @param {{ [x: string]: any; }} newSettings
	 */
	writeSettings(id, newSettings) {
		const defaults = this.settings.get('default');
		let settings = this.settings.get(id);
		if (typeof settings != 'object') settings = {};
		for (const key in newSettings) {
			if (defaults[key] !== newSettings[key]) {
				settings[key] = newSettings[key];
			} else {
				delete settings[key];
			}
		}
		this.settings.set(id, settings);
	}

	/*
	SINGLE-LINE AWAITMESSAGE
	A simple way to grab a single reply, from the user that initiated
	the command. Useful to get "precisions" on certain things...
	USAGE
	const response = await client.awaitReply(msg, "Favourite Color?");
	msg.reply(`Oh, I really love ${response} too!`);
	*/
	/**
	 * @param {{ author: { id: any; }; channel: { send: (arg0: any) => any; awaitMessages: (arg0: (m: any) => boolean, arg1: { max: number; time: number; errors: string[]; }) => any; }; }} msg
	 * @param {any} question
	 */
	async awaitReply(msg, question, limit = 60000) {
		/**
		 * @param {{ author: { id: any; }; }} m
		 */
		const filter = (m) => m.author.id === msg.author.id;
		await msg.channel.send(question);
		try {
			const collected = await msg.channel.awaitMessages(filter, {
				max: 1,
				time: limit,
				errors: ['time'],
			});
			return collected.first().content;
		} catch (e) {
			return false;
		}
	}
}

// module.exports = {
// 	GuideBot,
// };
