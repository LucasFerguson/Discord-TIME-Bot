let letterArt = `
████████╗ ██╗ ███╗   ███╗ ███████╗
╚══██╔══╝ ██║ ████╗ ████║ ██╔════╝
   ██║    ██║ ██╔████╔██║ █████╗  
   ██║    ██║ ██║╚██╔╝██║ ██╔══╝  
   ██║    ██║ ██║ ╚═╝ ██║ ███████╗
   ╚═╝    ╚═╝ ╚═╝     ╚═╝ ╚══════╝
                                  
⠀⠀⠀⠀██████╗  ██████╗ ████████╗    
⠀⠀⠀⠀██╔══██╗██╔═══██╗╚══██╔══╝    
⠀⠀⠀⠀██████╔╝██║   ██║   ██║       
⠀⠀⠀⠀██╔══██╗██║   ██║   ██║       
⠀⠀⠀⠀██████╔╝╚██████╔╝   ██║       
⠀⠀⠀⠀╚═════╝  ╚═════╝    ╚═╝       
`;

import { promisify } from 'util';
import * as fs from 'fs';
var readdir = promisify(fs.readdir);

import config from './src/config';
import * as tokens from './tokens/token.lock.json';

import * as Discord from 'discord.js';

import GuideBot from './src/ClientClass';

// Default Intents the bot needs.
// By default GuideBot needs Guilds, Guild Messages and Direct Messages to work.
// For join messages to work you need Guild Members, which is privileged and requires extra setup.
// For more info about intents see https://discordjs.guide/popular-topics/intents.html.
const intents = ['GUILDS', 'GUILD_MESSAGES', 'DIRECT_MESSAGES'];

// This is your client. Some people call it `bot`, some people call it `self`,
// or `bot.something`, this is what we're refering to. Your client.
const client = new GuideBot(); //const client = new GuideBot({ ws: { intents: intents } });
client.botInfo.letterArt = letterArt;

// We're doing real fancy node 8 async/await stuff here, and to do that
// we need to wrap stuff in an anonymous function. It's annoying but it works.

const init = async () => {
	client.logger.log('');
	client.logger.log('');
	client.logger.log(letterArt);

	// Here we load **commands** into memory, as a collection, so they're accessible
	// here and everywhere else.
	const cmdFiles = await readdir(__dirname + '/src/commands/');
	client.logger.debug(`Loading a total of ${cmdFiles.length / 2} commands.`);

	cmdFiles.forEach((file) => {
		if (!file.endsWith('.js')) return;
		const filename = file.split('.')[0];
		client.loadCommand(filename);
	});

	client.logger.log('');

	// Then we load events, which will include our message and ready event.
	const evtFiles = await readdir(__dirname + '/src/events/');
	client.logger.debug(`Loading a total of ${evtFiles.length / 2} events.`);

	evtFiles.forEach((file) => {
		let start = Date.now();
		if (!file.endsWith('.js')) return;
		const filename = file.split('.')[0];
		const event = require(`./src/events/${filename}`);

		// Bind the client to any event, before the existing arguments
		// provided by the discord.js event.
		// This line is awesome, by the way. Just sayin'.
		client.on(filename, event.bind(null, client));
		let end = Date.now();
		client.logger.log(`Loaded Event: ${filename}, [${end - start}ms]`);
	});
	client.logger.log('');

	client.botInfo.startTime = Date.now();

	// Here we login the client.
	await client.login('' + tokens.discordToken);

	// End top-level async/await function.
};

init();

// let string = '';
// string += "Hello, I'm the Discord Bot for the TIME Bots 5275.\n";
// string += 'Created By  :  Lucas Ferguson\n';
// string += 'Latest Version  :  0.0.2\n';
// string += 'Updated Date  :  10/30/2020\n';
// string += '\n';
// string += 'Your User Info\n';
// string += 'Name  : ' + u.displayName + '\n';
// string += 'UserID  :  ' + u.user.id + '\n';
// string += '\n';
// // string +=
// // 	'**Respond with "Yes" if you received this message**\n';
// u.send(string);

// u.send('Type "Help" for a list of commands');
