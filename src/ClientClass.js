const fs = require("fs");
const { promisify } = require("util");
const readdir = promisify(require("fs").readdir);

const Discord = require("discord.js");

class GuideBot extends Discord.Client {
	/** @type { import("./commands/help")[]} */
	commands = [];

	/**
	 * @param {import("discord.js").ClientOptions} options
	 */
	constructor(options) {
		super(options);

		// Here we load the config.js file that contains our token and our prefix values.
		this.config = require("./config.js");
		// client.config.token contains the bot's token
		// client.config.prefix contains the message prefix
		this.configLevels = require("./configLevels.js");

		// Aliases and commands are put in collections where they can be read from,
		// catalogued, listed, etc.
		this.commands = [];
		this.aliases = [];

		// Now we integrate the use of Evie's awesome Enhanced Map module, which
		// essentially saves a collection to disk. This is great for per-server configs,
		// and makes things extremely easy for this purpose.
		// this.settings = {};

		//requiring the Logger class for easy console logging
		this.logger = require("./functions/logger.js");

		// Basically just an async shortcut to using a setTimeout. Nothing fancy!
		this.wait = require("util").promisify(setTimeout);
	}

	/**
	 * @param {string} stringC
	 */
	getCommand(stringC) {
		for (let i = 0; i < this.commands.length; i++) {
			// this.commands[i].conf.aliases.
			// }
			for (let a = 0; a < this.commands.length; a++) {
				if (
					this.commands[i].conf.aliases[a] == stringC ||
					this.commands[i].help.name == stringC
				) {
					return this.commands[i];
				}
			}
		}
	}

	/*
	PERMISSION LEVEL FUNCTION
	This is a very basic permission system for commands which uses "levels"
	"spaces" are intentionally left black so you can add them if you want.
	NEVER GIVE ANYONE BUT OWNER THE LEVEL 10! By default this can run any
	command including the VERY DANGEROUS `eval` command!
	*/
	/**
	 * @param {Discord.Message} message
	 */
	permlevel(message) {
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
	 * @param {string} commandPath
	 */
	loadCommand(commandPath) {
		try {
			const props = require(`./commands/${commandPath}`);
			this.logger.log(`Loading Command: ${props.help.name}. `, "log");
			this.commands.push(props);
			// this.logger.ready("Done with " + commandPath);
		} catch (e) {
			this.logger.log(
				`Unable to load command ${commandPath}: ${e}`,
				"error"
			);
		}
	}

	/**
	 * @param {any} commandPath
	 * @param {any} commandName
	 */
	async unloadCommand(commandPath, commandName) {}

	/*
	MESSAGE CLEAN FUNCTION
	"Clean" removes @everyone pings, as well as tokens, and makes code blocks
	escaped so they're shown more easily. As a bonus it resolves promises
	and stringifies objects!
	This is mostly only used by the Eval and Exec commands.
	*/
	/**
	 * @param {string} text
	 */
	async clean(text) {
		if (text && text.constructor.name == "Promise") text = await text;
		if (typeof text !== "string")
			text = require("util").inspect(text, { depth: 1 });

		text = text
			.replace(/`/g, "`" + String.fromCharCode(8203))
			.replace(/@/g, "@" + String.fromCharCode(8203))
			.replace(
				this.token,
				"mfa.VkO_2G4Qv3T--NO--lWetW_tjND--TOKEN--QFTm6YGtzq9PH--4U--tG0"
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

		console.log(
			"this.config.defaultSettings " + this.config.defaultSettings
		);
		return this.config.defaultSettings;
	}

	// writeSettings overrides, or adds, any configuration item that is different
	// than the defaults. This ensures less storage wasted and to detect overrides.
	/**
	 * @param {any} id
	 * @param {{ [x: string]: any; }} newSettings
	 */
	writeSettings(id, newSettings) {
		const defaults = this.settings.get("default");
		let settings = this.settings.get(id);
		if (typeof settings != "object") settings = {};
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
				errors: ["time"],
			});
			return collected.first().content;
		} catch (e) {
			return false;
		}
	}
}

module.exports = {
	GuideBot,
};
