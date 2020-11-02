/*
    Logger class for easy and aesthetically pleasing console logging.  by Évelyne Lachance
*/
const chalk = require('chalk');
var moment = require('moment');

function Logger(content, type = 'log') {
	const timestamp = `[${moment().format('YYYY-MM-DD HH:mm:ss')}]:`;
	let returnMessage = '';
	switch (type) {
		case 'log': {
			returnMessage = `${timestamp} ${chalk.bgBlue(
				type.toUpperCase()
			)} ${content} `;
		}
		case 'warn': {
			returnMessage = `${timestamp} ${chalk.black.bgYellow(
				type.toUpperCase()
			)} ${content} `;
		}
		case 'error': {
			returnMessage = `${timestamp} ${chalk.bgRed(
				type.toUpperCase()
			)} ${content} `;
		}
		case 'debug': {
			returnMessage = `${timestamp} ${chalk.green(
				type.toUpperCase()
			)} ${content} `;
		}
		case 'cmd': {
			returnMessage = `${timestamp} ${chalk.black.bgWhite(
				type.toUpperCase()
			)} ${content}`;
		}
		case 'ready': {
			returnMessage = `${timestamp} ${chalk.black.bgGreen(
				type.toUpperCase()
			)} ${content}`;
		}
		case 'none': {
			returnMessage = `${timestamp} ${content}`;
		}
		// default:
		// 	throw new TypeError(
		// 		"Logger type must be either warn, debug, log, ready, cmd or error."
		// 	);
	}

	// console.log(type);
	console.log(returnMessage);
}

export var error = (args) => {
	Logger(args, 'error');
};
export var warn = (args) => {
	Logger(args, 'warn');
};
export var debug = (args) => {
	Logger(args, 'debug');
};
export var cmd = (args) => {
	Logger(args, 'cmd');
};
export var log = (args) => {
	Logger(args, 'log');
};
export var ready = (args) => {
	Logger(args, 'ready');
};
export var none = (args) => {
	Logger(args, 'none');
};

// module.exports = {
// 	log,
// };
