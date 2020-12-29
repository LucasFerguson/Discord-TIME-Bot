const fs = require('fs');
const readline = require('readline');

async function processLineByLine(path: string) {
	path = path.replace('.ts', '.js');
	console.log(path);

	const fileStream = fs.createReadStream(path);
	let lines = 0;

	const rl = readline.createInterface({
		input: fileStream,
		crlfDelay: Infinity,
	});
	// Note: we use the crlfDelay option to recognize all instances of CR LF
	// ('\r\n') in input.txt as a single line break.

	for await (const line of rl) {
		// Each line in input.txt will be successively available here as `line`.
		// console.log(`Line from file: ${line}`);
		lines++;
	}

	return lines;
}

var path = require('path');
var walk = function (dir, done) {
	var results = [];
	fs.readdir(dir, function (err, list) {
		if (err) return done(err);
		var i = 0;
		(function next() {
			var file = list[i++];
			if (!file) return done(null, results);
			file = path.resolve(dir, file);
			fs.stat(file, function (err, stat) {
				if (stat && stat.isDirectory()) {
					walk(file, function (err, res) {
						results = results.concat(res);
						next();
					});
				} else {
					results.push(file);
					next();
				}
			});
		})();
	});
};

import { Command } from '../config/Command';

let thisCommand: Command = {
	run: async (client, message, args, level) => {},
	conf: {
		enabled: true,
		guildOnly: false,
		aliases: [],
		permLevel: 0,
	},

	help: {
		name: 'readline',
		category: 'System',
		description: 'Read Line',
		usage: 'readline',
	},
};

thisCommand.run = async (client, message, args, level) => {
	let patharr = __dirname.split('\\');
	patharr.pop();
	patharr.pop();
	let pathstr = '';
	patharr.forEach((s) => {
		pathstr += s + '\\';
	});
	// console.log(pathstr);

	// fs.readdirSync(pathstr).forEach((file) => {
	// 	console.log(file);
	// });

	let arr = [];
	let lines = 0;

	await walk(pathstr, async function (err, results) {
		if (err) throw err;
		console.log(results);
		arr = results;

		for (let i = 0; i < arr.length; i++) {
			lines += await processLineByLine(arr[i]);
		}

		message.channel.send('This Bot has ' + lines + ' Total lines of code.');
	});
};

export default thisCommand;
