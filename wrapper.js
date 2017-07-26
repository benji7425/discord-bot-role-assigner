const Discord = require("discord.js");
const Util = require("discordjs-util");

const client = new Discord.Client();

process.on("uncaughtException", (err) => {
	Util.dateError(err);
});

client.login(require("./token.json").token);

client.on("ready", () => {
	require("./app/index.js")(client);
});

client.on("disconnect", eventData => {
	Util.dateError(eventData.code, eventData.reason);
});