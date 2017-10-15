const FileSystem = require("fs");
const Discord = require("discord.js");
const JsonFile = require("jsonfile");
const RequireAll = require("require-all");
const CoreUtil = require("./Util.js");
const HandleMessage = require("./HandleMessage.js");
// @ts-ignore
const InternalConfig = require("./internal-config.json");

module.exports = class Client extends Discord.Client {
	/**
	 * @param {*} token 
	 * @param {*} dataFile 
	 * @param {*} commandsDir 
	 * @param {*} guildDataModel 
	 */
	constructor(token, dataFile, commandsDir, guildDataModel) {
		super();

		this._token = token;
		this.dataFile = dataFile;
		this.commandsDir = commandsDir;
		this.guildDataModel = guildDataModel;

		this.commands = RequireAll(this.commandsDir);
		this.guildsData = FileSystem.existsSync(this.dataFile) ? this.fromJSON(JsonFile.readFileSync(this.dataFile)) : {};

		this.on("ready", this.onReady);
		this.on("message", this.onMessage);
		this.on("debug", this.onDebug);
		process.on("uncaughtException", err => this.onUnhandledException(this, err));
	}

	bootstrap() {
		this.beforeLogin();
		this.login(this._token);
	}

	beforeLogin() {
		setInterval(() => this.writeFile(), InternalConfig.saveIntervalSec * 1000);
		this.emit("beforeLogin");
	}

	onReady() {
		this.user.setGame(InternalConfig.website.replace(/^https?:\/\//, ""));
		CoreUtil.dateLog(`Registered bot ${this.user.username}`);
	}

	onMessage(message) {
		if (message.channel.type === "text" && message.member) {
			if(!this.guildsData[message.guild.id])
				this.guildsData[message.guild.id] = new this.guildDataModel({ id: message.guild.id });
			HandleMessage(this, message, this.commands, this.guildsData[message.guild.id]);
		}
	}

	onDebug(info) {
		if (!InternalConfig.debugIgnores.some(x => info.startsWith(x)))
			CoreUtil.dateLog(info);
	}

	onUnhandledException(client, err) {
		CoreUtil.dateError(err.message || err);
		CoreUtil.dateLog("Destroying existing client...");
		client.destroy().then(() => {
			CoreUtil.dateLog("Client destroyed, recreating...");
			client.login(client._token);
		});
	}

	writeFile() {
		JsonFile.writeFile(
			this.dataFile,
			this.guildsData,
			err => { if (err) CoreUtil.dateError(`Error writing data file! ${err.message || err}`); });
	}

	/**
	 * @param {*} json 
	 * @param {*} guildDataModel 
	 */
	fromJSON(json) {
		const guildsData = Object.keys(json);
		guildsData.forEach(guildID => { json[guildID] = new this.guildDataModel(json[guildID]); });
		return json;
	}
};