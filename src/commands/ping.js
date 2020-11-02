exports.run = async (client, message, args, level) => {
	// eslint-disable-line no-unused-vars
	const msg = await message.channel.send("Ping?");
	msg.edit(
		`Pong! Latency is [${
			msg.createdTimestamp - message.createdTimestamp
		} ms]. API Latency is [${Math.round(client.ws.ping)} ms]`
	);
};

exports.conf = {
	enabled: true,
	guildOnly: false,
	aliases: [],
	permLevel: 0,
};

exports.help = {
	name: "ping",
	category: "System",
	description:
		"Test the latency from the Server to the Discord API. It Pings. Then Pongs. Ping Pong. 🏓 ",
	usage: "ping",
};
