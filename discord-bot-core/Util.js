// @ts-ignore
const InternalConfig = require("./internal-config.json");
const Console = require("console");
const SimpleFileWriter = require("simple-file-writer");

const logWriter = new SimpleFileWriter("./console.log");
const debugLogWriter = new SimpleFileWriter("./debug.log");

function ask(client, textChannel, member, question) {
	//return a promise which will resolve once the user next sends a message in this textChannel
	return new Promise((resolve, reject) => {
		const cancelAsk = () => {
			client.removeListener("message", handler);
			textChannel.send("Response to question timed out");
		};

		const askTimeout = setTimeout(cancelAsk, InternalConfig.askTimeout);

		const handler = responseMessage => {
			if (responseMessage.channel.id === textChannel.id && responseMessage.member.id === member.id) {
				clearTimeout(askTimeout);
				resolve(responseMessage);
			}
		};

		client.on("message", handler);

		textChannel.send(member.toString() + " " + question).catch(reject);
	});
}

function dateLog(...args) {
	doDateLog(Console.log, logWriter, args, "INFO");
}

function dateError(...args) {
	doDateLog(Console.error, logWriter, args, "ERROR");
}

function dateDebugError(...args) {
	doDateLog(null, null, args, "DEBUG ERROR");
}

function dateDebug(...args) {
	doDateLog(null, null, args, "DEBUG");
}

function doDateLog(consoleMethod, fileWriter, args, prefix = "") {
	args = formatArgs([`[${prefix}]`].concat(args));

	if (consoleMethod !== null)
		consoleMethod.apply(this, args);

	if (fileWriter !== null)
		fileWriter.write(formatArgsForFile(args));

	debugLogWriter.write(formatArgsForFile(args));
}

function formatArgs(args) {
	return [`[${new Date().toUTCString()}]`].concat(args);
}

function formatArgsForFile(args) {
	return args.join(" ") + "\n";
}

module.exports = {
	dateError,
	dateLog,
	dateDebug,
	dateDebugError,
	ask
};