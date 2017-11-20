const Console = require("console");
const SimpleFileWriter = require("simple-file-writer");

const logWriter = new SimpleFileWriter("./console.log");
const debugLogWriter = new SimpleFileWriter("./debug.log");

/**
 	* Returns a promise that the user will answer
 	* @param {TextChannel} textChannel discord.js TextChannel to ask the question in
 	* @param {GuildMember} member discord.js Member to ask the question to
 	* @param {string} question question to ask
 	*/
function ask(client, textChannel, member, question) {
	//return a promise which will resolve once the user next sends a message in this textChannel
	return new Promise((resolve, reject) => {
		const handler = responseMessage => {
			if (responseMessage.channel.id === textChannel.id &&
				responseMessage.member.id === member.id) {
				client.removeListener("message", handler);
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
	return args.join("") + "\n";
}

module.exports = {
	dateError,
	dateLog,
	dateDebug,
	ask
};