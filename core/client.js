const CoreUtil = require("./util.js");
const Camo = require("camo");
const CronJob = require("cron").CronJob;
const Discord = require("discord.js");
const HandleGuildMessage = require("./handle-guild-message.js");
// @ts-ignore
const InternalConfig = require("./internal-config.json");
const RequireAll = require("require-all");

let database;

module.exports = class Client extends Discord.Client {
    /**
	 * Construct a new Discord.Client with some added functionality
	 * @param {string} token bot token
	 * @param {string} commandsDir location of dir containing commands .js files
	 * @param {*} guildDataModel GuildData model to be used for app; must extend BaseGuildData
	 */
    constructor(token, commandsDir, guildDataModel) {
        super({
            messageCacheMaxSize: 16,
            disabledEvents: InternalConfig.disabledEvents
        });

        this._token = token;
        this.commandsDir = commandsDir;
        this.guildDataModel = guildDataModel;

        this.commands = RequireAll(this.commandsDir);

        this.on("ready", this._onReady);
        this.on("message", this._onMessage);
        this.on("debug", this._onDebug);
        this.on("guildCreate", this._onGuildCreate);
        process.on("uncaughtException", err => this._onUnhandledException(this, err));
    }

    _onReady() {
        this.user.setGame(InternalConfig.website.replace(/^https?:\/\//, ""));
        CoreUtil.dateLog(`Registered bot ${this.user.username}`);
    }

    _onMessage(message) {
        if (message.channel.type === "text" && message.member)
            HandleGuildMessage(this, message, this.commands);
    }

    _onDebug(info) {
        info = info.replace(/Authenticated using token [^ ]+/, "Authenticated using token [redacted]");
        if (!InternalConfig.debugIgnores.some(x => info.startsWith(x)))
            CoreUtil.dateDebug(info);
    }

    _onGuildCreate(guild) {
        CoreUtil.dateLog(`Added to guild ${guild.name}`);
    }

    _onUnhandledException(client, err) {
        CoreUtil.dateError("Unhandled exception!\n", err);
        CoreUtil.dateLog("Destroying existing client...");
        client.destroy().then(() => {
            CoreUtil.dateLog("Client destroyed, recreating...");
            setTimeout(() => client.login(client._token), InternalConfig.reconnectTimeout);
        });
    }

    bootstrap() {
        Camo.connect(InternalConfig.dbConnectionString).then(db => {
            database = db;

            const dbProtocol = InternalConfig.dbConnectionString.match(/^(.+):\/\//)[1];
            CoreUtil.dateLog(`Database protocol: ${dbProtocol}`);

            if (dbProtocol === "nedb") {
                CoreUtil.dateLog(`Seting up NeDB collection compaction cron job; schedule: ${InternalConfig.neDBCompactionSchedule}`);
                new CronJob(InternalConfig.neDBCompactionSchedule, () => database.compactCollectionFiles(), null, true);
            }

            this.emit("beforeLogin");
            this.login(this._token);
        });
    }
};