// The MESSAGE event runs anytime a message is received
// Note that due to the binding of client to every event, every event
// goes `client, other, args` when this function is run.
import GuideBot from '../ClientClass';
import * as Discord from 'discord.js';

/**
 * @param { GuideBot } client
 * @param { Discord.Message } message
 */
module.exports = async (client: GuideBot, message: Discord.Message) => {
	if (message.channel.id == '774676961481064468') {
		client.clickup.update(message);
	}

	// It's good practice to ignore other bots. This also makes your bot ignore itself
	// and not get into a spam loop (we call that "botception").
	if (message.author.bot) return;

	client.logger.cmd(
		`User [${message.author.tag}], Message [${message.content}]`
	);

	// Grab the settings for this server.
	// If there is no guild, get default conf (DMs)
	const settings = client.getSettings(message.guild);

	// Checks if the bot was mentioned, with no message after it, returns the prefix.
	const prefixMention = new RegExp(`^<@!?${client.user.id}>( |)$`);
	if (message.content.match(prefixMention)) {
		return message.reply(
			`My prefix on this server is \`${settings.prefix}\``
		);
	}

	// Also good practice to ignore any message that does not start with our prefix,
	// which is set in the configuration file.
	if (message.content.indexOf(settings.prefix) !== 0) return;

	// Here we separate our "command" name, and our "arguments" for the command.
	// e.g. if we have the message "+say Is this the real life?" , we'll get the following:
	// command = say
	// args = ["Is", "this", "the", "real", "life?"]
	const args = message.content
		.slice(settings.prefix.length)
		.trim()
		.split(/ +/g);
	const command = args.shift().toLowerCase();

	// If the member on a guild is invisible or not cached, fetch them.
	if (message.guild && !message.member)
		await message.guild.members.fetch(message.author);

	// Check whether the command, or alias, exist in the collections defined.
	const cmd = client.getCommand(command);

	if (!cmd) return;

	// Some commands may not be useable in DMs. This check prevents those commands from running
	// and return a friendly error message.
	if (cmd && !message.guild && cmd.conf.guildOnly) {
		return message.channel.send(
			'This command is unavailable via private message. Please run this command in a guild.'
		);
	}

	// Get the user or member's permission level from the elevation
	const level = client.permissionLevel(message);

	if (level < cmd.conf.permLevel) {
		message.channel.send(`You do not have permission to use this command.`);

		return;
	}

	client.logger.cmd(
		`[Command] ${message.author.username} (${message.author.id}) Level (${level}). Running Command <${cmd.help.name}>, With args <${args}>`
	);

	cmd.run(client, message, args, level);
};
