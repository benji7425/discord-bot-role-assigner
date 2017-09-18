//node imports
const FileSystem = require("fs"); //checking if files exist

//external lib imports
const Discord = require("discord.js"); //discord interaction
const JsonFile = require("jsonfile"); //saving to/reading from json

//component imports
const DiscordUtil = require("./util.js"); //some helper methods
const MessageHandler = require("./message-handler.js"); //message handling
const Config = require("./internal-config.json"); //some configuration values

class CoreClient {
	/**
	 * @param {string} token 
	 * @param {string} dataFile 
	 * @param {object} guildDataModel 
	 * @param {object[]} commands 
	 */
	constructor(token, dataFile, commands, implementations, guildDataModel) {
		this.actual = new Discord.Client();

		this.token = token;
		this.dataFile = dataFile;
		this.commands = commands;
		this.implementations = implementations;
		this.guildDataModel = guildDataModel;
		this.guildsData = FileSystem.existsSync(this.dataFile) ?
			fromJSON(JsonFile.readFileSync(this.dataFile), this.guildDataModel) : {};

		process.on("uncaughtException", err => onUncaughtException(this, err));
	}

	writeFile() {
		JsonFile.writeFile(
			this.dataFile,
			this.guildsData,
			err => {
				if (err) DiscordUtil.dateError("Error writing file", err);
			});
	}

	bootstrap() {
		this.actual.on("ready", () => onReady(this));

		this.actual.on("disconnect", eventData => DiscordUtil.dateError("Disconnect!", eventData.code, eventData.reason));

		this.actual.on("message", message => {
			if (message.author.id === this.actual.user.id)
				return;
			if (message.channel.type === "dm")
				MessageHandler.handleDirectMessage(this, message);
			else if (message.channel.type === "text" && message.member)
				MessageHandler.handleTextMessage(this, message, this.guildsData)
					.then(msg => {
						if (msg) message.reply(msg);
					})
					.catch(err => {
						message.reply(err);
						DiscordUtil.dateError(`Command error in guild ${message.guild.name}\n`, err.message || err);
					})
					.then(() => this.writeFile());
		});

		this.actual.login(this.token);
	}
}

/**
 * @param {*} coreClient 
 */
function onReady(coreClient) {
	coreClient.actual.user.setGame("benji7425.github.io");
	DiscordUtil.dateLog("Registered bot " + coreClient.actual.user.username);

	setInterval(() => coreClient.writeFile(), Config.saveIntervalSec * 1000);

	if (coreClient.implementations.onReady)
		coreClient.implementations.onReady(coreClient)
			.then(() => coreClient.writeFile())
			.catch(err => DiscordUtil.dateError(err));
}

/**
 * @param {*} coreClient 
 * @param {*} err 
 */
function onUncaughtException(coreClient, err) {
	DiscordUtil.dateError(err.message || err);
	DiscordUtil.dateLog("Destroying existing client...");
	coreClient.actual.destroy().then(() => {
		DiscordUtil.dateLog("Client destroyed, recreating...");
		coreClient.actual = new Discord.Client();
		coreClient.bootstrap();
	});
}

/**
 * Convert json from file to a usable format
 * @param {object} json json from file
 * @param {*} guildDataModel
 */
function fromJSON(json, guildDataModel) {
	const guildsData = Object.keys(json);
	guildsData.forEach(guildID => { json[guildID] = new guildDataModel(json[guildID]); });
	return json;
}

module.exports = CoreClient;