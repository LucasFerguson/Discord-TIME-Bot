/*
    Logger class for easy and aesthetically pleasing console logging.  by Évelyne Lachance
*/
const chalk = require("chalk");
const moment = require("moment");

function log(content, type = "log") {
	const timestamp = `[${moment().format("YYYY-MM-DD HH:mm:ss")}]:`;
	let returnMessage = "";
	switch (type) {
		case "log": {
			returnMessage = `${timestamp} ${chalk.bgBlue(
				type.toUpperCase()
			)} ${content} `;
		}
		case "warn": {
			returnMessage = `${timestamp} ${chalk.black.bgYellow(
				type.toUpperCase()
			)} ${content} `;
		}
		case "error": {
			returnMessage = `${timestamp} ${chalk.bgRed(
				type.toUpperCase()
			)} ${content} `;
		}
		case "debug": {
			returnMessage = `${timestamp} ${chalk.green(
				type.toUpperCase()
			)} ${content} `;
		}
		case "cmd": {
			returnMessage = `${timestamp} ${chalk.black.bgWhite(
				type.toUpperCase()
			)} ${content}`;
		}
		case "ready": {
			returnMessage = `${timestamp} ${chalk.black.bgGreen(
				type.toUpperCase()
			)} ${content}`;
		}
		case "none": {
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

exports.error = (...args) => log(...args, "error");

exports.warn = (...args) => log(...args, "warn");

exports.debug = (...args) => log(...args, "debug");

exports.cmd = (...args) => log(...args, "cmd");

exports.log = (...args) => log(...args, "log");

exports.ready = (...args) => log(...args, "ready");

exports.none = (...args) => log(...args, "none");

// module.exports = {
// 	log,
// };
