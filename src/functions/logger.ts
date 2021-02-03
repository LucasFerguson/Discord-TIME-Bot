import { DiscordAPIError, TextChannel } from 'discord.js';
import GuideBot from '../ClientClass';
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
		this.default(content);
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
		let text = this.client.clean(_content);
		this.logsServer.send(`${text}`);
	}
}
